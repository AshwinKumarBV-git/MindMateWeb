'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface CardFeatureProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  gradient?: 'lavender' | 'sunset' | 'ocean' | 'default'
}

export default function CardFeature({
  title,
  description,
  icon: Icon,
  href,
  gradient = 'default',
}: CardFeatureProps) {
  const gradients = {
    lavender: 'bg-gradient-to-br from-brand/20 via-brand/10 to-transparent',
    sunset: 'bg-gradient-to-br from-blush/20 via-yellow/10 to-transparent',
    ocean: 'bg-gradient-to-br from-teal/20 via-brand/10 to-transparent',
    default: 'bg-gradient-to-br from-brand/15 via-brand-light/10 to-transparent',
  }

  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`${gradients[gradient]} card p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-brand/20`}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-dark-deep flex items-center justify-center">
            <Icon className="w-8 h-8 text-brand" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
