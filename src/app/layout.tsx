import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GradSync - PIEMR Alumni Network',
  description: 'Connect, grow, and succeed with the PIEMR alumni community. Professional networking, job opportunities, and mentorship for graduates.',
  keywords: 'alumni, PIEMR, networking, jobs, mentorship, graduates',
  authors: [{ name: 'GradSync Team' }],
  openGraph: {
    title: 'GradSync - PIEMR Alumni Network',
    description: 'Connect with PIEMR alumni, find job opportunities, and build your professional network.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
