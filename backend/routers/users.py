from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.supabase_client import get_supabase

router = APIRouter()

class ProfileUpdate(BaseModel):
    name: str = None
    display_name: str = None
    age: int = None
    gender: str = None
    phone: str = None
    place: str = None
    location: dict = None

@router.get("/me")
async def get_profile(user_id: str):
    """Get user profile"""
    # TODO: Extract user_id from JWT token
    supabase = get_supabase()
    result = supabase.table("profiles").select("*").eq("id", user_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return result.data[0]

@router.put("/me")
async def update_profile(user_id: str, data: ProfileUpdate):
    """Update user profile"""
    # TODO: Extract user_id from JWT token
    supabase = get_supabase()
    update_data = data.dict(exclude_none=True)
    result = supabase.table("profiles").update(update_data).eq("id", user_id).execute()
    return {"message": "Profile updated", "data": result.data}
