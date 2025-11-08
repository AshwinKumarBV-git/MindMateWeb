from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.post("/contribute")
async def contribute(user_id: str, emotion_label: str, short_text: str = None, color_code: str = None):
    supabase = get_supabase()
    data = {"user_id": user_id, "emotion_label": emotion_label, "short_text": short_text, "color_code": color_code}
    result = supabase.table("symphony_posts").insert(data).execute()
    return result.data

@router.get("/aggregate")
async def get_aggregate(timeframe: str = "today"):
    supabase = get_supabase()
    # TODO: Add time filtering based on timeframe
    result = supabase.table("symphony_posts").select("emotion_label, color_code").order("timestamp", desc=True).limit(100).execute()
    
    # Aggregate emotions
    emotions = {}
    for post in result.data:
        label = post["emotion_label"]
        emotions[label] = emotions.get(label, 0) + 1
    
    return {"emotions": emotions, "total": len(result.data), "posts": result.data[:20]}
