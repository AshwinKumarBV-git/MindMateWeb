'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { Send, Heart, Sparkles, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TherapyPage() {
  const [mode, setMode] = useState<'gentle' | 'conversational' | 'silent'>('gentle')
  const [messages, setMessages] = useState([
    {
      role: 'therapist',
      content: "Hi, I'm here with you. Take a deep breath... How are you feeling coming into this session today?",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const modes = [
    { id: 'gentle', label: '🌸 Gentle Listener', desc: 'Warm, validating presence' },
    { id: 'conversational', label: '🌤 Conversational Coach', desc: 'Active, solution-focused' },
    { id: 'silent', label: '🌙 Silent Space', desc: 'Reflective, minimal responses' },
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // TODO: Call backend API
    setTimeout(() => {
      const therapistMessage = {
        role: 'therapist',
        content: "I hear you, and what you're sharing takes courage. Can you tell me more about what that felt like for you?",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, therapistMessage])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selector */}
        <div className="mb-6 flex flex-wrap gap-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`px-4 py-2 rounded-xl transition-all ${
                mode === m.id
                  ? 'bg-brand text-white shadow-lg'
                  : 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-deep'
              }`}
            >
              <div className="font-medium">{m.label}</div>
              <div className="text-xs opacity-80">{m.desc}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2 card p-6 flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-brand text-white'
                        : 'bg-gray-100 dark:bg-dark-deep'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-dark-deep px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Share what's on your mind..."
                className="input flex-1"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="btn-primary disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Session Journal */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Session Notes
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Topics Discussed
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs">
                    Stress
                  </span>
                  <span className="px-3 py-1 bg-accent-teal/10 text-teal-600 rounded-full text-xs">
                    Work-life balance
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  How I'm feeling (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  defaultValue="5"
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Key Insights
                </label>
                <textarea
                  className="textarea mt-2"
                  rows={4}
                  placeholder="What did I learn today?"
                ></textarea>
              </div>

              <button className="btn-primary w-full">
                Save Session
              </button>
            </div>

            {/* Safety Notice */}
            <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  If you're in crisis, please reach out to a professional helpline immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
