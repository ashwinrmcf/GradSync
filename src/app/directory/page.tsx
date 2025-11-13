'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Calendar,
  Users,
  Mail,
  Linkedin,
  ExternalLink,
  ChevronDown
} from 'lucide-react'
import Header from '@/components/Header'
import ContactModal from '@/components/ContactModal'
import { mockAlumni, User } from '@/contexts/AuthContext'

export default function AlumniDirectoryPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [alumni, setAlumni] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [selectedAlumni, setSelectedAlumni] = useState<User | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Handle URL parameters for filtering
  useEffect(() => {
    const batchParam = searchParams.get('batch')
    const branchParam = searchParams.get('branch')
    
    if (batchParam) {
      setSelectedBatch(batchParam)
      setShowFilters(true) // Show filters if coming from batch page
    }
    if (branchParam && branchParam !== 'All') {
      setSelectedBranch(branchParam)
    }
  }, [searchParams])

  // Fetch real alumni data from API
  useEffect(() => {
    const fetchRealAlumni = async () => {
      try {
        // Get all 46 alumni
        const alumniResponse = await fetch('http://localhost:8080/api/alumni?size=50')
        const alumniData = await alumniResponse.json()
        
        if (alumniData.alumni) {
          // Transform API data to match User interface
          const transformedAlumni: User[] = alumniData.alumni.map((person: any) => ({
            id: person.id.toString(),
            firstName: person.firstName || person.name?.split(' ')[0] || 'Unknown',
            lastName: person.lastName || person.name?.split(' ').slice(1).join(' ') || '',
            email: person.email,
            batchYear: person.graduationYear?.toString() || '2022',
            branch: person.branch || 'CSE',
            rollNumber: person.rollNumber,
            currentCompany: person.currentCompany,
            position: person.designation || 'Software Engineer',
            location: person.location || person.workLocation || 'India',
            profileImage: person.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'User')}&background=3b82f6&color=fff`,
            role: 'alumni' as const,
            isVerified: true,
            joinedAt: new Date(person.createdAt || '2022-06-01')
          }))
          setAlumni(transformedAlumni)
        }

        // Get batch statistics
        const statsResponse = await fetch('http://localhost:8080/api/batches/2022/CSE')
        const statsData = await statsResponse.json()
        setStats(statsData)
        
      } catch (error) {
        console.error('Error fetching alumni:', error)
        // Fallback to mock data
        setAlumni(extendedAlumni)
      } finally {
        setLoading(false)
      }
    }

    fetchRealAlumni()
  }, [])

  // Extended mock data for directory
  const extendedAlumni: User[] = [
    ...mockAlumni,
    {
      id: '4',
      firstName: 'Amit',
      lastName: 'Kumar',
      email: 'amit.kumar@amazon.com',
      batchYear: '2021',
      branch: 'Computer Science Engineering',
      rollNumber: '21CS045',
      currentCompany: 'Amazon',
      position: 'Software Development Engineer',
      location: 'Seattle, USA',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      role: 'alumni',
      isVerified: true,
      joinedAt: new Date('2024-03-01')
    },
    {
      id: '5',
      firstName: 'Sneha',
      lastName: 'Reddy',
      email: 'sneha.reddy@flipkart.com',
      batchYear: '2019',
      branch: 'Electronics & Communication Engineering',
      rollNumber: '19EC012',
      currentCompany: 'Flipkart',
      position: 'Senior Product Manager',
      location: 'Bangalore, India',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      role: 'alumni' as const,
      isVerified: true,
      joinedAt: new Date('2024-02-15')
    },
    {
      id: '6',
      firstName: 'Rajesh',
      lastName: 'Singh',
      email: 'rajesh.singh@tcs.com',
      batchYear: '2017',
      branch: 'Mechanical Engineering',
      rollNumber: '17ME034',
      currentCompany: 'TCS',
      position: 'Technical Lead',
      location: 'Pune, India',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      role: 'alumni' as const,
      isVerified: true,
      joinedAt: new Date('2024-01-15')
    }
  ]

  // Get unique values for filters
  const batches = Array.from(new Set(alumni.map(alumni => alumni.batchYear))).sort((a, b) => b.localeCompare(a))
  const branches = Array.from(new Set(alumni.map(alumni => alumni.branch)))
  const companies = Array.from(new Set(alumni.map(alumni => alumni.currentCompany).filter(Boolean)))
  const locations = Array.from(new Set(alumni.map(alumni => alumni.location).filter(Boolean)))

  // Filter alumni based on search and filters
  const filteredAlumni = useMemo(() => {
    return alumni.filter(alumni => {
      const matchesSearch = searchTerm === '' || 
        `${alumni.firstName} ${alumni.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBatch = selectedBatch === '' || alumni.batchYear === selectedBatch
      const matchesBranch = selectedBranch === '' || alumni.branch === selectedBranch
      const matchesCompany = selectedCompany === '' || alumni.currentCompany === selectedCompany
      const matchesLocation = selectedLocation === '' || alumni.location === selectedLocation

      return matchesSearch && matchesBatch && matchesBranch && matchesCompany && matchesLocation
    })
  }, [searchTerm, selectedBatch, selectedBranch, selectedCompany, selectedLocation, alumni])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedBatch('')
    setSelectedBranch('')
    setSelectedCompany('')
    setSelectedLocation('')
  }

  const handleConnectClick = (alumni: User) => {
    setSelectedAlumni(alumni)
    setIsContactModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsContactModalOpen(false)
    setSelectedAlumni(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Directory</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with PIEMR graduates worldwide. Find mentors, collaborators, and build your professional network.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, company, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                  <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Year</label>
                    <select
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Batches</option>
                      {batches.map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Branches</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Companies</option>
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Results */}
        <div className="container-custom py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {loading ? 'Loading alumni...' : `Showing ${filteredAlumni.length} of ${alumni.length} alumni`}
            </p>
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">{filteredAlumni.length} results</span>
            </div>
          </div>

          {/* Alumni Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Profile Header */}
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-primary-500 to-golden-500"></div>
                  <div className="absolute -bottom-12 left-6">
                    <img
                      src={alumni.profileImage}
                      alt={`${alumni.firstName} ${alumni.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  {alumni.isVerified && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Content */}
                <div className="pt-14 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {alumni.firstName} {alumni.lastName}
                    </h3>
                    <p className="text-primary-600 font-semibold">{alumni.position}</p>
                    <p className="text-golden-600 font-medium">{alumni.currentCompany}</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      <span>Batch of {alumni.batchYear}</span>
                    </div>
                    <div className="flex items-center">
                      <Building size={14} className="mr-2" />
                      <span>{alumni.branch}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      <span>{alumni.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleConnectClick(alumni)}
                      className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1 hover:bg-primary-700 transition-colors"
                    >
                      <Users size={14} />
                      <span>Connect</span>
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Mail size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Linkedin size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredAlumni.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more alumni.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {selectedAlumni && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleCloseModal}
          alumni={selectedAlumni}
        />
      )}
    </div>
  )
}
