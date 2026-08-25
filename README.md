# SalonVerse 💎

A premium beauty, salon, and wellness booking platform frontend. Designed for luxury salons, beauty studios, and wellness businesses.

## Features Implemented
- **Premium Editorial UI**: High-end luxury aesthetics with deep espresso, champagne, and cream color palette.
- **Service Discovery**: Browse, search, and filter 25+ services with detailed descriptions and pricing.
- **Stylist Profiles**: Explore expert stylists, their ratings, experience, and portfolios.
- **Lookbook Gallery**: Masonry-style gallery for beauty inspiration and trends.
- **Packages & Memberships**: Explore curated value packages and premium membership tiers.
- **User Authentication (Demo)**: Simulated login for Customer and Admin roles.
- **Customer Dashboard**: Overview of appointments, favorites, and membership status.
- **Admin Dashboard**: Overview of business analytics, appointments, services, and customers.
- **Global Search & Filters**: Robust searching across services and looks.
- **Dark Mode**: Fully functional dark and light themes with state persistence.
- **Responsive Design**: Mobile-first architecture supporting all screen sizes.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context + LocalStorage
- **Data**: Simulated mock data

## Directory Structure
\`\`\`text
src/
├── components/
│   ├── common/       # Reusable UI components (Button, Input, Cards)
│   ├── layout/       # Navbar, Footer
│   ├── booking/      # Booking flow components (planned)
├── context/          # AppContext for global state
├── data/             # Mock data (Services, Stylists, Memberships, etc.)
├── pages/            # Main application pages
│   ├── admin/        # Admin dashboard pages
│   ├── customer/     # Customer dashboard pages
├── App.jsx           # App entry and Routing
├── index.css         # Global CSS and Tailwind setup
\`\`\`

## Installation & Setup

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Production Build**
   \`\`\`bash
   npm run build
   \`\`\`

## Demo Credentials
Since this is a frontend-only application, authentication is simulated.
Click the **Login** button in the navbar to choose between a Demo Customer or Demo Admin account.

## Future Enhancements
- Integration with a real backend (Node.js/Express or Firebase).
- Payment gateway integration (Stripe/Razorpay) for real memberships.
- Live appointment scheduling with conflicting time-slot prevention.
