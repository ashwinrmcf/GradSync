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
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import { mockAlumni, User } from '@/contexts/AuthContext'

// Company logo mapping function
const getCompanyLogo = (companyName: string): string => {
  const companyLogos: { [key: string]: string } = {
    // Major Tech Companies
    'Google': 'https://img.icons8.com/color/48/000000/google-logo.png',
    'Microsoft': 'https://img.icons8.com/color/48/000000/microsoft.png',
    'Amazon': 'https://img.icons8.com/color/48/000000/amazon.png',
    'Apple': 'https://img.icons8.com/color/48/000000/mac-os.png',
    'Meta': 'https://img.icons8.com/color/48/000000/facebook-new.png',
    'Facebook': 'https://img.icons8.com/color/48/000000/facebook-new.png',
    'Netflix': 'https://img.icons8.com/color/48/000000/netflix.png',
    'Tesla': 'https://img.icons8.com/color/48/000000/tesla.png',
    'Oracle': 'https://img.icons8.com/color/48/000000/oracle-logo.png',
    'Salesforce': 'https://img.icons8.com/color/48/000000/salesforce.png',
    
    // Indian IT Companies
    'TCS': 'https://img.icons8.com/color/48/000000/tata.png',
    'Tata Consultancy Services': 'https://img.icons8.com/color/48/000000/tata.png',
    'Infosys': 'https://img.icons8.com/color/48/000000/infosys.png',
    'Wipro': 'https://img.icons8.com/color/48/000000/wipro.png',
    'HCL': 'https://img.icons8.com/color/48/000000/hcl.png',
    'Tech Mahindra': 'https://img.icons8.com/color/48/000000/mahindra.png',
    'Cognizant': 'https://img.icons8.com/color/48/000000/cognizant.png',
    'Accenture': 'https://img.icons8.com/color/48/000000/accenture.png',
    'Capgemini': 'https://img.icons8.com/color/48/000000/capgemini.png',
    'Deloitte': 'https://img.icons8.com/color/48/000000/deloitte.png',
    
    // Startups and Others
    'Flipkart': 'https://img.icons8.com/color/48/000000/flipkart.png',
    'Paytm': 'https://img.icons8.com/color/48/000000/paytm.png',
    'Zomato': 'https://img.icons8.com/color/48/000000/zomato.png',
    'Swiggy': 'https://img.icons8.com/color/48/000000/swiggy.png',
    'Ola': 'https://img.icons8.com/color/48/000000/ola.png',
    'Uber': 'https://img.icons8.com/color/48/000000/uber.png',
    'LinkedIn': 'https://img.icons8.com/color/48/000000/linkedin.png',
    'Twitter': 'https://img.icons8.com/color/48/000000/twitter.png',
    'Instagram': 'https://img.icons8.com/color/48/000000/instagram-new.png',
    'WhatsApp': 'https://img.icons8.com/color/48/000000/whatsapp.png',
    'Spotify': 'https://img.icons8.com/color/48/000000/spotify.png',
    'Adobe': 'https://img.icons8.com/color/48/000000/adobe-creative-cloud.png',
    'IBM': 'https://img.icons8.com/color/48/000000/ibm.png',
    'Intel': 'https://img.icons8.com/color/48/000000/intel.png',
    'Nvidia': 'https://img.icons8.com/color/48/000000/nvidia.png',
    'Samsung': 'https://img.icons8.com/color/48/000000/samsung.png',
    'Sony': 'https://img.icons8.com/color/48/000000/sony.png',
    
    // Banking and Finance
    'ICICI': 'https://img.icons8.com/color/48/000000/icici-bank.png',
    'HDFC': 'https://img.icons8.com/color/48/000000/hdfc-bank.png',
    'SBI': 'https://img.icons8.com/color/48/000000/sbi.png',
    'Axis Bank': 'https://img.icons8.com/color/48/000000/axis-bank.png',
    'Kotak': 'https://img.icons8.com/color/48/000000/kotak-mahindra-bank.png',
    
    // Default fallback
    'default': 'https://img.icons8.com/color/48/000000/company.png'
  }
  
  // Try exact match first
  if (companyLogos[companyName]) {
    return companyLogos[companyName]
  }
  
  // Try partial match for company names
  const companyKey = Object.keys(companyLogos).find(key => 
    companyName.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(companyName.toLowerCase())
  )
  
  return companyKey ? companyLogos[companyKey] : companyLogos['default']
}

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
        // Get all alumni with larger size to ensure we get all records
        const alumniResponse = await fetch('http://localhost:8080/api/alumni?size=100')
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
    // Sort alphabetically by first name, then last name
    .sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
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
                className="card overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                {/* Profile Header */}
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-primary-500 to-golden-500 relative overflow-hidden">
                    {/* Sexy Background Text with Multiple Layers */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Background glow effect */}
                      <span 
                        className="absolute text-white text-5xl font-bold transform rotate-12 select-none pointer-events-none opacity-5 blur-sm"
                        style={{ 
                          fontFamily: "'Dancing Script', 'Kalam', 'Brush Script MT', 'Lucida Handwriting', cursive",
                          fontWeight: '700',
                          letterSpacing: '3px'
                        }}
                      >
                        Batch of '{alumni.batchYear.toString().slice(-2)}
                      </span>
                      {/* Main text */}
                      <span 
                        className="relative text-white text-4xl font-bold transform rotate-12 select-none pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-300"
                        style={{ 
                          fontFamily: "'Dancing Script', 'Kalam', 'Brush Script MT', 'Lucida Handwriting', cursive",
                          textShadow: '3px 3px 8px rgba(0,0,0,0.4), 1px 1px 2px rgba(255,255,255,0.2)',
                          letterSpacing: '2px',
                          fontWeight: '700',
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        Batch of '{alumni.batchYear.toString().slice(-2)}
                      </span>
                      {/* Subtle overlay pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-45"></div>
                    </div>
                  </div>
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
                    <div className="relative">
                      {/* Company Logo Badge - Top Right of Card Content */}
                      <div className="absolute -top-8 right-0 z-10">
                        <div className="relative group">
                          <div className="w-12 h-12 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-lg border-2 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl">
                            <img
                              src={getCompanyLogo(alumni.currentCompany || '')}
                              alt={`${alumni.currentCompany} logo`}
                              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback to company initial if logo fails
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const nextElement = target.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'flex';
                              }}
                            />
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 via-primary-600 to-golden-500 rounded-lg hidden items-center justify-center text-white text-sm font-bold shadow-inner">
                              {alumni.currentCompany?.[0] || 'C'}
                            </div>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-golden-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                      </div>
                      
                      {/* Company Name with Enhanced Styling */}
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-golden-50 to-primary-50 px-3 py-1.5 rounded-full border border-golden-200/50">
                          <div className="w-2 h-2 bg-gradient-to-r from-golden-400 to-primary-500 rounded-full animate-pulse"></div>
                          <p className="text-golden-700 font-semibold text-sm tracking-wide">{alumni.currentCompany}</p>
                        </div>
                      </div>
                    </div>
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

      <Footer />
    </div>
  )
}
