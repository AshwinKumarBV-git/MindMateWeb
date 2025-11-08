from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.get("/games")
async def get_games():
    return {"games": ["memory_match", "recall", "pattern", "reaction"]}

@router.post("/score")
async def submit_score(user_id: str, game_type: str, score: int):
    supabase = get_supabase()
    data = {"user_id": user_id, "game_type": game_type, "score": score}
    result = supabase.table("braingym_scores").insert(data).execute()
    return result.data

@router.get("/score")
async def get_scores(user_id: str):
    supabase = get_supabase()
    result = supabase.table("braingym_scores").select("*").eq("user_id", user_id).order("timestamp", desc=True).execute()
    return result.data
