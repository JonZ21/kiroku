# 記録 (Kiroku) - Super Smash Bros. Match Tracker

> **記録** (kiroku) means "record" in Japanese - a comprehensive real-time match tracking and analytics platform for Super Smash Bros.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎮 Overview

Kiroku is a full-stack web application that provides real-time Super Smash Bros. match tracking with automated data collection. The system combines computer vision-based match detection with a modern web interface to deliver comprehensive analytics and match history.

### 🔗 Related Projects
- **[Shobu](https://github.com/JonZ21/shobu)** - Raspberry Pi-based automated match detection system that feeds data to Kiroku

## ✨ Features

### 📊 Real-Time Analytics
- **Character Win Rates** - Comprehensive statistics for each fighter with minimum match thresholds
- **Match History** - Paginated view of all recorded matches with detailed results
- **Live Updates** - Real-time data synchronization using Supabase subscriptions
- **Performance Metrics** - Win/loss records, match frequency, and trend analysis

### 🎯 User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Fast Navigation** - Client-side routing with Next.js App Router
- **Interactive Tables** - Sortable columns and pagination controls

### ⚡ Technical Features
- **Real-time Subscriptions** - WebSocket-like updates via Supabase
- **Type Safety** - Full TypeScript integration with database schema
- **Performance Optimized** - Static generation and incremental rendering
- **Modular Architecture** - Component-based design with custom hooks

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raspberry Pi  │    │   Supabase DB   │    │   Next.js Web   │
│   (Shobu CV)    │───▶│   PostgreSQL    │◄───│   Interface     │
│                 │    │                 │    │   (Kiroku)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      ▲                          │                       │
      │                          ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Smash Bros Game │    │  Real-time API  │    │   User Browser  │
│  Screen Capture │    │  WebSocket Sub  │    │  React Client   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **[Shobu](https://github.com/JonZ21/shobu)** captures game screenshots on Raspberry Pi
2. Computer vision processes images to extract match results
3. Match data is uploaded to Supabase PostgreSQL database
4. Kiroku web interface receives real-time updates via subscriptions
5. Users see live match data without manual refreshes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kiroku.git
   cd kiroku
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   ```sql
   -- Create the results table
   CREATE TABLE results (
     id SERIAL PRIMARY KEY,
     p1_name TEXT NOT NULL,
     p1_character TEXT,
     p2_name TEXT,
     p2_character TEXT,
     winner TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable real-time subscriptions
   ALTER PUBLICATION supabase_realtime ADD TABLE results;
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.1** - React framework with App Router
- **React 19.1.0** - UI library with latest concurrent features
- **TypeScript 5.x** - Static type checking
- **Tailwind CSS 4.x** - Utility-first CSS framework

### Backend & Database
- **Supabase** - Backend-as-a-Service with real-time PostgreSQL
- **PostgreSQL** - Primary database for match storage
- **Real-time Subscriptions** - WebSocket-like updates

### Development Tools
- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
kiroku/
├── app/
│   ├── components/
│   │   ├── layout/          # Header, Footer components
│   │   ├── pages/           # Page-specific components
│   │   │   ├── AllMatches.tsx
│   │   │   ├── Homepage.tsx
│   │   │   └── Stats.tsx
│   │   └── ui/              # Reusable UI components
│   │       ├── CharacterIcon.tsx
│   │       ├── RecentMatches.tsx
│   │       ├── Table.tsx
│   │       └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useRealtimeSubscription.ts  # Custom real-time hook
│   ├── lib/
│   │   ├── supabase.ts      # Database client
│   │   └── ThemeContext.tsx # Theme management
│   ├── types/
│   │   ├── database.ts      # Database type definitions
│   │   └── index.ts         # Component interfaces
│   ├── matches/
│   │   └── page.tsx         # All matches page
│   ├── stats/
│   │   └── page.tsx         # Statistics page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

## 🔧 Key Components

### Real-time Data Hook
```typescript
// app/hooks/useRealtimeSubscription.ts
export function useRealtimeSubscription({
  table,
  callback,
  enabled = true
}: UseRealtimeSubscriptionOptions) {
  // Manages Supabase real-time subscriptions
}
```

### Statistics Dashboard
- Character win rates with visual progress bars
- Minimum match thresholds for statistical relevance
- Real-time updates when new matches are recorded

### Match History
- Paginated table with 20 matches per page
- Smart pagination with overflow handling
- Real-time updates maintain current page position

## 🎮 Usage

### Viewing Match Statistics
1. Navigate to `/stats` or click "View Stats" from homepage
2. See character win rates with color-coded performance
3. Data updates automatically as new matches are recorded

### Browsing Match History
1. Click "View All Matches" from the homepage
2. Navigate through paginated match results
3. View detailed match information including characters used

### Automated Match Recording
Set up the [Shobu](https://github.com/JonZ21/shobu) system to automatically detect and record matches:
1. Install Shobu on a Raspberry Pi
2. Configure screen capture of your gaming setup
3. Matches appear automatically in Kiroku interface

## 🔮 Future Enhancements

- [ ] **MCP Integration** - Model Context Protocol server for AI-powered match analysis
- [ ] **Tournament Brackets** - Tournament organization and bracket management
- [ ] **Player Profiles** - Individual player statistics and match history
- [ ] **Matchup Analysis** - Character vs character performance metrics
- [ ] **Export Features** - CSV/JSON export of match data
- [ ] **Advanced Filtering** - Date ranges, character filters, player searches

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for providing excellent real-time database capabilities
- **Next.js** team for the outstanding React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Super Smash Bros.** community for inspiration

---

<div align="center">
  <strong>Built with ❤️ for the Smash community</strong>
</div>
