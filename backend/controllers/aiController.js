const { GoogleGenAI } = require("@google/genai"); 
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompt");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// --------------------
// Generate Interview Questions
// --------------------
const generateInterviewQuestions = async (req, res) => {
    if (!process.env.GEMINI_API_KEY) {
        return res.status(401).json({ message: "API key is missing." });
    }

    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const promptText = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite", 
            contents: promptText,
            // FORCE JSON MODE: This fixes the "Bad control character" error
            config: {
                responseMimeType: "application/json"
            }
        });

        // In JSON mode, response.text is already a clean JSON string
        const data = JSON.parse(response.text);
        res.status(200).json(data);

    } catch (error) {
        console.error("Generate Interview Questions Error:", error);
        res.status(500).json({
            message: "Failed to generate interview questions",
            error: error.message,
        });
    }
};

// --------------------
// Generate Concept Explanation
// --------------------
const generateConceptExplanation = async (req, res) => {
    if (!process.env.GEMINI_API_KEY) {
        return res.status(401).json({ message: "API key is missing." });
    }

    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const promptText = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: promptText,
            config: {
                responseMimeType: "application/json"
            }
        });

        const data = JSON.parse(response.text);
        res.status(200).json(data);

    } catch (error) {
        console.error("Generate Concept Explanation Error:", error);
        res.status(500).json({
            message: "Failed to generate concept explanation",
            error: error.message,
        });
    }
};

module.exports = {
    generateInterviewQuestions,
    generateConceptExplanation
};