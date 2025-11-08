from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import (
    get_empathetic_reply,
    summarize_journal_entries,
    suggest_next_action,
    classify_emotion_from_text,
    detect_crisis_indicators
)

router = APIRouter()

class EmpatheticReplyRequest(BaseModel):
    user_message: str
    conversation_history: list = []
    user_context: dict = {}

class JournalSummaryRequest(BaseModel):
    entries: list

class SuggestActionRequest(BaseModel):
    state: dict

class ClassifyEmotionRequest(BaseModel):
    text: str

class DetectCrisisRequest(BaseModel):
    text: str

@router.post("/empathetic-reply")
async def empathetic_reply(data: EmpatheticReplyRequest):
    """Get empathetic response from Gemini"""
    try:
        response = await get_empathetic_reply(
            data.user_message,
            data.conversation_history,
            data.user_context
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarize-journal")
async def summarize_journal(data: JournalSummaryRequest):
    """Summarize journal entries"""
    try:
        summary = await summarize_journal_entries(data.entries)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest-action")
async def suggest_action(data: SuggestActionRequest):
    """Suggest next wellness action"""
    try:
        suggestion = await suggest_next_action(data.state)
        return suggestion
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/classify-emotion")
async def classify_emotion(data: ClassifyEmotionRequest):
    """Classify emotion from text"""
    try:
        result = await classify_emotion_from_text(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/detect-crisis")
async def detect_crisis(data: DetectCrisisRequest):
    """Detect crisis indicators"""
    try:
        result = await detect_crisis_indicators(data.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
