const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { getVectorStore, processQuery } = require('../services/llm.service');
const { getPineconeIndex } = require('../services/pinecone.service');

const router = express.Router();

// ── Ensure uploads directory exists ──────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ── Multer disk storage ───────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        // e.g.  1751234567890-report.pdf
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
        cb(null, true);
    },
});

router.post('/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // 1. Read the saved PDF from disk
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const text = pdfData.text;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: 'Could not extract text from the uploaded PDF' });
        }

        // 2. Split text into chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docOutput = await splitter.createDocuments([text], [{
            documentName: req.file.originalname,
            savedAs: req.file.filename,
            uploadTimestamp: new Date().toISOString()
        }]);

        // 3. Store embeddings in Pinecone
        const vectorStore = await getVectorStore();
        await vectorStore.addDocuments(docOutput);

        res.status(200).json({
            message: 'Document successfully processed and stored.',
            chunks: docOutput.length,
            savedAs: req.file.filename,
            savedPath: req.file.path,
        });
    } catch (error) {
        console.error('Error in /upload:', error.message || error);
        console.error('Full stack:', error.stack);
        res.status(500).json({ error: 'Failed to process document', detail: error.message });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const answer = await processQuery(question);
        res.status(200).json({ answer });
    } catch (error) {
        console.error('Error in /chat:', error.message || error);
        console.error('Full stack:', error.stack);
        res.status(500).json({ error: 'Failed to answer question', detail: error.message });
    }
});

router.delete('/clear', async (req, res) => {
    try {
        const index = await getPineconeIndex();
        // Delete all vectors from the index namespace
        await index.deleteAll();
        res.status(200).json({ message: 'All documents cleared from the knowledge base.' });
    } catch (error) {
        console.error('Error in /clear:', error.message || error);
        res.status(500).json({ error: 'Failed to clear documents', detail: error.message });
    }
});

module.exports = router;
