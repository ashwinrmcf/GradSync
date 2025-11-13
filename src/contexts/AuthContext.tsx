'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI, userAPI } from '@/lib/api'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  batchYear: string
  branch: string
  rollNumber: string
  currentCompany?: string
  position?: string
  location?: string
  profileImage?: string
  role: 'alumni' | 'student' | 'admin'
  isVerified: boolean
  joinedAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  batchYear: string
  branch: string
  rollNumber: string
  currentCompany?: string
  position?: string
  location?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock authentication - replace with real API calls
  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('gradsync_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('gradsync_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data: any = await authAPI.login(email, password)
      
      if (data.success && data.user) {
        const user: User = {
          id: data.user.id.toString(),
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          batchYear: data.user.batchYear,
          branch: data.user.branch,
          rollNumber: data.user.rollNumber,
          currentCompany: data.user.currentCompany,
          position: data.user.position,
          location: data.user.location,
          profileImage: data.user.profileImageUrl,
          role: data.user.role.toLowerCase(),
          isVerified: data.user.isVerified,
          joinedAt: new Date(data.user.createdAt)
        }
        
        setUser(user)
        localStorage.setItem('gradsync_user', JSON.stringify(user))
        localStorage.setItem('gradsync_token', data.accessToken)
        localStorage.setItem('gradsync_refresh_token', data.refreshToken)
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const data: any = await authAPI.register({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        batchYear: userData.batchYear,
        branch: userData.branch,
        rollNumber: userData.rollNumber,
        currentCompany: userData.currentCompany,
        position: userData.position,
        location: userData.location,
        role: 'ALUMNI',
        agreeToTerms: true,
        allowNetworking: true
      })
      
      if (data.success && data.user) {
        const user: User = {
          id: data.user.id.toString(),
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          batchYear: data.user.batchYear,
          branch: data.user.branch,
          rollNumber: data.user.rollNumber,
          currentCompany: data.user.currentCompany,
          position: data.user.position,
          location: data.user.location,
          profileImage: data.user.profileImageUrl,
          role: data.user.role.toLowerCase(),
          isVerified: data.user.isVerified,
          joinedAt: new Date(data.user.createdAt)
        }
        
        setUser(user)
        localStorage.setItem('gradsync_user', JSON.stringify(user))
        localStorage.setItem('gradsync_token', data.accessToken)
        localStorage.setItem('gradsync_refresh_token', data.refreshToken)
      } else {
        throw new Error(data.message || 'Registration failed')
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('gradsync_user')
    localStorage.removeItem('gradsync_token')
    localStorage.removeItem('gradsync_refresh_token')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    
    setIsLoading(true)
    try {
      // Call the real API to update profile
      await userAPI.updateProfile(data)
      
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('gradsync_user', JSON.stringify(updatedUser))
    } catch (error) {
      throw new Error('Profile update failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock data for development
export const mockAlumni: User[] = [
  {
    id: '1',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@google.com',
    batchYear: '2020',
    branch: 'Computer Science Engineering',
    rollNumber: '20CS001',
    currentCompany: 'Google',
    position: 'Senior Software Engineer',
    location: 'San Francisco, USA',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    role: 'alumni',
    isVerified: true,
    joinedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    firstName: 'Rahul',
    lastName: 'Patel',
    email: 'rahul.patel@microsoft.com',
    batchYear: '2019',
    branch: 'Computer Science Engineering',
    rollNumber: '19CS015',
    currentCompany: 'Microsoft',
    position: 'Product Manager',
    location: 'Seattle, USA',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    role: 'alumni',
    isVerified: true,
    joinedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    firstName: 'Anita',
    lastName: 'Desai',
    email: 'anita.desai@goldmansachs.com',
    batchYear: '2018',
    branch: 'Electronics & Communication Engineering',
    rollNumber: '18EC023',
    currentCompany: 'Goldman Sachs',
    position: 'Vice President',
    location: 'New York, USA',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    role: 'alumni',
    isVerified: true,
    joinedAt: new Date('2024-02-01')
  }
]
