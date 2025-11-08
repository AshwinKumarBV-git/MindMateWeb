from fastapi import APIRouter
from services.supabase_client import get_supabase

router = APIRouter()

@router.get("")
async def get_entries(user_id: str):
    """Get all journal entries for user"""
    supabase = get_supabase()
    result = supabase.table("journal_entries").select("*").eq("user_id", user_id).order("timestamp", desc=True).execute()
    return result.data

@router.post("")
async def create_entry(user_id: str, encrypted_content: str, mood_tag: str = None, theme: str = None):
    """Create new journal entry"""
    supabase = get_supabase()
    data = {"user_id": user_id, "encrypted_content": encrypted_content, "mood_tag": mood_tag, "theme": theme}
    result = supabase.table("journal_entries").insert(data).execute()
    return result.data

@router.delete("/{entry_id}")
async def delete_entry(entry_id: str, user_id: str):
    """Delete journal entry"""
    supabase = get_supabase()
    result = supabase.table("journal_entries").delete().eq("id", entry_id).eq("user_id", user_id).execute()
    return {"message": "Entry deleted"}
