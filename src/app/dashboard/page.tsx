'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AlumniDashboard from '@/components/dashboard/AlumniDashboard'
import StudentDashboard from '@/components/dashboard/StudentDashboard'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // Render different dashboards based on user role
  switch (user.role) {
    case 'alumni':
      return <AlumniDashboard />
    case 'student':
      return <StudentDashboard />
    case 'admin':
      return <AlumniDashboard /> // Admin uses alumni dashboard for now
    default:
      return <AlumniDashboard />
  }
}
