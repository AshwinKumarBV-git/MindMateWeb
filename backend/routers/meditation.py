from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.get("/sessions")
async def get_sessions(user_id: str):
    supabase = get_supabase()
    result = supabase.table("meditation_sessions").select("*").eq("user_id", user_id).order("timestamp", desc=True).execute()
    return result.data

@router.post("/sessions")
async def create_session(user_id: str, theme: str, duration_minutes: int, voice_type: str, time_of_day: str):
    supabase = get_supabase()
    data = {"user_id": user_id, "theme": theme, "duration_minutes": duration_minutes, "voice_type": voice_type, "time_of_day": time_of_day}
    result = supabase.table("meditation_sessions").insert(data).execute()
    return result.data
