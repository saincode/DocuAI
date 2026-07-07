const { Pinecone } = require('@pinecone-database/pinecone');

let pineconeClient = null;

const getPineconeClient = async () => {
  if (pineconeClient) {
    return pineconeClient;
  }
  
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY is missing');
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  return pineconeClient;
};

const getPineconeIndex = async () => {
  const client = await getPineconeClient();
  const indexName = process.env.PINECONE_INDEX;
  if (!indexName) {
    throw new Error('PINECONE_INDEX is missing');
  }
  return client.Index(indexName);
};

module.exports = {
  getPineconeClient,
  getPineconeIndex
};
