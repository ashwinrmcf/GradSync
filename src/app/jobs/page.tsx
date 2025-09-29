'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Plus,
  BookOpen
} from 'lucide-react'
import Header from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'

interface JobPosting {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract'
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedBy: string
  postedDate: Date
  deadline: Date
  applicants: number
  isUrgent?: boolean
  companyLogo?: string
}

export default function JobPortalPage() {
  const { user, isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showPostJob, setShowPostJob] = useState(false)

  // Mock job data
  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Bangalore, India',
      type: 'full-time',
      experience: '3-5 years',
      salary: '₹25-35 LPA',
      description: 'Join our team to build scalable systems that serve billions of users worldwide. Work on cutting-edge technologies and solve complex problems.',
      requirements: ['Bachelor\'s in Computer Science', '3+ years experience', 'Proficiency in Java/Python', 'System design knowledge'],
      benefits: ['Health insurance', 'Stock options', 'Flexible work hours', 'Learning budget'],
      postedBy: 'Priya Sharma',
      postedDate: new Date('2024-12-10'),
      deadline: new Date('2024-12-30'),
      applicants: 45,
      isUrgent: true,
      companyLogo: 'https://logo.clearbit.com/google.com'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'full-time',
      experience: '2-4 years',
      salary: '₹20-28 LPA',
      description: 'Lead product strategy and execution for our cloud services. Work with cross-functional teams to deliver innovative solutions.',
      requirements: ['MBA or equivalent', '2+ years PM experience', 'Technical background preferred', 'Strong analytical skills'],
      benefits: ['Health insurance', 'Retirement plans', 'Remote work options', 'Professional development'],
      postedBy: 'Rahul Patel',
      postedDate: new Date('2024-12-08'),
      deadline: new Date('2025-01-15'),
      applicants: 32,
      companyLogo: 'https://logo.clearbit.com/microsoft.com'
    },
    {
      id: '3',
      title: 'Software Development Intern',
      company: 'Amazon',
      location: 'Chennai, India',
      type: 'internship',
      experience: 'Entry level',
      salary: '₹50,000/month',
      description: 'Summer internship program for final year students. Work on real projects and get mentorship from senior engineers.',
      requirements: ['Final year student', 'Strong programming skills', 'Data structures knowledge', 'Problem-solving abilities'],
      benefits: ['Stipend', 'Mentorship', 'Full-time offer potential', 'Learning opportunities'],
      postedBy: 'Amit Kumar',
      postedDate: new Date('2024-12-05'),
      deadline: new Date('2024-12-25'),
      applicants: 128,
      companyLogo: 'https://logo.clearbit.com/amazon.com'
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'Flipkart',
      location: 'Bangalore, India',
      type: 'full-time',
      experience: '1-3 years',
      salary: '₹15-22 LPA',
      description: 'Analyze large datasets to drive business decisions. Build ML models and work with product teams to implement data-driven solutions.',
      requirements: ['Master\'s in Data Science/Statistics', 'Python/R proficiency', 'ML/AI experience', 'SQL knowledge'],
      benefits: ['Health insurance', 'Performance bonus', 'Flexible hours', 'Upskilling budget'],
      postedBy: 'Sneha Reddy',
      postedDate: new Date('2024-12-07'),
      deadline: new Date('2025-01-10'),
      applicants: 67,
      companyLogo: 'https://logo.clearbit.com/flipkart.com'
    },
    {
      id: '5',
      title: 'Frontend Developer',
      company: 'Zomato',
      location: 'Gurgaon, India',
      type: 'full-time',
      experience: '1-2 years',
      salary: '₹12-18 LPA',
      description: 'Build beautiful and responsive user interfaces for our food delivery platform. Work with React, TypeScript, and modern web technologies.',
      requirements: ['Bachelor\'s degree', 'React.js expertise', 'JavaScript/TypeScript', 'CSS/HTML proficiency'],
      benefits: ['Health insurance', 'Food allowance', 'Work from home', 'Team outings'],
      postedBy: 'Alumni Network',
      postedDate: new Date('2024-12-06'),
      deadline: new Date('2024-12-28'),
      applicants: 89,
      companyLogo: 'https://logo.clearbit.com/zomato.com'
    }
  ]

  const jobTypes = ['full-time', 'part-time', 'internship', 'contract']
  const locations = Array.from(new Set(jobPostings.map(job => job.location)))
  const experienceLevels = Array.from(new Set(jobPostings.map(job => job.experience)))

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobPostings.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === '' || job.type === selectedType
      const matchesLocation = selectedLocation === '' || job.location === selectedLocation
      const matchesExperience = selectedExperience === '' || job.experience === selectedExperience

      return matchesSearch && matchesType && matchesLocation && matchesExperience
    })
  }, [searchTerm, selectedType, selectedLocation, selectedExperience])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedLocation('')
    setSelectedExperience('')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-700'
      case 'part-time': return 'bg-blue-100 text-blue-700'
      case 'internship': return 'bg-purple-100 text-purple-700'
      case 'contract': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDaysLeft = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Portal</h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  Discover exclusive job opportunities shared by PIEMR alumni. Find your next career move or help fellow graduates.
                </p>
              </div>
              
              {isAuthenticated && (
                <button
                  onClick={() => setShowPostJob(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Post Job</span>
                </button>
              )}
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
                  placeholder="Search jobs by title, company, or keywords..."
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
                  className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Types</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                        </option>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Levels</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-3 flex justify-end">
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
              Showing {filteredJobs.length} of {jobPostings.length} jobs
            </p>
            <div className="flex items-center space-x-2">
              <Briefcase size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">{filteredJobs.length} opportunities</span>
            </div>
          </div>

          {/* Job Listings */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {job.companyLogo ? (
                          <img src={job.companyLogo} alt={job.company} className="w-8 h-8 object-contain" />
                        ) : (
                          <Building size={20} className="text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Job Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {job.title}
                              </h3>
                              {job.isUrgent && (
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-lg font-semibold text-primary-600">{job.company}</p>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                            {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
                          </span>
                        </div>

                        {/* Job Details */}
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-2" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen size={14} className="mr-2" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign size={14} className="mr-2" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={14} className="mr-2" />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>

                        {/* Job Description */}
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {job.description}
                        </p>

                        {/* Requirements Preview */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.slice(0, 3).map((req, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {req}
                              </span>
                            ))}
                            {job.requirements.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{job.requirements.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span>Posted by {job.postedBy}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(job.postedDate)}</span>
                            <span className="mx-2">•</span>
                            <span className={`${getDaysLeft(job.deadline) <= 7 ? 'text-red-600 font-medium' : ''}`}>
                              {getDaysLeft(job.deadline)} days left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="ml-6 flex-shrink-0">
                    <button className="btn-primary flex items-center space-x-2 group">
                      <span>Apply Now</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more opportunities.
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
    </div>
  )
}
