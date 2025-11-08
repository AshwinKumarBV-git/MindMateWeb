from fastapi import APIRouter
from services.supabase_client import get_supabase

router = APIRouter()

@router.get("/logs")
async def get_logs(user_id: str, limit: int = 50):
    supabase = get_supabase()
    result = supabase.table("emotion_events").select("*").eq("user_id", user_id).order("timestamp", desc=True).limit(limit).execute()
    return result.data

@router.post("/logs")
async def create_log(user_id: str, label: str, intensity: int, source: str = "manual"):
    supabase = get_supabase()
    data = {"user_id": user_id, "label": label, "intensity": intensity, "source": source}
    result = supabase.table("emotion_events").insert(data).execute()
    return result.data

@router.delete("/logs/{log_id}")
async def delete_log(log_id: str, user_id: str):
    supabase = get_supabase()
    supabase.table("emotion_events").delete().eq("id", log_id).eq("user_id", user_id).execute()
    return {"message": "Log deleted"}
