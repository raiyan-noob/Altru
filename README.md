# Altru — Community-Driven Social Development Events Platform

Altru is a modern, responsive web application empowering citizens, youth clubs, and humanitarian organizers across Bangladesh to coordinate, discover, and join impactful local social service events. From emergency winter clothes and blanket distributions in Mirpur and Mohammadpur to urban tree plantations and free health camps, Altru makes civic engagement accessible and transparent.

- **Live Site URL:** https://altru-community.vercel.app (or local `http://localhost:3000`)
- **Backend API URL:** https://altru-server.onrender.com (or local `http://localhost:5000`)

---

## 🌟 5 Key Highlights & Core Features

- **Grassroots Social Event Discovery:** Explore upcoming local community drives categorized by type (Winter Clothes Donation, Blanket Drives, Lake Cleanups, Urban Tree Plantations, Food Relief, and Free Medical Camps).
- **One-Click Volunteer RSVP Tracking:** Seamlessly join community events with duplicate-prevention, real-time volunteer rosters, and a dedicated personal Joined Events dashboard sorted chronologically.
- **Organizer Workspace & Strict Creator Management:** Logged-in changemakers can create upcoming community events with future date validation, manage their hosted events, edit event details, or delete drives with verified ownership protection.
- **Stateless JWT Authentication & Session Safety:** Robust authentication supporting email/password with strict complexity validation (uppercase, lowercase, 6+ characters) and Google one-click sign-in. Reloading any private route never prematurely redirects authenticated users.
- **Full Theme Customization & Accessibility:** Instant light and dark mode toggling with persistent preferences, responsive mobile drawer navigation, comprehensive loading skeletons, and accessible alerts powered by SweetAlert2 and React-Toastify without default alert popups.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, JavaScript)
- **Styling & UI:** Tailwind CSS, DaisyUI
- **Icons & Visuals:** React Icons, Unsplash Curated Photography
- **State & Context:** React Context API (`AuthContext`, `ThemeContext`)
- **Feedback & Modals:** `sweetalert2`, `react-toastify`

---

## 🧭 Page Routes Overview

| Route | Type | Description |
|---|---|---|
| `/` | Public | Interactive Hero banner, feature highlights, 6 recent upcoming events from DB, impact story, static photo gallery, testimonials, and newsletter |
| `/events` | Public | Complete directory of upcoming future events with search, category filters, and soonest-first sorting |
| `/events/[id]` | Public | Full event details, location map info, volunteer guidelines, attendee roster, and functional Join Event button |
| `/create-event` | Private | Event creation form with strict future-date validation and automatic organizer attribution |
| `/manage-events` | Private | Organizer dashboard to review, update, or delete your own created events with confirmation modals |
| `/joined-events` | Private | Personal volunteer schedule showing all joined events sorted by event date with cancel RSVP option |
| `/profile` | Private | Volunteer profile view with hosted/joined impact statistics and profile photo/name update feature |
| `/login` | Public | Email/password login with demo credential quick-fill and Google one-click sign-in |
| `/register` | Public | Volunteer registration with strict password complexity validator |

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- Running Altru server (`http://localhost:5000`)

### 2. Installation
```bash
cd client
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Altru
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📜 License
This project is open-source under the MIT License.

