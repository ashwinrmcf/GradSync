'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"
        />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-golden-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          <span className="text-xl font-bold text-primary-500">GradSync</span>
        </div>
        <p className="text-gray-600 mt-2">Loading your dashboard...</p>
      </div>
    </div>
  )
}
