🕵️ Cold Case Detective
Retrieval Augmented Generation (RAG) with Source Tracking

A TypeScript-based RAG system that answers questions only using provided evidence files and explicitly cites the source documents.
This project demonstrates how to build a trustworthy, citation-aware AI system instead of a hallucination-prone chatbot.

🚀 Project Goal

Build an AI assistant that:

Retrieves relevant evidence using vector embeddings

Answers questions using an LLM

Never hallucinates

Always cites the exact source file

This mirrors real-world AI use cases like:

Legal document analysis

Forensics & investigations

Enterprise knowledge bases

Research assistants

🧠 What is RAG?

Retrieval Augmented Generation (RAG) combines:

Retrieval → find relevant documents

Generation → reason over them using an LLM

Instead of asking an LLM directly, we first retrieve evidence and then force the LLM to answer only from that evidence.

🧩 Project Architecture
Evidence Files (.txt)
        ↓
  Embeddings (OpenAI)
        ↓
Vector Search (Cosine Similarity)
        ↓
  Top Evidence + Metadata
        ↓
    LLM (OpenRouter)
        ↓
Answer + Source Citations