'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink,
  Building,
  MapPin,
  Calendar,
  Copy,
  Check
} from 'lucide-react'
import { User } from '@/contexts/AuthContext'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  alumni: User
}

export default function ContactModal({ isOpen, onClose, alumni }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const generateEmailTemplate = () => {
    const subject = `Connection Request from GradSync`
    const body = `Hi ${alumni.firstName},

I hope this email finds you well. I came across your profile on the GradSync alumni directory and would love to connect with you.

I'm interested in learning more about your experience at ${alumni.currentCompany || 'your current role'} and would appreciate any insights you might share about your career journey.

Thank you for your time, and I look forward to hearing from you.

Best regards`

    return `mailto:${alumni.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const formatPhoneNumber = (phone: string) => {
    // Basic phone number formatting - you can enhance this based on your needs
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center space-x-4">
              <img
                src={alumni.profileImage}
                alt={`${alumni.firstName} ${alumni.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {alumni.firstName} {alumni.lastName}
                </h2>
                <p className="text-primary-600 font-semibold">{alumni.position}</p>
                <p className="text-golden-600">{alumni.currentCompany}</p>
              </div>
            </div>

            {/* Alumni Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={14} className="mr-2" />
                <span>Batch of {alumni.batchYear}</span>
              </div>
              <div className="flex items-center">
                <Building size={14} className="mr-2" />
                <span>{alumni.branch}</span>
              </div>
              {alumni.location && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <span>{alumni.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with {alumni.firstName}</h3>
            
            <div className="space-y-3">
              {/* Email */}
              {alumni.email && (
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">{alumni.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(alumni.email, 'email')}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy email"
                      >
                        {copiedEmail ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                      <a
                        href={generateEmailTemplate()}
                        className="btn-primary text-sm px-3 py-1 flex items-center space-x-1"
                      >
                        <Mail size={14} />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              {alumni.profileImage && (
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Linkedin size={20} className="text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">LinkedIn</p>
                        <p className="text-sm text-gray-600">Professional networking</p>
                      </div>
                    </div>
                    <a
                      href={`https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(alumni.firstName + ' ' + alumni.lastName + ' ' + (alumni.currentCompany || ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>Find on LinkedIn</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Professional Contact Request */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Professional Contact</p>
                      <p className="text-sm text-gray-600">Request contact details via email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(generateEmailTemplate(), '_blank')}
                    className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                  >
                    <Mail size={14} />
                    <span>Request Contact</span>
                  </button>
                </div>
              </div>

              {/* GitHub (if available) */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Github size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">GitHub</p>
                      <p className="text-sm text-gray-600">View projects and code</p>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/search?q=${encodeURIComponent(alumni.firstName + ' ' + alumni.lastName)}&type=users`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                  >
                    <ExternalLink size={14} />
                    <span>Find on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Context */}
          {alumni.currentCompany && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Professional Context</h4>
              <p className="text-sm text-gray-600">
                {alumni.firstName} is currently working as {alumni.position} at {alumni.currentCompany}
                {alumni.location && ` in ${alumni.location}`}. 
                They graduated from {alumni.branch} in {alumni.batchYear}.
              </p>
            </div>
          )}

          {/* Connection Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Connection Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mention your batch year and branch when reaching out</li>
              <li>• Be specific about what you'd like to discuss or learn</li>
              <li>• Keep your initial message concise and professional</li>
              <li>• Respect their time and be patient for a response</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
