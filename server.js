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
let dbConnected = false;
let db;

try {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pass@123',          // <-- Enter your MySQL password here
        database: 'cafe_aroma_db',
        connectTimeout: 5000
    });

    db.connect((err) => {
        if (err) {
            console.error('❌ Database connection failed:', err.message);
            console.log('⚠️  Server running without database. Using fallback data.');
            dbConnected = false;
        } else {
            console.log('✅ Connected to MySQL database: cafe_aroma_db');
            dbConnected = true;
        }
    });

    db.on('error', (err) => {
        console.error('DB error:', err.message);
        dbConnected = false;
    });
} catch (e) {
    console.error('❌ Could not create DB connection:', e.message);
    dbConnected = false;
}

// Helper to safely query - returns fallback if DB not connected
function safeQuery(query, params, fallbackData, callback) {
    if (!dbConnected || !db) {
        return callback(fallbackData);
    }
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Query error:', err.message);
            return callback(fallbackData);
        }
        callback(results);
    });
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
    safeQuery('SELECT * FROM categories ORDER BY category_name', [], fallbackCategories, (data) => {
        res.json(data);
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
    safeQuery(query, [], fallbackMenuItems, (data) => {
        res.json(data);
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
    safeQuery(query, [], fallbackMenuItems.filter(i => i.is_featured), (data) => {
        res.json(data);
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
    const fallback = fallbackMenuItems.filter(i => i.category_id == req.params.categoryId);
    safeQuery(query, [req.params.categoryId], fallback, (data) => {
        res.json(data);
    });
});

// POST - Create a reservation
app.post('/api/reservations', (req, res) => {
    const { customer_name, email, phone, reservation_date, reservation_time, party_size, special_requests } = req.body;

    if (!customer_name || !email || !phone || !reservation_date || !reservation_time || !party_size) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    if (!dbConnected) {
        return res.json({ success: true, message: 'Reservation request received! (Demo mode)', id: Date.now() });
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

    if (!dbConnected) {
        return res.json({ success: true, message: 'Message received! (Demo mode)' });
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
    safeQuery('SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC LIMIT 10', [], fallbackReviews, (data) => {
        res.json(data);
    });
});

// POST - Submit a review
app.post('/api/reviews', (req, res) => {
    const { customer_name, email, rating, review_text } = req.body;

    if (!customer_name || !rating || !review_text) {
        return res.status(400).json({ error: 'Name, rating, and review are required' });
    }

    if (!dbConnected) {
        return res.json({ success: true, message: 'Review submitted! (Demo mode)' });
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

// ============================================================
// TABLE AND ORDER MANAGEMENT
// ============================================================

// In-memory storage for demo mode (when DB is not connected)
let demoBookings = [];
let demoOrders = [];

// GET - Table status (which tables are booked today)
app.get('/api/tables/status', (req, res) => {
    const allTables = [];
    for (let i = 1; i <= 12; i++) {
        allTables.push({
            table_id: i,
            seats: [2,2,4,4,4,6,6,4,2,2,8,4][i-1],
            zone: i <= 4 ? 'Window' : i <= 8 ? 'Center' : 'Cozy Corner',
            status: 'available'
        });
    }

    if (!dbConnected) {
        // Check demo bookings
        const today = new Date().toISOString().split('T')[0];
        demoBookings.forEach(b => {
            if (b.reservation_date === today) {
                const table = allTables.find(t => t.table_id === b.table_id);
                if (table) table.status = 'booked';
            }
        });
        return res.json(allTables);
    }

    const query = `SELECT DISTINCT table_id FROM reservations WHERE reservation_date = CURDATE() AND status != 'cancelled'`;
    db.query(query, (err, results) => {
        if (err) return res.json(allTables);
        const bookedIds = results.map(r => r.table_id);
        allTables.forEach(t => {
            if (bookedIds.includes(t.table_id)) t.status = 'booked';
        });
        res.json(allTables);
    });
});

// POST - Create a reservation (updated with table_id)
app.post('/api/reservations', (req, res) => {
    const { customer_name, email, phone, reservation_date, reservation_time, party_size, special_requests, table_id } = req.body;

    if (!customer_name || !email || !phone || !reservation_date || !reservation_time || !party_size) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Store in demo array
    const booking = {
        id: Date.now(),
        customer_name, email, phone, reservation_date, reservation_time,
        party_size: parseInt(party_size),
        table_id: table_id || null,
        special_requests: special_requests || '',
        status: 'confirmed',
        created_at: new Date().toISOString()
    };
    demoBookings.push(booking);

    if (!dbConnected) {
        return res.json({ success: true, message: 'Reservation confirmed! (Demo mode)', id: booking.id });
    }

    const query = `
        INSERT INTO reservations (customer_name, email, phone, reservation_date, reservation_time, party_size, table_id, special_requests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [customer_name, email, phone, reservation_date, reservation_time, party_size, table_id || null, special_requests || ''], (err, result) => {
        if (err) {
            console.error('Reservation error:', err);
            return res.json({ success: true, message: 'Reservation confirmed! (Demo mode)', id: booking.id });
        }
        res.json({ success: true, message: 'Reservation confirmed!', id: result.insertId });
    });
});

// POST - Place an order (updated with table_id)
app.post('/api/orders', (req, res) => {
    const { customer_name, email, phone, table_id, items } = req.body;

    if (!customer_name || !items || items.length === 0) {
        return res.status(400).json({ error: 'Customer info and at least one item are required' });
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
        order_id: Date.now(),
        customer_name, email, phone,
        table_id: table_id || null,
        items,
        total: totalAmount.toFixed(2),
        status: 'pending',
        created_at: new Date().toISOString()
    };
    demoOrders.push(order);

    if (!dbConnected) {
        return res.json({
            success: true,
            message: 'Order placed successfully!',
            order_id: order.order_id,
            total: order.total
        });
    }

    const orderQuery = `INSERT INTO orders (customer_name, email, phone, table_id, total_amount, status) VALUES (?, ?, ?, ?, ?, 'pending')`;
    db.query(orderQuery, [customer_name, email || '', phone || '', table_id || null, totalAmount], (err, result) => {
        if (err) {
            console.error('Order error:', err);
            return res.json({ success: true, message: 'Order placed! (Demo mode)', order_id: order.order_id, total: order.total });
        }

        const orderId = result.insertId;
        const itemValues = items.map(i => [orderId, i.item_id, i.quantity, i.price]);
        const itemQuery = `INSERT INTO order_items (order_id, item_id, quantity, unit_price) VALUES ?`;

        db.query(itemQuery, [itemValues], (err2) => {
            if (err2) console.error('Order items error:', err2);
            res.json({ success: true, message: 'Order placed successfully!', order_id: orderId, total: totalAmount.toFixed(2) });
        });
    });
});

// ============================================================
// ADMIN API ROUTES
// ============================================================

// POST - Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    if (!dbConnected) {
        // Fallback demo mode auth
        if (username === 'admin' && password === 'admin123') {
            return res.json({ success: true, token: 'demo-token', message: 'Logged in successfully (Demo mode)' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    const query = 'SELECT admin_id, username FROM admins WHERE username = ? AND password_hash = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
            // Generate a simple token (in production, use JWT)
            const token = Buffer.from(username + ':' + Date.now()).toString('base64');
            res.json({ success: true, token, admin: results[0], message: 'Logged in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// GET - All reservations for admin
app.get('/api/admin/reservations', (req, res) => {
    if (!dbConnected) {
        return res.json(demoBookings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }

    const query = `SELECT * FROM reservations ORDER BY created_at DESC LIMIT 50`;
    db.query(query, (err, results) => {
        if (err) return res.json(demoBookings);
        res.json(results);
    });
});

// GET - All orders for admin
app.get('/api/admin/orders', (req, res) => {
    if (!dbConnected) {
        return res.json(demoOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }

    const query = `SELECT * FROM orders ORDER BY created_at DESC LIMIT 50`;
    db.query(query, (err, results) => {
        if (err) return res.json(demoOrders);
        res.json(results);
    });
});

// PUT - Update reservation status
app.put('/api/admin/reservations/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    
    if (!status) return res.status(400).json({ error: 'Status is required' });

    if (!dbConnected) {
        const booking = demoBookings.find(b => parseInt(b.id) === parseInt(id));
        if (booking) booking.status = status;
        return res.json({ success: true, message: 'Status updated (Demo mode)' });
    }

    const query = 'UPDATE reservations SET status = ? WHERE reservation_id = ?';
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err.message });
        res.json({ success: true, message: 'Reservation status updated successfully' });
    });
});

// PUT - Update order status
app.put('/api/admin/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) return res.status(400).json({ error: 'Status is required' });

    if (!dbConnected) {
        const order = demoOrders.find(o => parseInt(o.order_id) === parseInt(id));
        if (order) order.status = status;
        return res.json({ success: true, message: 'Status updated (Demo mode)' });
    }

    const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err.message });
        res.json({ success: true, message: 'Order status updated successfully' });
    });
});

// GET - Table booking summary for admin
app.get('/api/admin/tables', (req, res) => {
    const allTables = [];
    for (let i = 1; i <= 12; i++) {
        allTables.push({
            table_id: i,
            table_name: `T${i}`,
            seats: [2,2,4,4,4,6,6,4,2,2,8,4][i-1],
            zone: i <= 4 ? 'Window' : i <= 8 ? 'Center' : 'Cozy Corner',
            status: 'available',
            booked_by: null,
            booked_time: null
        });
    }

    if (!dbConnected) {
        const today = new Date().toISOString().split('T')[0];
        demoBookings.forEach(b => {
            if (b.reservation_date === today) {
                const table = allTables.find(t => t.table_id === b.table_id);
                if (table) {
                    table.status = 'booked';
                    table.booked_by = b.customer_name;
                    table.booked_time = b.reservation_time;
                }
            }
        });
        return res.json(allTables);
    }

    const query = `SELECT r.table_id, r.customer_name, r.reservation_time FROM reservations r WHERE r.reservation_date = CURDATE() AND r.status != 'cancelled'`;
    db.query(query, (err, results) => {
        if (err) return res.json(allTables);
        results.forEach(r => {
            const table = allTables.find(t => t.table_id === r.table_id);
            if (table) {
                table.status = 'booked';
                table.booked_by = r.customer_name;
                table.booked_time = r.reservation_time;
            }
        });
        res.json(allTables);
    });
});

// GET - Admin dashboard stats
app.get('/api/admin/stats', (req, res) => {
    if (!dbConnected) {
        const today = new Date().toISOString().split('T')[0];
        const todayBookings = demoBookings.filter(b => b.reservation_date === today);
        const totalRevenue = demoOrders.reduce((sum, o) => sum + parseFloat(o.total), 0);
        return res.json({
            total_orders: demoOrders.length,
            total_reservations: demoBookings.length,
            tables_booked_today: todayBookings.length,
            total_tables: 12,
            total_revenue: totalRevenue.toFixed(2),
            pending_orders: demoOrders.filter(o => o.status === 'pending').length
        });
    }

    const statsQueries = [
        `SELECT COUNT(*) as count FROM orders`,
        `SELECT COUNT(*) as count FROM reservations`,
        `SELECT COUNT(DISTINCT table_id) as count FROM reservations WHERE reservation_date = CURDATE() AND status != 'cancelled'`,
        `SELECT COALESCE(SUM(total_amount), 0) as total FROM orders`,
        `SELECT COUNT(*) as count FROM orders WHERE status = 'pending'`
    ];

    Promise.all(statsQueries.map(q => new Promise((resolve) => {
        db.query(q, (err, results) => {
            if (err) resolve(0);
            else resolve(results[0].count || results[0].total || 0);
        });
    }))).then(([orders, reservations, tablesBooked, revenue, pending]) => {
        res.json({
            total_orders: orders,
            total_reservations: reservations,
            tables_booked_today: tablesBooked,
            total_tables: 12,
            total_revenue: parseFloat(revenue).toFixed(2),
            pending_orders: pending
        });
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
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`🔐 Admin panel at http://localhost:${PORT}/admin.html\n`);
});
