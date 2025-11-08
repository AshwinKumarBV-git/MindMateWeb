from fastapi import APIRouter, File, UploadFile
router = APIRouter()

@router.post("/upload")
async def upload_audio(audio: UploadFile = File(...)):
    # TODO: Upload to Supabase Storage, transcribe, analyze
    return {"session_id": "mock_session_id", "message": "Audio uploaded"}

@router.get("/response/{session_id}")
async def get_response(session_id: str):
    # TODO: Return Gemini analysis
    return {"response": "I hear the emotion in your voice. You're not alone."}

@router.post("/save")
async def save_session(session_id: str):
    return {"message": "Session saved"}
