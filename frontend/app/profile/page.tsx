'use client'

import { useState, ChangeEvent, FormEvent, SetStateAction } from 'react'
import React from 'react'
import Navbar from '@/components/Navbar'
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react'

export type UserType = 'individual' | 'caregiver' | 'family'
export type GenderType = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'

interface ProfileFormData {
  name: string
  displayName: string
  email: string
  age: number | ''
  gender: GenderType
  phone: string
  place: string
  userType: UserType
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Initialize form data with proper types
  // Initialize form data with proper types
  const [formData, setFormData] = useState<ProfileFormData>({
    name: 'John Doe',
    displayName: 'johndoe',
    email: 'john@example.com',
    age: 28,
    gender: 'male',
    phone: '+1234567890',
    place: 'New York',
    userType: 'individual',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData((prev: ProfileFormData) => {
      // Handle different input types specifically
      if (name === 'age') {
        return {
          ...prev,
          age: value ? parseInt(value, 10) || '' : ''
        }
      }
      
      // Create a new object with the updated field
      const updated = { ...prev };
      
      // Type-safe property assignment
      if (name in updated) {
        type FormDataKey = keyof ProfileFormData;
        const key = name as FormDataKey;
        
        // Special handling for different field types
        if (key === 'gender') {
          updated[key] = value as GenderType;
        } else if (key === 'userType') {
          updated[key] = value as UserType;
        } else if (key === 'age') {
          updated[key] = value ? parseInt(value, 10) || '' : '';
        } else {
          updated[key] = value as string;
        }
      }
      
      return updated;
    });
    // Clear any previous messages when form is being edited
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      // Basic validation
      if (!formData.name.trim()) {
        throw new Error('Name is required')
      }
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email')
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would call your API here:
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to update profile');
      
      setSuccess('Profile updated successfully!')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLocationLoading(true)
    setError(null)
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
          // In a real app, you would call a reverse geocoding API here
          // Example with the OpenStreetMap Nominatim API:
          // const response = await fetch(
          //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          // );
          // const data = await response.json();
          // const locationName = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          // For demo purposes, we'll just use the coordinates
          const locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          
          setFormData((prev: ProfileFormData) => ({
            ...prev,
            place: locationName
          }))
          setSuccess('Location updated successfully')
        } catch (err: unknown) {
          setError('Failed to get location name. Using coordinates instead.')
        } finally {
          setLocationLoading(false)
        }
      },
      (error: GeolocationPositionError) => {
        const errorMessage = {
          1: 'Please enable location permissions in your browser settings',
          2: 'Location information is unavailable',
          3: 'Request timed out. Please try again',
        }[error.code as 1 | 2 | 3] || 'Unable to retrieve your location'
        
        setError(errorMessage)
        setLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal information and preferences
          </p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300">
              <p>{success}</p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-accent-teal flex items-center justify-center text-white text-3xl font-bold">
                {formData.name.charAt(0)}
              </div>
              <div>
                <button 
                  type="button" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  disabled={isLoading}
                >
                  Change Photo
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="place" className="block text-sm font-medium mb-2">
                Location
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="place"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="City, Country"
                  />
                </div>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading || isLoading}
                  className="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {locationLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Locating...
                    </>
                  ) : (
                    'Use Current Location'
                  )}
                </button>
              </div>
            </div>

            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium mb-2">
                Account Type
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="input"
                disabled
              >
                <option value="individual">Individual</option>
                <option value="caregiver">Caregiver / Medical Professional</option>
                <option value="family">Family Member</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">
                Contact support to change your account type
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
