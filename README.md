# AI Document Assistant (RAG) – Project Prompt

Build a modern AI-powered Document Assistant using a Retrieval-Augmented Generation (RAG) architecture.

## Project Objective

Develop a web application with a clean chat interface where users can upload PDF documents and ask questions about their content. The AI should answer questions based only on the uploaded documents by retrieving relevant information from a Pinecone vector database.

## User Interface

Create a single-page application with:

* A modern, responsive chat interface.
* A PDF upload button integrated into the chat.
* A message input field.
* A send button.
* A chat history showing user and AI messages.
* A loading indicator while processing uploads or generating responses.

Do not create login, signup, dashboards, or any unnecessary pages. Everything should happen within the chat interface.

## PDF Upload Workflow

When a user uploads a PDF:

1. Upload the file to the backend.
2. Extract all text from the PDF.
3. Clean the extracted text.
4. Split the text into meaningful chunks.
5. Generate embeddings for each chunk.
6. Store the embeddings in Pinecone along with metadata such as:

   * Document name
   * Chunk ID
   * Chunk text
   * Upload timestamp

The embeddings should be stored permanently so the document does not need to be processed again.

## Question Answering Workflow

When the user asks a question:

1. Convert the question into an embedding.
2. Search Pinecone for the most relevant chunks.
3. Retrieve the top matching chunks.
4. Send the retrieved context and the user's question to the LLM.
5. Generate a natural, accurate answer based on the retrieved document content.
6. Display the response in the chat interface.

If the answer is not found in the uploaded documents, the AI should clearly respond that the information is not available in the uploaded documents instead of making up an answer.

## Technology Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### File Upload

* Multer

### PDF Processing

* pdf-parse

### RAG Framework

* LangChain

### Embeddings

* OpenAI Embeddings

### Vector Database

* Pinecone

### AI Model

* OpenAI GPT (or an equivalent LLM)

### Configuration

* dotenv for environment variables

## Project Structure

Organize the project into separate frontend and backend folders with clean, modular code. Keep business logic, API routes, services, and utility functions well separated.

## Code Quality Requirements

* Follow clean architecture principles.
* Write reusable and modular components.
* Use async/await with proper error handling.
* Validate uploaded files.
* Handle API failures gracefully.
* Keep the UI responsive and user-friendly.
* Add meaningful comments where necessary.
* Use environment variables for all API keys and secrets.
* Write production-quality code.

## Expected Outcome

The final application should allow a user to:

* Open the application.
* Upload one or more PDF documents.
* Wait for the documents to be processed and stored in Pinecone.
* Ask questions through the chat interface.
* Receive AI-generated answers grounded in the uploaded document content using a Retrieval-Augmented Generation (RAG) pipeline.

The project should focus on simplicity, maintainability, and demonstrating a complete end-to-end RAG workflow with a modern chat experience.
