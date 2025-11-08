from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.post("/session")
async def start_session(user_id: str, mode: str):
    supabase = get_supabase()
    data = {"user_id": user_id, "mode": mode}
    result = supabase.table("therapy_sessions").insert(data).execute()
    return result.data

@router.post("/message")
async def send_message(session_id: str, message: str):
    # TODO: Store message, get Gemini response, store response
    return {"response": "I hear you. Can you tell me more about that?"}

@router.get("/history")
async def get_history(user_id: str):
    supabase = get_supabase()
    result = supabase.table("therapy_sessions").select("*").eq("user_id", user_id).order("started_at", desc=True).execute()
    return result.data
