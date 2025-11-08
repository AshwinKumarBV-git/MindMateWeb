from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.get("/metrics")
async def get_metrics(user_id: str, days: int = 7):
    supabase = get_supabase()
    result = supabase.table("digital_wellness").select("*").eq("user_id", user_id).order("date", desc=True).limit(days).execute()
    return result.data

@router.post("/metrics")
async def submit_metrics(user_id: str, daily_screen_minutes: int, app_usage_json: dict):
    supabase = get_supabase()
    data = {"user_id": user_id, "daily_screen_minutes": daily_screen_minutes, "app_usage_json": app_usage_json, "date": "CURRENT_DATE"}
    result = supabase.table("digital_wellness").insert(data).execute()
    return result.data
