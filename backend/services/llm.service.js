const { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatGroq } = require('@langchain/groq');
const { PineconeStore } = require('@langchain/pinecone');
const { getPineconeIndex } = require('./pinecone.service');
const { PromptTemplate } = require('@langchain/core/prompts');

// Embeddings always use Google (separate quota from the LLM)
const getEmbeddings = () => {
    return new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: process.env.EMBEDDING_MODEL || "gemini-embedding-2",
    });
};

const getLLM = () => {
    const provider = (process.env.LLM_PROVIDER || 'google').toLowerCase();

    if (provider === 'groq') {
        return new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.LLM_MODEL || "llama-3.3-70b-versatile",
            temperature: 0,
        });
    }

    // Default: Google Gemini
    return new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: process.env.LLM_MODEL || "gemini-2.0-flash",
        temperature: 0,
    });
};

const getVectorStore = async () => {
    const pineconeIndex = await getPineconeIndex();
    const embeddings = getEmbeddings();
    
    return new PineconeStore(embeddings, { pineconeIndex });
};

// Detect if the query is a conversational greeting/chitchat (not a document question)
const isConversational = (query) => {
    const greetings = [
        /^hi+[!?.]*$/i, /^hello+[!?.]*$/i, /^hey+[!?.]*$/i, /^howdy[!?.]*$/i,
        /^good\s*(morning|afternoon|evening|night)[!?.]*$/i,
        /^what'?s up[!?.]*$/i, /^sup[!?.]*$/i,
        /^how are you[!?.]*$/i, /^how do you do[!?.]*$/i,
        /^(nice|good|great)\s*to\s*(meet|see)\s*you[!?.]*$/i,
        /^thanks?[!?.]*$/i, /^thank you[!?.]*$/i,
        /^bye+[!?.]*$/i, /^goodbye+[!?.]*$/i, /^see you[!?.]*$/i,
    ];
    return greetings.some((pattern) => pattern.test(query.trim()));
};

const processQuery = async (query) => {
    const llm = getLLM();

    // 1. Handle greetings / chitchat without touching Pinecone at all
    if (isConversational(query)) {
        const chitchatTemplate = `You are DocuAI, a friendly AI document assistant.
The user sent a conversational message. Reply naturally and briefly, and let them know you're ready to answer questions once they upload a PDF document.

User message: {question}

Reply:`;
        const chitchatPrompt = PromptTemplate.fromTemplate(chitchatTemplate);
        const formattedChitchat = await chitchatPrompt.format({ question: query });
        const chitchatResponse = await llm.invoke(formattedChitchat);
        return chitchatResponse.content;
    }

    // 2. Retrieve relevant documents from Pinecone
    const vectorStore = await getVectorStore();

    // Use similaritySearchWithScore to filter out low-relevance chunks
    const docsWithScores = await vectorStore.similaritySearchWithScore(query, 4);

    // Only keep chunks with a cosine similarity score >= 0.5 (higher = more relevant)
    const RELEVANCE_THRESHOLD = 0.5;
    const relevantDocs = docsWithScores.filter(([, score]) => score >= RELEVANCE_THRESHOLD);
    const context = relevantDocs.map(([doc]) => doc.pageContent).join("\n\n");

    // 3. Format the prompt
    let template;
    if (!context) {
        // No document uploaded yet or nothing relevant found
        template = `You are DocuAI, a helpful AI Document Assistant.
The user asked: "{question}"

No relevant document context was found. This means either no document has been uploaded yet, or the uploaded documents don't contain information relevant to this question.
Politely let the user know and ask them to upload a PDF document related to their question.

Answer:`;
    } else {
        template = `You are DocuAI, a helpful AI Document Assistant. Use ONLY the following context from the uploaded document to answer the user's question.
If the answer is not found in the context, explicitly state that the information is not available in the uploaded documents. Do not make up an answer.

Context:
{context}

Question: {question}

Answer:`;
    }

    const prompt = PromptTemplate.fromTemplate(template);
    const formattedPrompt = await prompt.format({ context: context || '', question: query });

    // 4. Get the answer from the LLM
    const response = await llm.invoke(formattedPrompt);
    return response.content;
};

module.exports = {
    getEmbeddings,
    getVectorStore,
    processQuery
};
