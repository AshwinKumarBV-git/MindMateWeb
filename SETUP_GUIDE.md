# MindMate - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18+ and npm
- **Python** 3.10+
- **Supabase Account** (free tier works)
- **Google Gemini API Key** (get from Google AI Studio)
- **Git** for version control

---

## 🚀 Quick Start

### 1. Clone and Setup Project Structure

```bash
cd c:/Users/maitr/Documents/Projekt/Mind
```

The project structure is already created with:
```
Mind/
├── frontend/          # Next.js 15 application
├── backend/           # FastAPI application
├── assets/            # Meditation audio & theme images (create manually)
└── README.md
```

---

## 🗄️ Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Name it "MindMate" and choose a strong database password
5. Wait for the project to be provisioned (~2 minutes)

### Step 2: Get Your Credentials

From your Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (for frontend)
   - **service_role** key (for backend - keep this secret!)

### Step 3: Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `backend/database/schema.sql`
4. Paste and click "Run"
5. Verify tables are created in **Table Editor**

### Step 4: Setup Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Create these buckets:
   - `meditation-audio` (public)
   - `feelhear-recordings` (private)
   - `profile-pictures` (public)

---

## 🔑 Get Gemini API Key

1. Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your Google Cloud project (or create one)
4. Copy the API key

---

## 💻 Backend Setup

### Step 1: Create Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

Create `.env` file in `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
GEMINI_API_KEY=your_gemini_api_key_here
ENCRYPTION_KEY=your_32_byte_base64_encryption_key_here
SECRET_KEY=your_jwt_secret_key_here
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

To generate encryption keys:

```python
# Run in Python
import secrets
import base64

# For ENCRYPTION_KEY (32 bytes)
print(base64.b64encode(secrets.token_bytes(32)).decode())

# For SECRET_KEY
print(secrets.token_urlsafe(32))
```

### Step 4: Start Backend Server

```bash
# Make sure you're in backend/ directory with venv activated
uvicorn main:app --reload --port 8000
```

Visit: [http://localhost:8000/docs](http://localhost:8000/docs) to see API documentation

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

Create `.env.local` file in `frontend/` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🎵 Add Meditation Audio Files

### Step 1: Organize Audio Files

Create this structure in your project:

```
assets/
└── meditation/
    ├── forest/
    │   ├── morning.mp3
    │   ├── afternoon.mp3
    │   ├── evening.mp3
    │   └── night.mp3
    ├── ocean/
    │   ├── morning.mp3
    │   ├── afternoon.mp3
    │   ├── evening.mp3
    │   └── night.mp3
    └── night/
        ├── evening.mp3
        └── night.mp3
```

### Step 2: Upload to Supabase Storage

Option A - Manual Upload:
1. Go to Supabase Dashboard → Storage
2. Select `meditation-audio` bucket
3. Upload files maintaining folder structure

Option B - Programmatic Upload:
```python
# Use Supabase Python client to bulk upload
from supabase import create_client

supabase = create_client(SUPABASE_URL, SERVICE_KEY)
# Upload files programmatically
```

### Step 3: Add Theme Images

Create `assets/themes/` with:
- Journal themes: `nature-forest.jpg`, `ocean.jpg`, `night.jpg`, etc.
- Meditation backgrounds: `forest-bg.jpg`, `ocean-bg.jpg`, etc.

---

## 🧪 Testing the Application

### Test Backend

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123",
    "user_type": "individual"
  }'
```

### Test Frontend

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Get Started"
3. Register a new account
4. Verify you can:
   - Login successfully
   - See the dashboard
   - Navigate to Mates page
   - Access therapy, meditation, etc.

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change all default keys and secrets
- [ ] Enable Row Level Security (RLS) on all Supabase tables
- [ ] Use environment variables (never commit secrets)
- [ ] Enable HTTPS only
- [ ] Set up proper CORS policies
- [ ] Add rate limiting to API endpoints
- [ ] Implement proper JWT validation
- [ ] Enable Supabase Auth email verification
- [ ] Set up logging and monitoring
- [ ] Add input validation and sanitization
- [ ] Configure CSP headers

---

## 🚢 Deployment

### Deploy Frontend (Vercel)

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables in Vercel dashboard
```

### Deploy Backend (Railway / Render)

**Option 1: Railway**

```bash
cd backend

# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Option 2: Render**

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new "Web Service"
4. Select `backend` directory
5. Add environment variables
6. Deploy

### Update Frontend API URL

After backend deployment, update frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

Redeploy frontend.

---

## 📊 Monitoring & Maintenance

### Supabase Dashboard

Monitor:
- Database usage
- API requests
- Storage usage
- Real-time connections

### Application Logs

**Backend logs:**
```bash
# View uvicorn logs
tail -f backend/logs/app.log
```

**Frontend logs:**
- Check Vercel dashboard for deployment logs
- Use browser console for client-side errors

---

## 🐛 Troubleshooting

### Common Issues

**1. "Module not found" errors in frontend**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**2. Supabase connection errors**
- Verify SUPABASE_URL format (must include https://)
- Check API keys are correct
- Ensure RLS policies allow operations

**3. CORS errors**
- Add frontend URL to ALLOWED_ORIGINS in backend .env
- Restart backend server

**4. Gemini API errors**
- Verify API key is active
- Check quota limits in Google Cloud Console
- Ensure billing is enabled (if required)

**5. Database migration issues**
- Re-run schema.sql
- Check for naming conflicts
- Verify foreign key relationships

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs
3. Consult documentation
4. Open an issue on GitHub (if applicable)

---

## 📝 Development Notes

### TypeScript Errors

The current implementation may show TypeScript lint errors because dependencies aren't installed yet. These will resolve after running `npm install` in the frontend directory.

### TODO Items in Code

Search for `TODO:` comments in the codebase to find areas that need:
- Real API integrations (marked with mock data)
- JWT token extraction from cookies
- File upload implementations
- Additional error handling

### Extending the Application

To add new features:
1. Create new route in `backend/routers/`
2. Add corresponding API calls in `frontend/lib/api.ts`
3. Create UI pages in `frontend/app/`
4. Update database schema if needed

---

## ✅ Final Checklist

Before considering the app "production-ready":

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Storage buckets created
- [ ] Audio files uploaded
- [ ] Frontend and backend running
- [ ] Registration/login working
- [ ] All main pages accessible
- [ ] API endpoints responding
- [ ] Security measures implemented
- [ ] SSL certificates configured (production)
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

**Congratulations! Your MindMate platform is ready to help users on their mental wellness journey. 🎉**
