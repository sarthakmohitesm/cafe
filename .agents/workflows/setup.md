---
description: How to Properly Set Up and Deploy the Café Aroma Project
---

### ☕ Café Aroma Setup Workflow

Follow these steps to ensure a flawless deployment of the artisan coffee ecosystem.

#### 1. Repository Preparation
- Ensure the project contains `README.md` and `.gitignore` at the root.
- Initialize git if not already done: `git init`.

#### 2. Database Synchronization
Run the following commands in order to set up your MySQL environment.
// turbo
1. `mysql -u root -p < database_queries.txt` (Ensure the database `cafe_db` is selected).

#### 3. Service Installation
Install the required Node.js libraries to ensure the backend and admin security work correctly.
// turbo
1. `npm install`

#### 4. Launch Application
// turbo
1. `npm start`
- Access the customer portal: `http://localhost:3000`
- Access the admin portal: `http://localhost:3000/admin.html`

#### 5. Dashboard Verification
Log in to the dashboard using the default credentials:
- **Username:** `admin`
- **Password:** `admin123`
- Verify the **Live Floor Plan** is loading the T1-T12 tables correctly.
- Verify that **Today's Reservations** highlighted tables turn **Red** on the map with their booking times.

---
**Workflow Provided by Antigravity AI.**
