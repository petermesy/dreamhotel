# Dream Pension — Sawla, Ethiopia

**"Where Comfort Meets Distinction — Your Home Away from Home in the Heart of Sawla"**

Welcome to **Dream Pension**, a pristine boutique guest house located in Gofa, Sawla, Ethiopia. Designed to cater directly to premium business travelers, regional conference delegates, and tourists, this application is a custom, full-stack, enterprise-grade guest registration, room scheduling, and reservation management system.

The application combines a high-fidelity, responsive frontend with a durable server ledger to facilitate immediate offline bookings, self-service guest management, and comprehensive back-office operations for staff and owners.

---

## 🌟 Key Product Features

### 1. **Live Guest Registry & Scheduling Engine**
*   **Standardized 7-Field Intake**: Simple, clean, and compliant guest intake form adhering to hospitality standard registration policies.
*   **Real-time Capacity Checking**: Automated backend availability lookups on live database logs based on selected room classifications and stay dates to eliminate double-booking.
*   **Flexible Dates**: Dynamic stay calculation with automated checkout date-gating relative to check-in calendars.

### 2. **Interactive Sawla Highland Discovery Board**
*   **Live Climate & Time Tracker**: Real-time East Africa Time clock synced with standard local GMT+3 time zones paired with continuous weather conditions for the high-altitude Sawla Highlands.
*   **Excursion Explorer**: Dynamic guided tour itineraries spotlighting regional treasures such as Mount Gughe Ridge treks, local Gofa organic coffee farms, and traditional Dorze craft weaving villages.
*   **Altitude & Stay Advisories**: Built-in travel advisories highlighting altitude parameters, local cellular network indicators, and regional trade cash guidelines.

### 3. **Bespoke Guest & Back-Office Dashboards (Unified Account Access)**
*   **Interactive Guest Space**: Guests can register or log in to view active reservation codes, request rescheduling, or cancel bookings instantly before checking in.
*   **Verification Upload**: Copy and paste the text/SMS receipts from CBE bank transfers or Telebirr transactions for seamless, hands-free validation.
*   **Back-Office Staff Console**: High-density reservation grid featuring automated status flows (Booked ➔ Checked In ➔ Checked Out), quick searches, and filter capabilities.
*   **Conference Hall Enquiries Tracker**: Unified grid management panel for viewing and updating corporate conference requests, attendance capacity bounds, and catering flags.

### 4. **Owner-Exclusive Control Center (Super-Admin privileges)**
*   **Live Revenue Metrics**: Visual performance cards mapping Cumulative Cash Revenues, Unpaid/Pending Collections, occupancy benchmarks, and inventory levels.
*   **Monthly Operations Reports**: Comprehensive monthly stays and income breakdowns with custom CSV reporting sheet exports.
*   **Immutable Payment Audit Trails**: Absolute transparency featuring live audit lines logging when and which staff members altered room pricing or payment states.
*   **Staff Provisioning Roster**: Direct administrative CRUD controls to add, activate, suspend, or permanently remove front-desk reception personnel.
*   **Dynamic Tariffs & Room Maintenance**: Complete flexibility to edit flat pricing rates, update bed configurations, or toggle individual rooms to "Under Maintenance" to immediately block them from the booking pool.

---

## 🎨 Visual Identity & Architecture

The application is crafted using **Tailwind CSS** following a modern, high-contrast, professional design philosophy:
*   **Design Slate Mood**: Premium dark borders, structured off-white cards, custom indigo highlighting, and crisp typography utilizing **Inter** for standard layout actions and **JetBrains Mono** for alphanumeric reference logs.
*   **Aesthetic Rhythm**: Micro-animations and subtle fade-in entrances configured via **motion** to facilitate responsive navigation.
*   **Full Responsive Density**: Seamless transitions from widescreen multi-column administrative views on desktop to single-stack touch targets exceeding 44px on mobile phones.

---

## 🛠️ Technology Stack & Architecture

*   **Frontend**: React 18+ powered by **Vite** with global state orchestration handled via **Redux Toolkit** (`@reduxjs/toolkit`).
*   **Icons**: Rendered purely through **Lucide React** (`lucide-react`) for maximum visual consistency.
*   **Backend Server**: Full-stack integration utilizing a resilient **Express** engine with standard JSON body parsers, CORS handlers, and API-route encapsulation to guarantee security.
*   **Database Schema**: Standard relational structure managing `users`, `rooms`, `room_types`, `bookings`, `enquiries`, `audit_logs`, and `monthly_reports`.
*   **Production Build Pipeline**: Bundle compiling server-side operations into a high-performance CommonJS target (`dist/server.cjs`) using **esbuild** to ensure maximum cold-start speeds.

---

## 🚀 Getting Started Locally

### Prerequisites
*   **Node.js** (v18 or higher)
*   **npm**

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env` and configure your local parameters.
   ```bash
   cp .env.example .env
   ```

3. Initialize the development database schema and seed data (Prisma/Relational):
   ```bash
   npm run db:setup # Configures local test schemas
   ```

4. Launch the application in dev mode:
   ```bash
   npm run dev
   ```
   The application dev server will spin up on **port 3000** at `http://localhost:3000`.

---

## 🔒 Default Test Accounts (Pre-Seeded Logs)

For rapid evaluations of the Back-Office console, the local database initializes with the following default authorized accounts:

*   **Owner / Super-Admin**:
    *   **Email**: `owner`
    *   **Password**: `owner123`
*   **Reception / Staff Member**:
    *   **Email**: `reception`
    *   **Password**: `staff123`
# dreamhotel
