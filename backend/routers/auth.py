from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, EmailStr
from services.supabase_client import get_supabase

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str
    user_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register(data: RegisterRequest):
    """Register a new user"""
    try:
        supabase = get_supabase()
        
        # Create auth user
        auth_response = supabase.auth.sign_up({
            "email": data.email,
            "password": data.password,
        })
        
        if not auth_response.user:
            raise HTTPException(status_code=400, detail="Registration failed")
        
        # Create profile
        profile_data = {
            "id": auth_response.user.id,
            "name": data.name,
            "display_name": data.username,
            "user_type": data.user_type,
        }
        
        supabase.table("profiles").insert(profile_data).execute()
        
        return {
            "message": "Registration successful",
            "user": {
                "id": auth_response.user.id,
                "email": data.email,
                "name": data.name
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
async def login(data: LoginRequest, response: Response):
    """Login user"""
    try:
        supabase = get_supabase()
        
        auth_response = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password
        })
        
        if not auth_response.session:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Set httpOnly cookie
        response.set_cookie(
            key="access_token",
            value=auth_response.session.access_token,
            httponly=True,
            max_age=3600,
            secure=True,
            samesite="lax"
        )
        
        return {
            "message": "Login successful",
            "access_token": auth_response.session.access_token,
            "user": auth_response.user
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/logout")
async def logout(response: Response):
    """Logout user"""
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}

@router.post("/refresh")
async def refresh_token():
    """Refresh access token"""
    # TODO: Implement token refresh logic
    return {"message": "Token refreshed"}
