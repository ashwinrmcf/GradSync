'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Calendar, Building, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import PasswordValidator from '@/components/PasswordValidator'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Alumni Info
    batchYear: '',
    branch: '',
    rollNumber: '',
    currentCompany: '',
    position: '',
    location: '',
    
    // Step 3: Agreement
    agreeToTerms: false,
    allowNetworking: true
  })

  const branches = [
    'Computer Science Engineering',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology'
  ]

  const currentYear = new Date().getFullYear()
  const batchYears = Array.from({ length: 20 }, (_, i) => currentYear - i)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password on step 1
    if (step === 1 && !isPasswordValid) {
      alert('Please ensure your password meets all requirements and passwords match.')
      return
    }
    
    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          batchYear: formData.batchYear,
          branch: formData.branch,
          rollNumber: formData.rollNumber,
          currentCompany: formData.currentCompany,
          position: formData.position,
          location: formData.location
        })
        router.push('/dashboard')
      } catch (error) {
        console.error('Registration failed:', error)
        // TODO: Show error message to user
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="john.doe@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Password Validation */}
        <PasswordValidator
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          onValidationChange={setIsPasswordValid}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="batchYear" className="block text-sm font-medium text-gray-700 mb-2">
            Batch Year
          </label>
          <select
            id="batchYear"
            name="batchYear"
            required
            value={formData.batchYear}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select Year</option>
            {batchYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            required
            value={formData.branch}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Roll Number
        </label>
        <input
          id="rollNumber"
          name="rollNumber"
          type="text"
          required
          value={formData.rollNumber}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., 20CS001"
        />
      </div>

      <div>
        <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-2">
          Current Company
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="currentCompany"
            name="currentCompany"
            type="text"
            value={formData.currentCompany}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Google, Microsoft, Startup"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            value={formData.position}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Software Engineer"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Bangalore, India"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Information</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
          <p><span className="font-medium">Batch:</span> {formData.batchYear} - {formData.branch}</p>
          <p><span className="font-medium">Roll Number:</span> {formData.rollNumber}</p>
          {formData.currentCompany && (
            <p><span className="font-medium">Company:</span> {formData.currentCompany}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
            </Link>
          </label>
        </div>

        <div className="flex items-start">
          <input
            id="allowNetworking"
            name="allowNetworking"
            type="checkbox"
            checked={formData.allowNetworking}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="allowNetworking" className="ml-3 text-sm text-gray-700">
            Allow other alumni to find and connect with me
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-golden-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">GS</span>
            </div>
            <span className="text-3xl font-bold text-primary-500">GradSync</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join the Network</h2>
          <p className="mt-2 text-gray-600">Connect with PIEMR alumni worldwide</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <motion.form
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Alumni Details'}
              {step === 3 && 'Complete Registration'}
            </h3>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 btn-secondary py-3"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              disabled={step === 1 && !isPasswordValid}
              className={`flex-1 py-3 transition-colors ${
                step === 1 && !isPasswordValid 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'btn-primary'
              }`}
            >
              {step === 3 ? 'Create Account' : 'Next'}
            </button>
          </div>
        </motion.form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
