const express = require('express');
const { spawn } = require('child_process');
const { Writable } = require('stream');

const app = express();
app.use(express.json());

const subprocess = spawn('./build/pbrain-rapfi', ['--mode', 'gomocup'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
});

const commandQueue = [];
const responseQueue = [];

const inputStream = new Writable({
    write(chunk, encoding, callback) {
        subprocess.stdin.write(chunk, encoding, callback);
    }
});

subprocess.stdout.on('data', (data) => {
    const response = data.toString().trim();
    console.log(`[Subprocess Response]: ${response}`); // Debugging

    if (responseQueue.length > 0) {
        const resolve = responseQueue.shift();
        resolve(response);
    }
});

subprocess.on('error', (err) => {
    console.error(`[Subprocess Error]: Failed to start subprocess - ${err.message}`);
});

subprocess.on('exit', (code, signal) => {
    console.error(`[Subprocess Exit]: Exited with code ${code}, signal ${signal}`);
});

app.get('/test', (req, res) => {
    res.json({ status: "Engine is running" });
});

app.post('/command', async (req, res) => {
    const cmd = req.body.command;
    if (!cmd) {
        return res.status(400).json({ error: "No command provided" });
    }

    console.log(`[Command Sent]: ${cmd}`); // Debugging

    try {
        inputStream.write(cmd + '\n');

        const response = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Timeout waiting for response")), 5000);
            responseQueue.push((data) => {
                clearTimeout(timeout);
                resolve(data);
            });
        });

        console.log(`[Response Received]: ${response}`); // Debugging
        res.json({ response });

    } catch (err) {
        console.error(`[Command Error]: ${err.message}`);
        res.status(408).json({ error: err.message });
    }
});

process.on('SIGINT', () => {
    console.log("Shutting down server and subprocess...");
    subprocess.kill();
    process.exit();
});

const PORT = 5005;
app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
