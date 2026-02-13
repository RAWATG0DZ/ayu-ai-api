import express from 'express';
import axios from 'axios';
const app = express();

app.get('/ayu-ai', async (req, res) => {
    const query = req.query.q;
    const apiKey = process.env.GEMINI_KEY; 

    if (!query) return res.json({ error: "Sawal pucho! 🤪" });

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await axios.post(url, {
            contents: [{ 
                parts: [{ text: "System: You are a polite AI. Always start with 'Greetings from Ayu!'. User: " + query }] 
            }]
        });

        const aiText = response.data.candidates[0].content.parts[0].text;

        res.json({
            status: true,
            creator: "Ayu",
            result: aiText
        });
    } catch (e) {
        res.json({ status: false, error: "Server busy! Vercel settings mein GEMINI_KEY check karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ayu's API Live!`));
