const { exec } = require('child_process');
const http = require('http');

console.log("Starting server...");
const serverProcess = exec('node server.js', { env: process.env });

serverProcess.stdout.on('data', (d) => console.log('SERVER:', d.trim()));
serverProcess.stderr.on('data', (d) => console.error('SERVER ERR:', d.trim()));

setTimeout(() => {
    console.log("Testing POST /api/admin/login...");
    const req = http.request('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            console.log("Response Code:", res.statusCode);
            console.log("Response Body:", body);
            serverProcess.kill();
            process.exit(0);
        });
    });
    
    req.on('error', (e) => {
        console.error("Request Error:", e);
        serverProcess.kill();
        process.exit(1);
    });
    
    req.write(JSON.stringify({ username: 'admin', password: 'admin123' }));
    req.end();

}, 2000);
