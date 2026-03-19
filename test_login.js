const fetch = require('node-fetch');

async function test() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const data = await res.json();
        console.log("Login Response:");
        console.log(JSON.stringify(data, null, 2));

        if (data.success) {
            console.log("\nTesting stats API...");
            const stats = await fetch('http://localhost:3000/api/admin/stats').then(r => r.json());
            console.log("Stats Data:", JSON.stringify(stats, null, 2));
            
            console.log("\nTesting reservations API...");
            const resData = await fetch('http://localhost:3000/api/admin/reservations').then(r => r.json());
            console.log("Reservations Data length:", resData.length);
        }
    } catch (e) {
        console.error("Test Error:", e);
    }
}

test();
