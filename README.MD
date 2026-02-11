Under the Hood: The Cold Case AI Detective

AI is amazing… but it sometimes confidently makes things up. That’s a problem when working with sensitive information like legal documents, lab reports, or private notes. 

Cold Case AI Detective was built to solve this: answers must be accurate and backed by evidence. No guessing. No hallucinations. Just reliable answers from your own documents.

The Problem:
Why not just use ChatGPT or other LLMs?

1. They don’t know your private data — your case files, lab reports, or notes are invisible to them.
2. They can hallucinate — if they don’t know something, they may invent an answer that sounds correct.

When accuracy matters, this is unacceptable.

The Solution: RAG:
We use RAG (Retrieval Augmented Generation) — think of it as an open-book exam for AI.

Flow:
1. You ask a question.
2. The system searches your documents for relevant paragraphs.
3. We pass this evidence to the AI and tell it to use ONLY this information.
4. The AI answers with citations, reducing hallucinations.

System Flow:
1. Question: e.g., "What course was the suspect enrolled in?"
2. Search: Scan all files in the data/ folder.
3. Evidence: Find most relevant sections using vector embeddings.
4. Prompt: Build a strict evidence-only prompt for the AI.
5. Answer: AI responds, citing the source.

We kept the code simple and modular for easy understanding and extension.
- ingest.ts (The Librarian): Reads all .txt files in data/ folder.
- embed.ts (The Translator): Converts text into vector embeddings for similarity search.
- search.ts (The Detective): Finds the most relevant document sections using cosine similarity.
- rag.ts (The Interrogator): Combines evidence and question, queries the AI, and returns the answer.



