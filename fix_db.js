const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'cafe_aroma_db',
    multipleStatements: true
});

const queries = `
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(200) NOT NULL,
    email VARCHAR(200),
    phone VARCHAR(20),
    table_id INT,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'preparing', 'ready', 'delivered', 'completed', 'cancelled') DEFAULT 'pending',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE CASCADE
);

INSERT INTO orders (customer_name, email, phone, table_id, total_amount, status) VALUES 
('Alice Smith', 'alice@test.com', '1234567890', 2, 12.50, 'pending'),
('Bob Jones', 'bob@test.com', '0987654321', 4, 8.00, 'preparing');

INSERT INTO order_items (order_id, item_id, quantity, unit_price) VALUES 
(1, 1, 2, 3.50),
(1, 2, 1, 5.50),
(2, 3, 2, 4.00);
`;

db.query(queries, (err, results) => {
    if (err) {
        console.error("Error fixing DB:", err.message);
    } else {
        console.log("Database schema updated and sample orders inserted!");
    }
    db.end();
});
