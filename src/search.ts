import OpenAI from "openai";
import { embedDocuments, EmbeddedDocument } from "./embed";

/**
 * Create OpenAI client configured for OpenRouter
 * Even though the class is OpenAI, the baseURL points to OpenRouter
 */
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

/**
 * Cosine similarity measures how close two vectors are
 * Value range: -1 to 1
 * Closer to 1 = more similar meaning
 */
function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Performs semantic search over embedded documents
 */
export async function search(
    query: string
): Promise<(EmbeddedDocument & { score: number })[]> {
    // 1. Load + embed all evidence documents
    const embeddedDocs = await embedDocuments();

    // 2. Convert the query into an embedding
    const queryEmbeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query
    });

    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

    // 3. Compare query embedding with each document embedding
    const results = embeddedDocs.map((doc) => {
        const score = cosineSimilarity(queryEmbedding, doc.embedding);

        return {
            ...doc,
            score
        };
    });

    // 4. Sort by similarity score (highest first)
    results.sort((a, b) => b.score - a.score);

    return results;
}

/**
 *  phase 2 test 
 */
const results = await search("what was the course of the suspect?");
console.log(results[0]);
