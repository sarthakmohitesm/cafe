const http = require('http');

const orderData = JSON.stringify({
    customer_name: 'John Doe Sample',
    email: 'john@example.com',
    phone: '1234567890',
    table_id: 2,
    items: [
        { item_id: 1, quantity: 2, price: 3.50 },
        { item_id: 15, quantity: 1, price: 6.50 }
    ]
});

const req = http.request('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': orderData.length
    }
}, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        console.log("Response:", body);
    });
});

req.on('error', (e) => console.error(e));
req.write(orderData);
req.end();
