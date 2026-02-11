import OpenAI from "openai";
import dotenv from "dotenv";
import { loadDocuments, Document } from "./ingest";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

export type EmbeddedDocument = Document & {
    embedding: number[];
};


export async function embedDocuments(): Promise<EmbeddedDocument[]> {
    const docs = loadDocuments();
    const embedded: EmbeddedDocument[] = [];

    for (const doc of docs) {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: doc.content
        });

        embedded.push({
            ...doc,
            embedding: response.data[0].embedding
        });
    }

    return embedded;
}