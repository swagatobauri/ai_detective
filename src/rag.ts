import OpenAI from "openai";
import { search } from "./search";

/**
 * OpenRouter-compatible OpenAI client
 */
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

/**
 * Asks a question using RAG with citations
 */
export async function ask(question: string): Promise<void> {
    // 1. Retrieve relevant evidence
    const retrievedDocs = await search(question);

    // 2. Select top-k documents (usually 2–4)
    const topDocs = retrievedDocs.slice(0, 2);

    // 3. Inject content + source into prompt
    const context = topDocs
        .map(
            (doc) =>
                `Source: ${doc.source}\nEvidence: ${doc.content}`
        )
        .join("\n\n");

    // 4. Construct strict prompt
    const prompt = `
You are a detective AI.

Rules:
- Use ONLY the evidence provided
- Do NOT use prior knowledge
- Always cite filenames
-When answering a question, prefer the highest similarity-ranked source.
Only use lower-ranked sources if necessary.

Evidence:
${context}

Question:
${question}

Answer:
`;

    // 5. Ask the LLM
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    // 6. Output final answer
    console.log(response.choices[0].message.content);
}

/**
 * Final test
 */
ask("what was the course of the suspect and batch of the suspect?");
