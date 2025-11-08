// Gemini AI Integration Utilities
// This file provides wrappers for calling Gemini API through the backend

import { apiRequest } from './api'

interface ConversationContext {
  userMessage: string
  conversationHistory?: Array<{ role: string; content: string }>
  userContext?: {
    previousSessions?: string[]
    emotionalState?: string
    preferences?: Record<string, any>
  }
}

interface JournalEntry {
  content: string
  mood?: string
  timestamp: string
}

interface EmotionalState {
  currentMood?: string
  stressLevel?: number
  recentActivities?: string[]
  timeOfDay: string
  streaks?: Record<string, number>
}

/**
 * Get an empathetic reply from Gemini for therapy/chat contexts
 * 
 * @param context - Conversation context including user message and history
 * @returns Empathetic response with validation, reflection, and guidance
 */
export async function empatheticReply(
  context: ConversationContext,
  token: string
): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/empathetic-reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        user_message: context.userMessage,
        conversation_history: context.conversationHistory || [],
        user_context: context.userContext || {},
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get empathetic reply')
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Empathetic reply error:', error)
    return "I'm here with you. Take a moment to breathe. How can I support you right now?"
  }
}

/**
 * Summarize journal entries using Gemini
 * 
 * @param entries - Array of journal entries to summarize
 * @returns Summary text with key themes and emotional patterns
 */
export async function summarizeJournal(
  entries: JournalEntry[],
  token: string
): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/summarize-journal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ entries }),
    })

    if (!response.ok) {
      throw new Error('Failed to summarize journal')
    }

    const data = await response.json()
    return data.summary
  } catch (error) {
    console.error('Journal summary error:', error)
    return "Unable to generate summary at this time."
  }
}

/**
 * Get personalized next action suggestion based on user's emotional state
 * 
 * @param state - Current emotional and activity state
 * @returns Suggested next action with reasoning
 */
export async function suggestNextAction(
  state: EmotionalState,
  token: string
): Promise<{ action: string; reasoning: string; duration?: number }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/suggest-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ state }),
    })

    if (!response.ok) {
      throw new Error('Failed to get suggestion')
    }

    const data = await response.json()
    return {
      action: data.action,
      reasoning: data.reasoning,
      duration: data.duration,
    }
  } catch (error) {
    console.error('Suggestion error:', error)
    return {
      action: 'Take a moment to breathe and center yourself',
      reasoning: 'A mindful pause can help restore balance',
      duration: 5,
    }
  }
}

/**
 * Classify emotion from text using Gemini
 * 
 * @param text - Text to analyze for emotion
 * @returns Emotion label and intensity (0-100)
 */
export async function classifyEmotion(
  text: string,
  token: string
): Promise<{ label: string; intensity: number; secondary?: string[] }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/classify-emotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error('Failed to classify emotion')
    }

    const data = await response.json()
    return {
      label: data.label,
      intensity: data.intensity,
      secondary: data.secondary || [],
    }
  } catch (error) {
    console.error('Emotion classification error:', error)
    return {
      label: 'neutral',
      intensity: 50,
      secondary: [],
    }
  }
}

/**
 * Generate content summary for Content Library items
 * 
 * @param content - Content text or metadata
 * @returns One-line summary
 */
export async function generateContentSummary(
  content: { title: string; description?: string; url?: string },
  token: string
): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/content-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate summary')
    }

    const data = await response.json()
    return data.summary
  } catch (error) {
    console.error('Content summary error:', error)
    return content.description || 'Explore this resource for wellness insights.'
  }
}

/**
 * Detect crisis indicators in text
 * 
 * @param text - Text to analyze for crisis indicators
 * @returns Crisis detection result with severity and resources
 */
export async function detectCrisis(
  text: string,
  token: string
): Promise<{ detected: boolean; severity?: 'low' | 'medium' | 'high'; message?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemini/detect-crisis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error('Failed to detect crisis')
    }

    const data = await response.json()
    return {
      detected: data.detected,
      severity: data.severity,
      message: data.message,
    }
  } catch (error) {
    console.error('Crisis detection error:', error)
    return { detected: false }
  }
}

// Example prompt templates used by the backend (for reference)
export const PROMPT_TEMPLATES = {
  empatheticReply: `You are a warm, empathetic mental wellness companion. 
Your role is to:
1. Validate the person's feelings without judgment
2. Reflect what you heard with compassion
3. Ask ONE gentle, open-ended question
4. Optionally suggest ONE small, accessible practice
Never diagnose, give medical advice, or be overly prescriptive.
Respond in 2-4 sentences maximum.`,

  journalSummary: `Summarize these journal entries with:
1. Key emotional themes (2-3)
2. Notable patterns or shifts
3. One gentle insight or affirmation
Keep it warm, non-judgmental, and under 4 sentences.`,

  nextAction: `Based on the user's current state, suggest:
1. A specific, actionable next step (meditation, journaling, movement, etc.)
2. Brief reasoning (1 sentence)
3. Estimated duration in minutes
Be specific and compassionate.`,

  emotionClassify: `Analyze the text and return:
1. Primary emotion (happy/sad/anxious/calm/energetic/stressed/neutral)
2. Intensity (0-100)
3. Up to 2 secondary emotions if present
Return as JSON only.`,
}
