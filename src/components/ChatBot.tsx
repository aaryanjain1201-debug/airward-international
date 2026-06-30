'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const faq: Record<string, string> = {
  'packages': 'We offer curated packages to Maldives, Switzerland, Dubai, Bali, Paris, Thailand and 500+ destinations. Visit our Packages page to explore all options!',
  'price': 'Our packages start from ₹49,999 per person. We offer the best prices with no hidden charges. Early bird discounts up to 25% available!',
  'discount': 'We offer Early Bird (25% off), Group Discount (15% off for 5+ travelers), and Honeymoon Special (free spa & dinner). Contact us for custom deals!',
  'founder': 'Airward International was founded by Arihant Jain (CEO) and Shweta Jain (COO), based in Ahmedabad, India. We have 12+ years of travel industry experience.',
  'contact': 'Reach us at +91 88664 01355 or info@airwardinternational.com. Our office is in Ahmedabad, India. We respond within 2 hours!',
  'visa': 'We provide visa assistance for 50+ countries including Schengen, USA, UK, Canada, Australia, and more. Contact us for hassle-free visa processing.',
  'booking': 'Booking is simple! Choose a package, select your travel dates, and pay securely via Stripe. You\'ll receive instant confirmation via email.',
  'hello': 'Hello! Welcome to Airward International. I\'m here to help you plan your perfect trip. Ask me about packages, prices, discounts, or anything else!',
  'hi': 'Hi there! How can I help you today? Ask about our travel packages, prices, or destinations!',
  'help': 'I can help with: package info, pricing, discounts, visa assistance, booking process, and founder info. What would you like to know?',
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, val] of Object.entries(faq)) {
    if (lower.includes(key)) return val
  }
  return 'Thanks for your message! For detailed assistance, please contact us at +91 88664 01355 or visit our Contact page. Our team responds within 2 hours!'
}

interface Message {
  id: number
  text: string
  isBot: boolean
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: 'Welcome to Airward International! I\'m here to help you plan your perfect trip. How can I assist you today?', isBot: true },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return
    const userMsg: Message = { id: Date.now(), text: msg, isBot: false }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getResponse(msg), isBot: true }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 800)
  }

  const suggestions = ['Show me packages', 'Best deals', 'Contact support']

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-lg active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-elevation-5 border border-surface-200/50 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-brand-600 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Airward Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white/70 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.isBot ? 'bg-brand-50' : 'bg-surface-100'
                }`}>
                  {msg.isBot ? <Bot className="w-4 h-4 text-brand-600" /> : <User className="w-4 h-4 text-surface-600" />}
                </div>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isBot
                    ? 'bg-surface-50 text-surface-700 rounded-bl-sm'
                    : 'bg-brand-600 text-white rounded-br-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 bg-brand-50 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-600" />
                </div>
                <div className="bg-surface-50 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full hover:bg-brand-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-surface-100 shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-surface-50 border-0 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 placeholder:text-surface-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-brand-600 hover:bg-brand-700 disabled:bg-surface-200 text-white disabled:text-surface-400 rounded-xl flex items-center justify-center transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}