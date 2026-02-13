const express = require('express');
const axios = require('axios');
const app = express();

// 1. Home Page Branding
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: Arial; text-align: center; margin-top: 50px;">
            <h1>✅ Ayu AI API is Live!</h1>
            <p>Made with ❤️ by <b>Ayu</b></p>
            <p>Use: <code>/ayu-ai?q=hello</code></p>
        </div>
    `);
});

// 2. Main AI Route
app.get('/ayu-ai', async (req, res) => {
    const prompt = req.query.q;
    const key = process.env.GEMINI_KEY;

    if (!prompt) return res.json({ status: false, creator: "Ayu", error: "Prompt pucho yarr!" });

    try {
        // Naya Gemini 2.5 Flash Model jo aapki key support karti hai
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );
        
        const result = response.data.candidates[0].content.parts[0].text;
        
        res.json({ 
            status: true, 
            creator: "Ayu", 
            result: result 
        });

    } catch (error) {
        
        res.status(200).json({ 
            status: false, 
            creator: "Ayu", 
            error: "Limit reach ya model error!",
            msg: "Check Vercel Logs for more info."
        });
    }
});

// Vercel ke liye zaroori export
module.exports = app;
