const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface RequestOptions extends RequestInit {
  token?: string
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include cookies for JWT
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// Auth APIs
export const authAPI = {
  register: (data: {
    name: string
    username: string
    email: string
    password: string
    user_type: string
  }) => apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  googleAuth: (token: string) =>
    apiRequest('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),

  logout: (token: string) =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
      token,
    }),

  refresh: () =>
    apiRequest('/api/auth/refresh', {
      method: 'POST',
    }),
}

// User APIs
export const userAPI = {
  getProfile: (token: string) =>
    apiRequest('/api/users/me', { token }),

  updateProfile: (token: string, data: any) =>
    apiRequest('/api/users/me', {
      method: 'PUT',
      token,
      body: JSON.stringify(data),
    }),
}

// Journal APIs
export const journalAPI = {
  getEntries: (token: string) =>
    apiRequest('/api/journal', { token }),

  createEntry: (token: string, data: any) =>
    apiRequest('/api/journal', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),

  updateEntry: (token: string, id: string, data: any) =>
    apiRequest(`/api/journal/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(data),
    }),

  deleteEntry: (token: string, id: string) =>
    apiRequest(`/api/journal/${id}`, {
      method: 'DELETE',
      token,
    }),
}

// Emotion APIs
export const emotionAPI = {
  getLogs: (token: string, limit?: number) =>
    apiRequest(`/api/emotion/logs${limit ? `?limit=${limit}` : ''}`, { token }),

  createLog: (token: string, data: any) =>
    apiRequest('/api/emotion/logs', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),

  deleteLog: (token: string, id: string) =>
    apiRequest(`/api/emotion/logs/${id}`, {
      method: 'DELETE',
      token,
    }),
}

// Therapy APIs
export const therapyAPI = {
  startSession: (token: string, mode: string) =>
    apiRequest('/api/therapy/session', {
      method: 'POST',
      token,
      body: JSON.stringify({ mode }),
    }),

  sendMessage: (token: string, sessionId: string, message: string) =>
    apiRequest('/api/therapy/message', {
      method: 'POST',
      token,
      body: JSON.stringify({ session_id: sessionId, message }),
    }),

  getHistory: (token: string) =>
    apiRequest('/api/therapy/history', { token }),

  getSession: (token: string, sessionId: string) =>
    apiRequest(`/api/therapy/session/${sessionId}`, { token }),
}

// FeelHear APIs
export const feelHearAPI = {
  uploadAudio: async (token: string, audioBlob: Blob) => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')

    const response = await fetch(`${API_URL}/api/feelhear/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return response.json()
  },

  getResponse: (token: string, sessionId: string) =>
    apiRequest(`/api/feelhear/response/${sessionId}`, { token }),

  saveSession: (token: string, sessionId: string) =>
    apiRequest('/api/feelhear/save', {
      method: 'POST',
      token,
      body: JSON.stringify({ session_id: sessionId }),
    }),
}

// Meditation APIs
export const meditationAPI = {
  getSessions: (token: string) =>
    apiRequest('/api/meditation/sessions', { token }),

  createSession: (token: string, data: any) =>
    apiRequest('/api/meditation/sessions', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),
}

// Content Library APIs
export const contentAPI = {
  getItems: (token: string, filters?: any) => {
    const params = new URLSearchParams(filters).toString()
    return apiRequest(`/api/content/items${params ? `?${params}` : ''}`, { token })
  },

  trackProgress: (token: string, contentId: string, action: 'opened' | 'completed') =>
    apiRequest('/api/content/progress', {
      method: 'POST',
      token,
      body: JSON.stringify({ content_id: contentId, action }),
    }),
}

// Digital Wellness APIs
export const wellnessAPI = {
  getMetrics: (token: string, days?: number) =>
    apiRequest(`/api/digital-wellness/metrics${days ? `?days=${days}` : ''}`, { token }),

  submitMetrics: (token: string, data: any) =>
    apiRequest('/api/digital-wellness/metrics', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),
}

// Wellness Plan APIs
export const wellnessPlanAPI = {
  getState: (token: string) =>
    apiRequest('/api/wellness-plan/state', { token }),

  updateState: (token: string, data: any) =>
    apiRequest('/api/wellness-plan/state', {
      method: 'PUT',
      token,
      body: JSON.stringify(data),
    }),
}

// Brain Gym APIs
export const brainGymAPI = {
  getGames: (token: string) =>
    apiRequest('/api/braingym/games', { token }),

  submitScore: (token: string, data: any) =>
    apiRequest('/api/braingym/score', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),

  getScores: (token: string) =>
    apiRequest('/api/braingym/score', { token }),
}

// Symphony APIs
export const symphonyAPI = {
  contribute: (token: string, data: any) =>
    apiRequest('/api/symphony/contribute', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    }),

  getAggregate: (token: string, timeframe?: string) =>
    apiRequest(`/api/symphony/aggregate${timeframe ? `?timeframe=${timeframe}` : ''}`, { token }),
}
