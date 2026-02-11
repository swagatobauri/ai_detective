import fs from "fs";
import path from "path";

export type Document = {
    content: string;
    source: string;
};



import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../data");

/**
 * Reads all files from /data and converts them
 * into structured objects with metadata
 */
export function loadDocuments(): Document[] {
    // Reads evidence files, Converts raw text into structured objects,Prepares data for embeddings
    const files = fs.readdirSync(DATA_DIR);  // read all files from /data

    return files.map((file) => {
        const content = fs.readFileSync(
            path.join(DATA_DIR, file),
            "utf-8"
        );

        return {
            content: content,
            source: file
        };
    });
}

// test
const docs = loadDocuments();
console.log(docs);
// just for testing