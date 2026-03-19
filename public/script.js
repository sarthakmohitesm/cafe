// ============================================================
// CAFÉ AROMA — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 600);
        }, 1500);
    });

    // ===== HERO PARTICLES =====
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background on scroll
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on section
        updateActiveNavLink();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger about features
                if (entry.target.closest('.about-content')) {
                    const features = entry.target.querySelectorAll('.feature');
                    features.forEach((feature, i) => {
                        setTimeout(() => feature.classList.add('visible'), 200 * (i + 1));
                    });
                }

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out quartic
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ===== FETCH AND RENDER MENU =====
    async function loadMenu() {
        try {
            const [menuRes, catRes] = await Promise.all([
                fetch('/api/menu'),
                fetch('/api/categories')
            ]);
            const menuItems = await menuRes.json();
            window.fullMenu = menuItems;
            const categories = await catRes.json();

            renderFilterButtons(categories);
            renderMenuCards(menuItems);
            setupFilters(menuItems);
        } catch (error) {
            console.error('Error loading menu:', error);
        }
    }

    function renderFilterButtons(categories) {
        const filterContainer = document.getElementById('menuFilter');
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.classList.add('filter-btn');
            btn.setAttribute('data-category', cat.category_id);
            btn.textContent = cat.category_name;
            filterContainer.appendChild(btn);
        });
    }

    function renderMenuCards(items) {
        const grid = document.getElementById('menuGrid');
        grid.innerHTML = '';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('menu-card');
            card.setAttribute('data-category', item.category_id);
            card.style.animationDelay = `${index * 0.08}s`;

            card.innerHTML = `
                <div class="menu-card-image">
                    <img src="${item.image_url || '/images/cappuccino.png'}" alt="${item.item_name}" loading="lazy">
                    ${item.is_featured ? '<span class="menu-card-badge">Featured</span>' : ''}
                </div>
                <div class="menu-card-body">
                    <p class="menu-card-category">${item.category_name || ''}</p>
                    <h3 class="menu-card-name">${item.item_name}</h3>
                    <p class="menu-card-desc">${item.description}</p>
                    <div class="menu-card-footer">
                        <span class="menu-card-price">$${parseFloat(item.price).toFixed(2)}</span>
                        <button class="add-to-order-btn" title="Add to order" onclick="window.addDirectToCart(${item.item_id})">+</button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    function setupFilters(allItems) {
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                if (category === 'all') {
                    renderMenuCards(allItems);
                } else {
                    const filtered = allItems.filter(item => item.category_id == category);
                    renderMenuCards(filtered);
                }
            });
        });
    }

    loadMenu();



    // ===== TABLE BOOKING SYSTEM =====
    let selectedTable = null;
    let bookingInfo = {};
    let cart = [];
    let allMenuItems = [];
    let bookedTables = [];

    // Fetch booked tables status
    async function loadBookedTables() {
        try {
            const res = await fetch('/api/tables/status');
            const data = await res.json();
            bookedTables = data.filter(t => t.status === 'booked').map(t => t.table_id);
        } catch (e) {
            bookedTables = [];
        }
        updateTableStatus();
    }

    function updateTableStatus() {
        document.querySelectorAll('.table-spot').forEach(spot => {
            const tableId = parseInt(spot.dataset.tableId);
            if (bookedTables.includes(tableId)) {
                spot.classList.add('booked');
            } else {
                spot.classList.remove('booked');
            }
        });
        // Also update mini-map
        document.querySelectorAll('.mini-table').forEach((mini, idx) => {
            const tableId = idx + 1;
            if (bookedTables.includes(tableId)) {
                mini.classList.add('booked');
            } else {
                mini.classList.remove('booked');
            }
        });
    }

    // Open modal
    const openBtn = document.getElementById('openTableMapBtn');
    const tableModal = document.getElementById('tableModal');
    const closeModal = document.getElementById('closeTableModal');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            loadBookedTables();
            resetBookingFlow();
            tableModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            tableModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Click outside modal to close
    if (tableModal) {
        tableModal.addEventListener('click', (e) => {
            if (e.target === tableModal) {
                tableModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    function resetBookingFlow() {
        selectedTable = null;
        cart = [];
        showStep('stepSelectTable');
        document.getElementById('selectedTableInfo').style.display = 'none';
        document.querySelectorAll('.table-spot').forEach(s => s.classList.remove('selected'));
    }

    function showStep(stepId) {
        document.querySelectorAll('.modal-step').forEach(s => s.style.display = 'none');
        document.getElementById(stepId).style.display = 'block';
    }

    // Table selection
    document.querySelectorAll('.table-spot').forEach(spot => {
        spot.addEventListener('click', () => {
            if (spot.classList.contains('booked')) return;

            // Deselect all
            document.querySelectorAll('.table-spot').forEach(s => s.classList.remove('selected'));

            // Select this one
            spot.classList.add('selected');
            selectedTable = {
                id: parseInt(spot.dataset.tableId),
                seats: parseInt(spot.dataset.seats),
                zone: spot.dataset.zone
            };

            // Show info bar
            const info = document.getElementById('selectedTableInfo');
            info.style.display = 'block';
            document.getElementById('selectedTableName').textContent = `Table T${selectedTable.id}`;
            document.getElementById('selectedTableSeats').textContent = selectedTable.seats;
            document.getElementById('selectedTableZone').textContent = selectedTable.zone;
        });
    });

    // Proceed to booking form
    const proceedBtn = document.getElementById('proceedToBookingBtn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            if (!selectedTable) return;
            document.getElementById('bookingTableLabel').textContent = `T${selectedTable.id} (${selectedTable.seats} seats, ${selectedTable.zone})`;
            // Set date min
            const dateInput = document.getElementById('tbDate');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
            showStep('stepBookingForm');
        });
    }

    // Back to tables
    const backBtn = document.getElementById('backToTablesBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showStep('stepSelectTable');
        });
    }

    // Booking form submit
    const bookingForm = document.getElementById('tableBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            bookingInfo = {
                customer_name: document.getElementById('tbName').value,
                email: document.getElementById('tbEmail').value,
                phone: document.getElementById('tbPhone').value,
                party_size: document.getElementById('tbGuests').value,
                reservation_date: document.getElementById('tbDate').value,
                reservation_time: document.getElementById('tbTime').value,
                table_id: selectedTable.id
            };

            const btn = document.getElementById('confirmBookingBtn');
            btn.textContent = 'Booking...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingInfo)
                });
                const data = await res.json();
                bookingInfo.booking_id = data.id;
            } catch (e) {
                bookingInfo.booking_id = Date.now();
            }

            btn.textContent = 'Confirm Booking';
            btn.disabled = false;

            // Load menu for order step
            await loadOrderMenu();
            document.getElementById('orderTableLabel').textContent = `T${selectedTable.id}`;
            showStep('stepPlaceOrder');
        });
    }

    // Load menu items for ordering
    async function loadOrderMenu() {
        try {
            const res = await fetch('/api/menu');
            allMenuItems = await res.json();
        } catch (e) {
            allMenuItems = [];
        }
        renderOrderMenu();
    }

    function renderOrderMenu() {
        const list = document.getElementById('orderMenuList');
        list.innerHTML = '';

        allMenuItems.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('order-menu-item');
            div.innerHTML = `
                <img src="${item.image_url || '/images/cappuccino.png'}" alt="${item.item_name}">
                <div class="order-item-details">
                    <h4>${item.item_name}</h4>
                    <span>$${parseFloat(item.price).toFixed(2)}</span>
                </div>
                <button class="order-add-btn" data-item-id="${item.item_id}" title="Add to order">+</button>
            `;
            div.querySelector('.order-add-btn').addEventListener('click', () => addToCart(item));
            list.appendChild(div);
        });
    }

    function addToCart(item) {
        const existing = cart.find(c => c.item_id === item.item_id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                item_id: item.item_id,
                item_name: item.item_name,
                price: parseFloat(item.price),
                quantity: 1
            });
        }
        renderCart();
    }

    function renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const placeOrderBtn = document.getElementById('placeOrderBtn');

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">No items yet. Add from the menu!</p>';
            cartTotal.textContent = '$0.00';
            placeOrderBtn.disabled = true;
            return;
        }

        placeOrderBtn.disabled = false;
        let total = 0;

        cartItems.innerHTML = cart.map(item => {
            const lineTotal = item.price * item.quantity;
            total += lineTotal;
            return `
                <div class="cart-item">
                    <span class="cart-item-name">${item.item_name}</span>
                    <div class="cart-item-qty">
                        <button onclick="updateCartQty(${item.item_id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQty(${item.item_id}, 1)">+</button>
                    </div>
                    <span class="cart-item-price">$${lineTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Make updateCartQty globally accessible
    window.updateCartQty = function(itemId, delta) {
        const item = cart.find(c => c.item_id === itemId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(c => c.item_id !== itemId);
            }
        }
        renderCart();
    };

    // Place order
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', async () => {
            placeOrderBtn.textContent = 'Placing...';
            placeOrderBtn.disabled = true;

            const orderData = {
                customer_name: bookingInfo.customer_name,
                email: bookingInfo.email,
                phone: bookingInfo.phone,
                table_id: selectedTable.id,
                items: cart
            };

            try {
                const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                const data = await res.json();
            } catch (e) {}

            const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
            showConfirmation(total);
        });
    }

    // Skip order
    const skipOrderBtn = document.getElementById('skipOrderBtn');
    if (skipOrderBtn) {
        skipOrderBtn.addEventListener('click', () => {
            showConfirmation(0);
        });
    }

    function showConfirmation(orderTotal) {
        const details = document.getElementById('confirmDetails');
        details.innerHTML = `
            <strong>${bookingInfo.customer_name}</strong><br>
            Table T${selectedTable.id} (${selectedTable.zone})<br>
            Date: ${bookingInfo.reservation_date} at ${bookingInfo.reservation_time}<br>
            Guests: ${bookingInfo.party_size}
        `;

        const orderInfo = document.getElementById('confirmOrder');
        if (orderTotal > 0) {
            orderInfo.textContent = `Order Total: $${orderTotal.toFixed(2)} (${cart.length} items)`;
        } else {
            orderInfo.textContent = 'No food order placed.';
        }

        showStep('stepConfirmation');
    }

    // Close confirmation
    const closeConfirmBtn = document.getElementById('closeConfirmBtn');
    if (closeConfirmBtn) {
        closeConfirmBtn.addEventListener('click', () => {
            tableModal.classList.remove('active');
            document.body.style.overflow = '';
            showToast('Booking confirmed! See you soon ☕');
            loadBookedTables();
        });
    }

    // Load table status on page load
    loadBookedTables();

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('contactBtn');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = {
                sender_name: document.getElementById('contactName').value,
                sender_email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                showToast(data.message || 'Message sent! 💌');
                contactForm.reset();
            } catch (error) {
                showToast('Something went wrong. Please try again.');
            } finally {
                btn.textContent = 'Send Message';
                btn.disabled = false;
            }
        });
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ===== DIRECT ORDER FLOATING CART =====
let directCart = [];

window.addDirectToCart = function(itemId) {
    if (!window.fullMenu) return;
    const item = window.fullMenu.find(i => i.item_id === itemId);
    if (!item) return;

    const existing = directCart.find(c => c.item_id === itemId);
    if (existing) {
        existing.quantity++;
    } else {
        directCart.push({
            item_id: item.item_id,
            item_name: item.item_name,
            price: parseFloat(item.price),
            quantity: 1
        });
    }
    
    showToast(`${item.item_name} added to your order!`);
    updateDirectCartUI();
};

window.updateDirectCartQty = function(itemId, delta) {
    const item = directCart.find(c => c.item_id === itemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            directCart = directCart.filter(c => c.item_id !== itemId);
        }
    }
    updateDirectCartUI();
};

function updateDirectCartUI() {
    const badge = document.getElementById('floatingCartBadge');
    const floatBtn = document.getElementById('floatingCartBtn');
    
    const count = directCart.reduce((sum, i) => sum + i.quantity, 0);
    badge.textContent = count;
    
    // Show/hide floating button
    if (count > 0) {
        floatBtn.style.display = 'flex';
    } else {
        floatBtn.style.display = 'none';
        const modal = document.getElementById('directOrderModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
    
    renderDirectCartModal();
}

function renderDirectCartModal() {
    const container = document.getElementById('directCartItems');
    const totalEl = document.getElementById('directCartTotal');
    const submitBtn = document.getElementById('submitDirectOrderBtn');
    
    if (directCart.length === 0) {
        if(container) container.innerHTML = '<p class="cart-empty">No items yet. Add from the menu!</p>';
        if(totalEl) totalEl.textContent = '$0.00';
        if(submitBtn) submitBtn.disabled = true;
        return;
    }
    
    let total = 0;
    const html = directCart.map(i => {
        const lineTotal = i.price * i.quantity;
        total += lineTotal;
        return `
            <div class="cart-item">
                <span class="cart-item-name">${i.item_name}</span>
                <div class="cart-item-qty">
                    <button type="button" onclick="window.updateDirectCartQty(${i.item_id}, -1)">−</button>
                    <span>${i.quantity}</span>
                    <button type="button" onclick="window.updateDirectCartQty(${i.item_id}, 1)">+</button>
                </div>
                <span class="cart-item-price">$${lineTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');
    
    if(container) container.innerHTML = html;
    if(totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if(submitBtn) submitBtn.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const floatBtn = document.getElementById('floatingCartBtn');
    const directModal = document.getElementById('directOrderModal');
    const closeBtn = document.getElementById('closeDirectOrderModal');
    
    if (floatBtn) {
        floatBtn.addEventListener('click', () => {
            renderDirectCartModal();
            directModal.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            directModal.classList.remove('active');
        });
    }
    
    const directForm = document.getElementById('directOrderForm');
    if (directForm) {
        directForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitDirectOrderBtn');
            submitBtn.textContent = 'Placing Order...';
            submitBtn.disabled = true;
            
            const orderData = {
                customer_name: document.getElementById('doName').value,
                email: document.getElementById('doEmail').value,
                phone: document.getElementById('doPhone').value,
                table_id: null,
                items: directCart
            };
            
            try {
                const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                
                const data = await res.json();
                showToast(data.message || 'Order Placed Successfully!');
                
                // Reset cart
                directCart = [];
                updateDirectCartUI();
                directForm.reset();
                directModal.classList.remove('active');
            } catch (err) {
                showToast('Failed to place order. Please try again.');
            } finally {
                submitBtn.textContent = 'Place Order';
                submitBtn.disabled = false;
            }
        });
    }
});
