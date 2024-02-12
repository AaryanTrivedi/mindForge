import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";

let pineconeInstance: Pinecone | null = null;

async function createIndex(pinecone: Pinecone, indexName: string) {
  try {
    await pinecone.createIndex({
        name: indexName,
        dimension: 1024,
        metric: "cosine",
        spec:{}
    });
    console.log(
      `Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await new Promise(resolve => setTimeout(resolve, env.INDEX_INIT_TIMEOUT * 1000));
    console.log("Index created!");
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Index creation failed");
  }
}

async function initPinecone() {
  try {
    const pinecone = new Pinecone({
        apiKey: env.PINECONE_API_KEY
      });
    
    const indexName = env.PINECONE_INDEX_NAME;
    const existingIndexes = await pinecone.listIndexes();

    if (Array.isArray(existingIndexes) && 
    !existingIndexes.some((index: { name: string }) => index.name === indexName)) {
  await createIndex(pinecone, indexName);
    } else {
    console.log("Your index already exists. Nice!");
    }


    return pinecone;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeInstance) {
    pineconeInstance = await initPinecone();
  }

  return pineconeInstance;
}
