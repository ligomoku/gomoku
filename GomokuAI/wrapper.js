const express = require('express');
const { spawn } = require('child_process');
const { Readable, Writable } = require('stream');

const app = express();
app.use(express.json());

const process = spawn('./build/pbrain-rapfi', ['--mode', 'gomocup'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

const commandQueue = [];
const responseQueue = [];

const inputStream = new Writable({
    write(chunk, encoding, callback) {
        process.stdin.write(chunk, encoding, callback);
    }
});

const outputStream = new Readable({
    read() {}
});

process.stdout.on('data', (data) => {
    const response = data.toString().trim();
    if (responseQueue.length > 0) {
        const resolve = responseQueue.shift();
        resolve(response);
    }
});

process.on('error', (err) => {
    console.error('Failed to start subprocess:', err);
});

app.get('/test', (req, res) => {
    res.json({ status: "Engine is running" });
});

app.post('/command', async (req, res) => {
    const cmd = req.body.command;
    if (!cmd) {
        return res.status(400).json({ error: "No command provided" });
    }

    commandQueue.push(cmd);

    inputStream.write(cmd + '\n');

    try {
        const response = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Timeout waiting for response")), 5000);
            responseQueue.push((data) => {
                clearTimeout(timeout);
                resolve(data);
            });
        });
        res.json({ response });
    } catch (err) {
        res.status(408).json({ error: err.message });
    }
});

const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
