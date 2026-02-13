const express = require('express');
const axios = require('axios');
const app = express();

app.get('/ayu-ai', async (req, res) => {
    const prompt = req.query.q;
    const key = process.env.GEMINI_KEY; // Aapki secret key

    // Agar user ne sawal nahi pucha
    if (!prompt) {
        return res.json({ 
            status: false, 
            message: "Arey! Sawal toh pucho. Example: /ayu-ai?q=hello",
            creator: "Ayu" 
        });
    }

    try {
        // Naya Gemini 2.5 Flash Model
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
        
        const response = await axios.post(apiUrl, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        // AI ka reply nikaalna
        const aiReply = response.data.candidates[0].content.parts[0].text;

        // Aapki branding ke saath response
        res.json({
            status: true,
            creator: "Ayu",
            result: `✨ *OFFICIAL AI BY AYU*\n\n${aiReply}\n\n🚀 _Powered by Ayu AI API_`
        });

    } catch (error) {
        // Agar limit khatam ho jaye (1,500 requests/day)
        res.json({ 
            status: false, 
            error: "Server Busy ya Limit Reach! Thodi der baad try karein.",
            creator: "Ayu",
            details: error.response ? error.response.data : error.message 
        });
    }
});

// Home page par bhi branding dikhao
app.get('/', (req, res) => {
    res.send("<h1>✅ Ayu AI API is Live!</h1><p>Use <b>/ayu-ai?q=YourQuestion</b> to chat.</p><p><i>Made with ❤️ by Ayu</i></p>");
});

module.exports = app;
