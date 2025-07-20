const express = require('express');
const fs = require('fs');
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    const lang = req.headers['accept-language'];
    console.log(lang);
    res.send("server berjalan normal langsung Ketik /api pada bagian url " + lang);
});
app.get('/api', (req, res) => {
    fs.readFile(__dirname + '/motivasi.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "gagal baca file" });
        };
        try {
            const quotes = JSON.parse(data);
            console.log("data json: ", quotes);
            // res.setHeader('Content-Type', 'application/json');
            res.json(quotes);
        } catch (parseError) {
            console.log("Error parsing ", parseError);
            res.status(500).json({ error: "format JSON tidak valid" });
        };
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
