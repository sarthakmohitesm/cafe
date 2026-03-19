const { exec } = require('child_process');
const http = require('http');

console.log("Starting server...");
const serverProcess = exec('node server.js', { env: process.env });

serverProcess.stdout.on('data', (d) => console.log('SERVER:', d.trim()));
serverProcess.stderr.on('data', (d) => console.error('SERVER ERR:', d.trim()));

setTimeout(() => {
    function testAPI(path) {
        return new Promise((resolve) => {
            console.log("Testing GET " + path + "...");
            const req = http.get('http://localhost:3000' + path, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    console.log("[" + path + "] Code:", res.statusCode);
                    console.log("[" + path + "] Body:", body.substring(0, 150) + (body.length > 150 ? '...' : ''));
                    resolve();
                });
            });
            req.on('error', (e) => {
                console.error("[" + path + "] Error:", e);
                resolve();
            });
        });
    }

    testAPI('/api/admin/stats')
    .then(() => testAPI('/api/admin/reservations'))
    .then(() => testAPI('/api/admin/orders'))
    .then(() => {
        serverProcess.kill();
        process.exit(0);
    });

}, 2000);
