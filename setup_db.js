const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'cafe_aroma_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to db:', err.message);
        process.exit(1);
    }
    
    console.log('Connected to cafe_aroma_db.');
    
    // 1. Create admins table
    const createAdmins = `
        CREATE TABLE IF NOT EXISTS admins (
            admin_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(200) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    
    // 2. Insert admin
    const insertAdmin = `
        INSERT IGNORE INTO admins (username, password_hash, email) 
        VALUES ('admin', 'admin123', 'admin@cafearoma.com');
    `;
    
    db.query(createAdmins, (err) => {
        if (err) {
            console.error('Error creating admins:', err.message);
        } else {
            console.log('Admins table ensured.');
            db.query(insertAdmin, (err) => {
                if (err) console.error('Error inserting admin:', err.message);
                else console.log('Admin user ensured (admin/admin123).');
                
                db.end();
            });
        }
    });
});
