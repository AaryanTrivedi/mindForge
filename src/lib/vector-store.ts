import { env } from "./config";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Pinecone } from "@pinecone-database/pinecone"; // Update import
import { PineconeStore } from "@langchain/pinecone";

export async function embedAndStoreDocs(
  pinecone: Pinecone, // Update parameter type
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) {
  /*create and store the embeddings in the vectorStore*/
  try {
    const embeddings = new OllamaEmbeddings({
      model: "mistral:latest", // default value
      baseUrl: "http://localhost:11434", // default value
    });
    const index = await pinecone.index(env.PINECONE_INDEX_NAME); // Await index creation

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: env.PINECONE_NAME_SPACE,
      textKey: "text",
    });
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(pinecone: Pinecone) { // Update parameter type
  try {
    const embeddings = new OllamaEmbeddings();
    const index = await pinecone.index(env.PINECONE_INDEX_NAME); // Await index creation

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
      namespace: env.PINECONE_NAME_SPACE,
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}