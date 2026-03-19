const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// MySQL Database Connection
// Update these credentials to match your MySQL Workbench setup
// ============================================================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',          // <-- Enter your MySQL password here
    database: 'cafe_aroma_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('⚠️  Server running without database. Using fallback data.');
    } else {
        console.log('✅ Connected to MySQL database: cafe_aroma_db');
    }
});

// Helper: check if DB is connected
function isDbConnected() {
    return db && db.authorized !== false && db.state !== 'disconnected';
}

// ============================================================
// FALLBACK DATA (used when DB is not connected)
// ============================================================
const fallbackCategories = [
    { category_id: 1, category_name: 'Hot Coffee', description: 'Our signature hot coffee beverages' },
    { category_id: 2, category_name: 'Cold Coffee', description: 'Refreshing iced and cold brew drinks' },
    { category_id: 3, category_name: 'Tea', description: 'Premium loose leaf teas' },
    { category_id: 4, category_name: 'Pastries', description: 'Freshly baked pastries' },
    { category_id: 5, category_name: 'Desserts', description: 'Indulgent sweet treats' },
    { category_id: 6, category_name: 'Breakfast', description: 'Hearty breakfast items' }
];

const fallbackMenuItems = [
    { item_id: 1, item_name: 'Classic Espresso', description: 'Rich and bold single-origin espresso shot with golden crema', price: 3.50, category_id: 1, category_name: 'Hot Coffee', image_url: '/images/espresso.png', is_featured: 1 },
    { item_id: 2, item_name: 'Cappuccino', description: 'Perfectly balanced espresso with steamed milk and velvety foam art', price: 4.50, category_id: 1, category_name: 'Hot Coffee', image_url: '/images/cappuccino.png', is_featured: 1 },
    { item_id: 3, item_name: 'Café Latte', description: 'Smooth espresso blended with creamy steamed milk', price: 4.75, category_id: 1, category_name: 'Hot Coffee', image_url: '/images/cappuccino.png', is_featured: 0 },
    { item_id: 4, item_name: 'Mocha Delight', description: 'Espresso with rich chocolate and steamed milk topped with whipped cream', price: 5.25, category_id: 1, category_name: 'Hot Coffee', image_url: '/images/cappuccino.png', is_featured: 1 },
    { item_id: 5, item_name: 'Americano', description: 'Double espresso diluted with hot water for a smooth finish', price: 3.75, category_id: 1, category_name: 'Hot Coffee', image_url: '/images/espresso.png', is_featured: 0 },
    { item_id: 6, item_name: 'Iced Caramel Latte', description: 'Chilled espresso with caramel drizzle and cold milk over ice', price: 5.50, category_id: 2, category_name: 'Cold Coffee', image_url: '/images/cappuccino.png', is_featured: 1 },
    { item_id: 7, item_name: 'Cold Brew', description: 'Slow-steeped 24-hour cold brew, smooth and naturally sweet', price: 4.25, category_id: 2, category_name: 'Cold Coffee', image_url: '/images/espresso.png', is_featured: 0 },
    { item_id: 8, item_name: 'Frappe Mocha', description: 'Blended iced mocha with whipped cream and chocolate shavings', price: 5.75, category_id: 2, category_name: 'Cold Coffee', image_url: '/images/cappuccino.png', is_featured: 0 },
    { item_id: 9, item_name: 'English Breakfast Tea', description: 'Classic strong black tea served with milk on the side', price: 3.00, category_id: 3, category_name: 'Tea', image_url: '/images/espresso.png', is_featured: 0 },
    { item_id: 10, item_name: 'Green Matcha Latte', description: 'Ceremonial grade matcha whisked with steamed milk', price: 4.50, category_id: 3, category_name: 'Tea', image_url: '/images/cappuccino.png', is_featured: 1 },
    { item_id: 11, item_name: 'Chamomile Bliss', description: 'Soothing chamomile herbal tea with honey', price: 3.25, category_id: 3, category_name: 'Tea', image_url: '/images/espresso.png', is_featured: 0 },
    { item_id: 12, item_name: 'Butter Croissant', description: 'Flaky, golden French-style croissant made with pure butter', price: 3.50, category_id: 4, category_name: 'Pastries', image_url: '/images/croissant.png', is_featured: 1 },
    { item_id: 13, item_name: 'Chocolate Danish', description: 'Pastry swirled with rich Belgian chocolate filling', price: 4.00, category_id: 4, category_name: 'Pastries', image_url: '/images/croissant.png', is_featured: 0 },
    { item_id: 14, item_name: 'Blueberry Muffin', description: 'Moist muffin bursting with fresh blueberries', price: 3.75, category_id: 4, category_name: 'Pastries', image_url: '/images/croissant.png', is_featured: 0 },
    { item_id: 15, item_name: 'Tiramisu', description: 'Classic Italian tiramisu with espresso-soaked ladyfingers', price: 6.50, category_id: 5, category_name: 'Desserts', image_url: '/images/croissant.png', is_featured: 1 },
    { item_id: 16, item_name: 'Chocolate Lava Cake', description: 'Warm cake with a molten chocolate center', price: 7.00, category_id: 5, category_name: 'Desserts', image_url: '/images/croissant.png', is_featured: 0 },
    { item_id: 17, item_name: 'Avocado Toast', description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, and microgreens', price: 8.50, category_id: 6, category_name: 'Breakfast', image_url: '/images/croissant.png', is_featured: 1 },
    { item_id: 18, item_name: 'Eggs Benedict', description: 'Poached eggs on English muffin with hollandaise sauce', price: 9.50, category_id: 6, category_name: 'Breakfast', image_url: '/images/croissant.png', is_featured: 0 }
];

const fallbackReviews = [
    { review_id: 1, customer_name: 'Ananya Sharma', rating: 5, review_text: 'Absolutely love this café! The cappuccino is the best I have ever had.', created_at: '2026-03-15' },
    { review_id: 2, customer_name: 'Rahul Verma', rating: 4, review_text: 'Great coffee and the pastries are always fresh. Very friendly staff.', created_at: '2026-03-14' },
    { review_id: 3, customer_name: 'Priya Patel', rating: 5, review_text: 'The tiramisu here is to die for! Perfect place for weekend brunch.', created_at: '2026-03-13' },
    { review_id: 4, customer_name: 'Vikram Singh', rating: 4, review_text: 'Nice ambiance and quality drinks. Would definitely recommend the cold brew.', created_at: '2026-03-12' },
    { review_id: 5, customer_name: 'Meera Joshi', rating: 5, review_text: 'Best café in the city! The avocado toast is absolutely delicious.', created_at: '2026-03-11' }
];

// ============================================================
// API ROUTES
// ============================================================

// GET - All categories
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM categories ORDER BY category_name';
    db.query(query, (err, results) => {
        if (err) return res.json(fallbackCategories);
        res.json(results);
    });
});

// GET - All menu items (with category name)
app.get('/api/menu', (req, res) => {
    const query = `
        SELECT m.*, c.category_name 
        FROM menu_items m 
        LEFT JOIN categories c ON m.category_id = c.category_id 
        WHERE m.is_available = TRUE 
        ORDER BY m.category_id, m.item_name
    `;
    db.query(query, (err, results) => {
        if (err) return res.json(fallbackMenuItems);
        res.json(results);
    });
});

// GET - Featured menu items
app.get('/api/menu/featured', (req, res) => {
    const query = `
        SELECT m.*, c.category_name 
        FROM menu_items m 
        LEFT JOIN categories c ON m.category_id = c.category_id 
        WHERE m.is_featured = TRUE AND m.is_available = TRUE 
        ORDER BY m.category_id
    `;
    db.query(query, (err, results) => {
        if (err) return res.json(fallbackMenuItems.filter(i => i.is_featured));
        res.json(results);
    });
});

// GET - Menu items by category
app.get('/api/menu/category/:categoryId', (req, res) => {
    const query = `
        SELECT m.*, c.category_name 
        FROM menu_items m 
        LEFT JOIN categories c ON m.category_id = c.category_id 
        WHERE m.category_id = ? AND m.is_available = TRUE 
        ORDER BY m.item_name
    `;
    db.query(query, [req.params.categoryId], (err, results) => {
        if (err) return res.json(fallbackMenuItems.filter(i => i.category_id == req.params.categoryId));
        res.json(results);
    });
});

// POST - Create a reservation
app.post('/api/reservations', (req, res) => {
    const { customer_name, email, phone, reservation_date, reservation_time, party_size, special_requests } = req.body;

    if (!customer_name || !email || !phone || !reservation_date || !reservation_time || !party_size) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const query = `
        INSERT INTO reservations (customer_name, email, phone, reservation_date, reservation_time, party_size, special_requests)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [customer_name, email, phone, reservation_date, reservation_time, party_size, special_requests || ''], (err, result) => {
        if (err) {
            console.error('Reservation error:', err);
            return res.json({ success: true, message: 'Reservation request received! (Demo mode)', id: Date.now() });
        }
        res.json({ success: true, message: 'Reservation confirmed!', id: result.insertId });
    });
});

// POST - Contact form
app.post('/api/contact', (req, res) => {
    const { sender_name, sender_email, subject, message } = req.body;

    if (!sender_name || !sender_email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const query = `
        INSERT INTO contact_messages (sender_name, sender_email, subject, message)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [sender_name, sender_email, subject || 'General Inquiry', message], (err, result) => {
        if (err) {
            console.error('Contact error:', err);
            return res.json({ success: true, message: 'Message received! (Demo mode)' });
        }
        res.json({ success: true, message: 'Thank you! We will get back to you soon.' });
    });
});

// GET - Approved reviews
app.get('/api/reviews', (req, res) => {
    const query = 'SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) return res.json(fallbackReviews);
        res.json(results);
    });
});

// POST - Submit a review
app.post('/api/reviews', (req, res) => {
    const { customer_name, email, rating, review_text } = req.body;

    if (!customer_name || !rating || !review_text) {
        return res.status(400).json({ error: 'Name, rating, and review are required' });
    }

    const query = `
        INSERT INTO reviews (customer_name, email, rating, review_text, is_approved)
        VALUES (?, ?, ?, ?, TRUE)
    `;
    db.query(query, [customer_name, email || '', rating, review_text], (err, result) => {
        if (err) {
            console.error('Review error:', err);
            return res.json({ success: true, message: 'Review submitted! (Demo mode)' });
        }
        res.json({ success: true, message: 'Thank you for your review!' });
    });
});

// POST - Place an order
app.post('/api/orders', (req, res) => {
    const { customer_name, email, phone, items, special_instructions } = req.body;

    if (!customer_name || !email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Customer info and at least one item are required' });
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // In demo mode, just return success
    res.json({
        success: true,
        message: 'Order placed successfully!',
        order_id: Date.now(),
        total: totalAmount.toFixed(2)
    });
});

// Serve the main HTML file for all other routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`\n☕ Café Aroma server running at http://localhost:${PORT}`);
    console.log(`📂 Serving static files from /public`);
    console.log(`📡 API available at http://localhost:${PORT}/api\n`);
});
