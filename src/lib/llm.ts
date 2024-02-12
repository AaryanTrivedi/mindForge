import { ChatOllama } from "@langchain/community/chat_models/ollama"

export const streamingModel = new ChatOllama({
    baseUrl: "http://localhost:11434/",
    model: "mistral",
    format: "json",
    
  });
  
  export const nonStreamingModel = new ChatOllama({
    baseUrl: "http://localhost:11434/",
    model: "mistral",
    format: "json",
  });