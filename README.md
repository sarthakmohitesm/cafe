<div align="center">

```
 ██████╗ █████╗ ███████╗███████╗     █████╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ 
██╔════╝██╔══██╗██╔════╝██╔════╝    ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗
██║     ███████║█████╗  █████╗      ███████║██████╔╝██║   ██║██╔████╔██║███████║
██║     ██╔══██║██╔══╝  ██╔══╝      ██╔══██║██╔══██╗██║   ██║██║╚██╔╝██║██╔══██║
╚██████╗██║  ██║██║     ███████╗    ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
```

### ◈ CYBER-ARTISAN PROTOCOL · V1.2 ◈

![Status](https://img.shields.io/badge/STATUS-ONLINE-00ff88?style=for-the-badge&labelColor=0a0a0d&logo=statuspage&logoColor=00ff88)
![Version](https://img.shields.io/badge/VERSION-1.2-00f3ff?style=for-the-badge&labelColor=0a0a0d)
![Node](https://img.shields.io/badge/NODE.JS-18+-339933?style=for-the-badge&labelColor=0a0a0d&logo=node.js&logoColor=339933)
![MySQL](https://img.shields.io/badge/MYSQL-8.0-ff0055?style=for-the-badge&labelColor=0a0a0d&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/LICENSE-MIT-ffd700?style=for-the-badge&labelColor=0a0a0d)

> *A high-performance Operating Environment for artisan coffee.*
> *Cyberpunk-grade interface. Real-time reactive. Built for operators who don't compromise.*

</div>

---

## ⚡ SYSTEM OVERVIEW

**CAFÉ AROMA** is not just a website — it's a full-stack **café management system** built with a **Cyberpunk Gaming Aesthetic**. It features a real-time reactive interface split into two operational modules: a customer-facing HUD and an operator command dashboard.

---

## 🕹️ CUSTOMER HUD `[ FRONT-END MODULE ]`

| Feature | Description |
|---|---|
| **⚡ NEON MENU** | Rapid filtering with zero-latency category switching |
| **🛒 CYBER-CART** | Floating, state-of-the-art order relay system |
| **📍 TACTICAL BOOKING** | Visual table selection integrated with the ordering pipeline |

---

## 🛡️ OPERATOR COMMAND `[ ADMIN MODULE ]`

| Feature | Description |
|---|---|
| **🖥️ HUD OVERLAY** | Full-screen admin interface with Scanline Effects & CRT Flicker |
| **🗺️ LIVE FLOOR GRID** | Real-time spatial map of the arena with live table states |
| **📊 DATA RELAY** | Live telemetry for Revenue, Orders & Terminal status |

### 🔴 TABLE STATE LEGEND

```
  ● HOSTILE / BOOKED   →   Pulse: Laser Red   [ #FF0055 ]
  ● IDLE / AVAILABLE   →   Glow:  Neon Cyan   [ #00F3FF ]
```

---

## 🛠️ TECH STACK `[ CORE HARDWARE & SOFTWARE ]`

```
┌─────────────────────────────────────────────────────────┐
│                      TECH MATRIX                        │
├──────────────────┬──────────────────────────────────────┤
│  CORE ENGINE     │  Node.js  [ v18+ ]                  │
│  DATA STORAGE    │  MySQL    [ Protocol 8.0 ]           │
│  INTERFACE       │  Vanilla CSS3  [ Neon Design System ]│
│  LOGIC LAYER     │  ES6+ JavaScript  [ Async Flow ]     │
└──────────────────┴──────────────────────────────────────┘
```

---

## 🔄 SYSTEM TELEMETRY `[ DATA FLOW ]`

```
  [ CUSTOMER ] ──[ INTERACT ]──▶ [ CAFÉ UI PORTAL ]
                                       │
                    ┌──────────────────┤
                    │                  │
             [ DIRECT ORDER ]   [ TACTICAL BOOKING ]
                    │                  │
                    ▼                  ▼
              [ NEON CART ]    [ FLOOR MAP ]
                    │                  │
                    └────────┬─────────┘
                             │
                             ▼
                      [ MYSQL CORE ] ◀── Primary Data Store
                             │
                     ──[ SYNC 60Hz ]──
                             │
                             ▼
                       [ ADMIN HUD ] ──[ RENDER ]──▶ [ MAP GRAPH ]
```

---

## 🚀 DEPLOY PROTOCOL `[ BOOT SEQUENCE ]`

```bash
# ── ACTIVATE ENVIRONMENT ─────────────────────────────────────
git clone https://github.com/sarthakmohitesm/cafe.git
cd cafe

# ── INSTALL MODULES ──────────────────────────────────────────
npm install

# ── INITIAL BOOT ─────────────────────────────────────────────
npm start
```

> 💡 Make sure **Node.js v18+** and **MySQL 8.0** are installed and running before boot.

---

## 📁 PROJECT STRUCTURE

```
cafe/
├── public/
│   ├── index.html          # Customer HUD (Front-End)
│   ├── admin.html          # Operator Command Dashboard
│   └── style.css           # Neon Design System
├── server.js               # Core Engine (Node.js)
├── db.js                   # MySQL Data Bridge
├── routes/
│   ├── menu.js             # Menu API Routes
│   ├── orders.js           # Order Relay Routes
│   ├── reservations.js     # Booking Protocol Routes
│   └── admin.js            # Admin Command Routes
└── package.json
```

---

## 🔌 API ENDPOINTS `[ DATA RELAY PROTOCOL ]`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | Fetch full menu grid |
| `POST` | `/api/orders` | Commit new order to DB |
| `POST` | `/api/reservations` | Initiate table booking |
| `GET` | `/api/admin/stats` | Pull live telemetry |
| `GET` | `/api/admin/orders` | Fetch all orders |
| `PUT` | `/api/admin/orders/:id/status` | Update order state |
| `GET` | `/api/admin/reservations` | Fetch all reservations |
| `PUT` | `/api/admin/reservations/:id/status` | Update reservation state |
| `POST` | `/api/admin/login` | Operator authentication |

---

## ⚙️ ENVIRONMENT CONFIG

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cafe_aroma
PORT=3000
JWT_SECRET=your_jwt_secret
```

---

<div align="center">

```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█░░░░░░░░[ ACCESS GRANTED ]░░░░░░░░█
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

**Developed by the Antigravity AI Sub-Protocol**

*CAFÉ AROMA · CYBER-ARTISAN PROTOCOL · V1.2 · ALL SYSTEMS NOMINAL*

</div>