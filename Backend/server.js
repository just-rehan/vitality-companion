import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("✅ Backend is running. The frontend is available at http://localhost:3000 (or the port shown in your terminal).");
});

app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    // DEBUG: Check Environment
    console.log("🔹 CWD:", process.cwd());
    // DEBUG: Check API Key loaded
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    console.log("🔹 API Key loaded:", apiKey ? `${apiKey.substring(0, 5)}...${apiKey.slice(-4)}` : "UNDEFINED");

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": process.env.GOOGLE_GENAI_API_KEY,
                },
                body: JSON.stringify({
                    contents: messages,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini error:", data);
            return res.status(500).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error("Backend crash:", error);
        res.status(500).json({ error: "Gemini request failed" });
    }
});

app.listen(3001, () =>
    console.log("✅ Backend running at http://localhost:3001")
);
