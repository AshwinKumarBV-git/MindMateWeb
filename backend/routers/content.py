from fastapi import APIRouter
from services.supabase_client import get_supabase
router = APIRouter()

@router.get("/items")
async def get_items(category: str = None, type: str = None):
    supabase = get_supabase()
    query = supabase.table("content_items").select("*")
    if category:
        query = query.eq("category", category)
    if type:
        query = query.eq("type", type)
    result = query.execute()
    return result.data

@router.post("/progress")
async def track_progress(user_id: str, content_id: str, action: str):
    supabase = get_supabase()
    if action == "opened":
        data = {"user_id": user_id, "content_id": content_id}
        result = supabase.table("content_progress").insert(data).execute()
    elif action == "completed":
        result = supabase.table("content_progress").update({"completed_at": "now()"}).eq("user_id", user_id).eq("content_id", content_id).execute()
    return {"message": "Progress tracked"}
