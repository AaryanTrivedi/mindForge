import { ChatOllama } from "@langchain/community/chat_models/ollama"

export const streamingModel = new ChatOllama({
  baseUrl: "http://localhost:11434/",
  model: "mistral",
  streaming: true,
  verbose: true,
  temperature: 0,
});


export const nonStreamingModel = new ChatOllama({
  baseUrl: "http://localhost:11434/",
  model: "mistral",
  verbose: true,
  temperature: 0,
});
