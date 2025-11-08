'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-brand/10 via-white to-accent-teal/10 dark:from-dark-deep dark:via-dark-bg dark:to-dark-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Brain Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Brain className="w-32 h-32 text-brand" strokeWidth={1.5} />
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-accent-yellow" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-6xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-4"
        >
          <span className="bg-gradient-to-r from-brand to-accent-teal bg-clip-text text-transparent">
            MindMate
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
        >
          Your compassionate companion for mental wellness and emotional support
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/auth/register"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Get Started
            <Sparkles className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand hover:text-brand-deep font-medium underline">
            Login
          </Link>
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-8 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <div className="flex gap-4">
          <Link href="#" className="hover:text-brand transition-colors">Privacy</Link>
          <span>•</span>
          <Link href="#" className="hover:text-brand transition-colors">Terms</Link>
          <span>•</span>
          <Link href="#" className="hover:text-brand transition-colors">Support</Link>
        </div>
      </motion.footer>
    </div>
  )
}
