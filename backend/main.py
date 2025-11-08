from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from dotenv import load_dotenv
import os

from routers import auth, users, journal, emotion, therapy, feelhear, meditation
from routers import content, wellness, braingym, symphony, gemini_routes

load_dotenv()

app = FastAPI(
    title="MindMate API",
    description="Mental wellness platform API with Supabase and Gemini AI",
    version="1.0.0"
)

# CORS middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(journal.router, prefix="/api/journal", tags=["Journal"])
app.include_router(emotion.router, prefix="/api/emotion", tags=["Emotions"])
app.include_router(therapy.router, prefix="/api/therapy", tags=["Therapy"])
app.include_router(feelhear.router, prefix="/api/feelhear", tags=["FeelHear"])
app.include_router(meditation.router, prefix="/api/meditation", tags=["Meditation"])
app.include_router(content.router, prefix="/api/content", tags=["Content Library"])
app.include_router(wellness.router, prefix="/api/digital-wellness", tags=["Digital Wellness"])
app.include_router(braingym.router, prefix="/api/braingym", tags=["Brain Gym"])
app.include_router(symphony.router, prefix="/api/symphony", tags=["Symphony"])
app.include_router(gemini_routes.router, prefix="/api/gemini", tags=["Gemini AI"])

@app.get("/")
async def root():
    return {
        "message": "MindMate API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
