const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'cafe_aroma_db'
});

db.query('SHOW TABLES', (err, results) => {
    if (err) throw err;
    console.log("Tables in DB:", results);
    
    db.query('DESCRIBE orders', (err2, res2) => {
        if (err2) {
            console.error("Orders table error:", err2.message);
        } else {
            console.log("Orders Schema:", res2);
        }
        db.end();
    });
});
