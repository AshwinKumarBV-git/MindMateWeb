'use client'

import Navbar from '@/components/Navbar'
import CardFeature from '@/components/CardFeature'
import { 
  Stethoscope, 
  Meditation, 
  BookOpen, 
  Headphones, 
  MessageCircle, 
  Brain, 
  Globe 
} from 'lucide-react'

export default function MatesPage() {
  const mates = [
    {
      title: 'Virtual Therapy Session',
      description: 'Talk to a compassionate AI therapist in a safe, judgment-free space',
      icon: Stethoscope,
      href: '/mates/therapy',
      gradient: 'lavender' as const,
    },
    {
      title: 'Meditation Zone',
      description: 'Find your calm with guided meditations and ambient soundscapes',
      icon: Meditation,
      href: '/mates/meditation',
      gradient: 'ocean' as const,
    },
    {
      title: 'Digital Journal',
      description: 'Express yourself freely in your private, encrypted journal',
      icon: BookOpen,
      href: '/mates/journal',
      gradient: 'sunset' as const,
    },
    {
      title: 'FeelHear',
      description: 'Share your emotions through voice and receive empathetic support',
      icon: Headphones,
      href: '/mates/feelhear',
      gradient: 'lavender' as const,
    },
    {
      title: 'FeelFlow',
      description: 'Text-based emotional support and mindful conversation',
      icon: MessageCircle,
      href: '/mates/feelflow',
      gradient: 'ocean' as const,
    },
    {
      title: 'Brain Gym',
      description: 'Cognitive exercises and memory games for mental fitness',
      icon: Brain,
      href: '/mates/braingym',
      gradient: 'sunset' as const,
    },
    {
      title: 'Global Emotional Symphony',
      description: 'Connect with the world\'s collective emotions in real-time',
      icon: Globe,
      href: '/mates/symphony',
      gradient: 'default' as const,
    },
  ]

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">
            Your Mates 🤝
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a companion to support your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mates.map((mate) => (
            <CardFeature
              key={mate.href}
              title={mate.title}
              description={mate.description}
              icon={mate.icon}
              href={mate.href}
              gradient={mate.gradient}
            />
          ))}
        </div>

        {/* Side features note */}
        <div className="mt-12 card p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            💡 <strong>Tip:</strong> Explore additional features like Content Library, Digital Wellness Monitor, and Personalized Wellness Plan from the sidebar icons in each Mate section.
          </p>
        </div>
      </main>
    </div>
  )
}
