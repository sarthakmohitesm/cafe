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
                        <button class="add-to-order-btn" title="Add to order" onclick="showToast('${item.item_name} added to your order!')">+</button>
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

    // ===== FETCH AND RENDER FEATURED / SPECIALS =====
    async function loadSpecials() {
        try {
            const res = await fetch('/api/menu/featured');
            const featured = await res.json();
            renderSpecials(featured);
        } catch (error) {
            console.error('Error loading specials:', error);
        }
    }

    function renderSpecials(items) {
        const carousel = document.getElementById('specialsCarousel');
        carousel.innerHTML = '';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('special-card');
            card.style.animationDelay = `${index * 0.12}s`;

            card.innerHTML = `
                <div class="special-card-image">
                    <img src="${item.image_url || '/images/cappuccino.png'}" alt="${item.item_name}" loading="lazy">
                </div>
                <div class="special-card-body">
                    <h3 class="special-card-name">${item.item_name}</h3>
                    <p class="special-card-desc">${item.description}</p>
                    <span class="special-card-price">$${parseFloat(item.price).toFixed(2)}</span>
                </div>
            `;

            carousel.appendChild(card);
        });
    }

    loadSpecials();

    // ===== FETCH AND RENDER REVIEWS =====
    let currentReview = 0;
    let reviewsData = [];

    async function loadReviews() {
        try {
            const res = await fetch('/api/reviews');
            reviewsData = await res.json();
            renderReviews(reviewsData);
            startReviewAutoSlide();
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }

    function renderReviews(reviews) {
        const slider = document.getElementById('reviewsSlider');
        const dots = document.getElementById('reviewsDots');
        slider.innerHTML = '';
        dots.innerHTML = '';

        reviews.forEach((review, index) => {
            // Create review card
            const card = document.createElement('div');
            card.classList.add('review-card');

            const stars = Array.from({ length: 5 }, (_, i) =>
                `<span class="review-star ${i < review.rating ? '' : 'empty'}">${i < review.rating ? '★' : '☆'}</span>`
            ).join('');

            const dateStr = review.created_at ? new Date(review.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

            card.innerHTML = `
                <div class="review-stars">${stars}</div>
                <p class="review-text">"${review.review_text}"</p>
                <p class="review-author">${review.customer_name}</p>
                <p class="review-date">${dateStr}</p>
            `;

            slider.appendChild(card);

            // Create dot
            const dot = document.createElement('button');
            dot.classList.add('review-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToReview(index));
            dots.appendChild(dot);
        });
    }

    function goToReview(index) {
        currentReview = index;
        const slider = document.getElementById('reviewsSlider');
        slider.style.transform = `translateX(-${index * 100}%)`;

        document.querySelectorAll('.review-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function startReviewAutoSlide() {
        setInterval(() => {
            currentReview = (currentReview + 1) % reviewsData.length;
            goToReview(currentReview);
        }, 5000);
    }

    loadReviews();

    // ===== RESERVATION FORM =====
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        // Set min date to today
        const dateInput = document.getElementById('resDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('reserveBtn');
            btn.textContent = 'Booking...';
            btn.disabled = true;

            const formData = {
                customer_name: document.getElementById('resName').value,
                email: document.getElementById('resEmail').value,
                phone: document.getElementById('resPhone').value,
                party_size: document.getElementById('resGuests').value,
                reservation_date: document.getElementById('resDate').value,
                reservation_time: document.getElementById('resTime').value,
                special_requests: document.getElementById('resNotes').value
            };

            try {
                const res = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                showToast(data.message || 'Reservation confirmed! 🎉');
                reservationForm.reset();
            } catch (error) {
                showToast('Something went wrong. Please try again.');
            } finally {
                btn.textContent = 'Reserve Now';
                btn.disabled = false;
            }
        });
    }

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
