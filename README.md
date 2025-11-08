# MindMate - Mental Wellness Platform

A production-ready, accessible, responsive mental wellness platform built with Next.js, FastAPI, Supabase, and Gemini AI.

## 🎨 Brand & Theme

- **Brand**: MindMate
- **Primary Color**: Soft Lavender (#CABDFF)
- **Secondary Accents**: Soft Yellow (#F8E27C), Teal Mist (#A7E8E0), Blush (#FBD0D9)
- **Light Mode**: White surfaces + Lavender accents
- **Dark Mode**: Deep Purple (#1E1A2B) + Near-Black (#0F0E14)

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Audio**: Wavesurfer.js
- **Icons**: Lucide React
- **Theme**: Next Themes

### Backend
- **Framework**: FastAPI
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email/Password + Google OAuth)
- **Storage**: Supabase Storage
- **AI**: Google Gemini API

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- Supabase Account
- Gemini API Key

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Add your environment variables
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your environment variables
uvicorn main:app --reload --port 8000
```

## 🔑 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
ENCRYPTION_KEY=your_32_byte_encryption_key
SECRET_KEY=your_jwt_secret_key
```

## 🗄️ Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# See backend/database/schema.sql
```

## 📁 Project Structure

```
Mind/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities and helpers
│   └── public/           # Static assets
├── backend/              # FastAPI application
│   ├── routers/          # API route handlers
│   ├── services/         # Business logic
│   ├── models/           # Pydantic schemas
│   └── database/         # Supabase client
└── assets/               # Meditation audio & theme images
```

## 🎯 Features

### Core Features
- 🏠 Dashboard with emotion tracking & mood analytics
- 👤 User profiles with location support
- 🧑‍⚕️ Virtual Therapy Sessions
- 🧘‍♀️ Meditation Zone with time-aware audio
- 📔 Encrypted Digital Journal
- 🎧 FeelHear (Voice emotional analysis)
- 💬 FeelFlow (Text therapy chat)
- 🧠 Brain Gym (Cognitive games)
- 🌍 Global Emotional Symphony

### Side Features
- 📚 Content Library
- 📱 Digital Wellness Monitor
- 🌿 Personalized Wellness Plan

## 🔒 Security

- AES-256 encryption for journal entries and therapy sessions
- Argon2 password hashing (handled by Supabase)
- JWT session tokens (httpOnly cookies)
- Row-Level Security in Supabase
- CORS protection
- Rate limiting
- CSRF protection

## ♿ Accessibility

- WCAG 2.1 AA+ compliance
- Keyboard navigation
- ARIA labels and roles
- Focus visible indicators
- Color contrast ratios

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI elements

## 🎵 Assets

### Meditation Audio
Place audio files in `/assets/meditation/`:
- `/forest/morning.mp3`, `/forest/afternoon.mp3`, etc.
- `/ocean/morning.mp3`, `/ocean/afternoon.mp3`, etc.
- `/night/evening.mp3`, `/night/night.mp3`, etc.

### Theme Images
Place images in `/assets/themes/`:
- `/journal/nature-forest.jpg`, `/journal/ocean.jpg`, etc.
- `/meditation/forest-bg.jpg`, `/meditation/ocean-bg.jpg`, etc.

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway/Render)
```bash
cd backend
# Follow platform-specific deployment guides
```

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
pytest
```

## 📝 License

MIT License

## 👥 Support

For support, email support@mindmate.app
