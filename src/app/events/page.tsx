'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  ChevronRight,
  Star,
  Tag,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025",
    description: "Join us for our biggest alumni gathering of the year! Reconnect with old friends, network with industry leaders, and celebrate our achievements together.",
    date: "2025-12-15",
    time: "18:00",
    location: "PIEMR Campus, Main Auditorium",
    type: "networking",
    category: "Annual Event",
    price: "Free",
    capacity: 500,
    registered: 342,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    featured: true,
    organizer: {
      name: "Alumni Association",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Networking", "Career", "Reunion"]
  },
  {
    id: 2,
    title: "Tech Talk: AI in Healthcare",
    description: "Explore the latest innovations in AI and machine learning applications in healthcare with industry experts from our alumni network.",
    date: "2025-11-20",
    time: "19:00",
    location: "Virtual Event (Zoom)",
    type: "workshop",
    category: "Tech Talk",
    price: "₹500",
    capacity: 100,
    registered: 78,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    featured: false,
    organizer: {
      name: "Dr. Priya Sharma (Batch 2015)",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b812c8db?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Technology", "Healthcare", "AI"]
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    description: "Watch our entrepreneurial alumni pitch their innovative startups. Network with investors and fellow entrepreneurs.",
    date: "2025-11-10",
    time: "18:30",
    location: "Innovation Hub, Bangalore",
    type: "networking",
    category: "Entrepreneurship",
    price: "₹300",
    capacity: 150,
    registered: 92,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
    featured: true,
    organizer: {
      name: "Entrepreneurship Cell",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Startup", "Investment", "Innovation"]
  },
  {
    id: 4,
    title: "Career Guidance Workshop",
    description: "Get personalized career advice from senior alumni working in top companies. Resume reviews and mock interviews included.",
    date: "2025-11-05",
    time: "14:00",
    location: "PIEMR Campus, Conference Hall",
    type: "workshop",
    category: "Career Development",
    price: "Free",
    capacity: 80,
    registered: 65,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    featured: false,
    organizer: {
      name: "Career Services Team",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Career", "Mentorship", "Skills"]
  },
  {
    id: 5,
    title: "Alumni Sports Day",
    description: "Relive your college days with friendly sports competitions. Cricket, football, basketball, and more!",
    date: "2025-12-08",
    time: "09:00",
    location: "PIEMR Sports Complex",
    type: "sports",
    category: "Recreation",
    price: "₹200",
    capacity: 200,
    registered: 156,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    featured: false,
    organizer: {
      name: "Sports Committee",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Sports", "Recreation", "Fun"]
  },
  {
    id: 6,
    title: "Financial Planning Seminar",
    description: "Learn about investment strategies, retirement planning, and wealth management from certified financial advisors.",
    date: "2025-11-25",
    time: "15:00",
    location: "Virtual Event (Teams)",
    type: "seminar",
    category: "Finance",
    price: "₹750",
    capacity: 120,
    registered: 45,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    featured: false,
    organizer: {
      name: "Rajesh Kumar (Batch 2010)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    tags: ["Finance", "Investment", "Planning"]
  }
]

const eventTypes = [
  { id: 'all', name: 'All Events', count: mockEvents.length },
  { id: 'networking', name: 'Networking', count: mockEvents.filter(e => e.type === 'networking').length },
  { id: 'workshop', name: 'Workshops', count: mockEvents.filter(e => e.type === 'workshop').length },
  { id: 'seminar', name: 'Seminars', count: mockEvents.filter(e => e.type === 'seminar').length },
  { id: 'sports', name: 'Sports', count: mockEvents.filter(e => e.type === 'sports').length }
]

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = events

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredEvents(filtered)
  }, [selectedType, searchQuery, events])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      networking: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      seminar: 'bg-purple-100 text-purple-800',
      sports: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const featuredEvents = filteredEvents.filter(event => event.featured)
  const regularEvents = filteredEvents.filter(event => !event.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pt-24 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">PIEMR Alumni Events</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Connect. Learn. <span className="text-golden-400">Grow.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join exclusive events designed for PIEMR alumni. Network with industry leaders, 
              enhance your skills, and give back to the community that shaped your future.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-golden-400 rounded-lg mb-4 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">500+</h3>
                <p className="text-white/80 text-sm">Active Alumni Members</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-golden-400 rounded-lg mb-4 mx-auto">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">25+</h3>
                <p className="text-white/80 text-sm">Events This Year</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-golden-400 rounded-lg mb-4 mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">4.8/5</h3>
                <p className="text-white/80 text-sm">Average Rating</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary bg-golden-500 hover:bg-golden-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Browse All Events
              </button>
              <button className="btn-secondary border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Create Event
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-golden-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
          </svg>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="py-16">
        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Event Type Filters */}
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.name} ({type.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Events</h2>
              <p className="text-gray-600">Don't miss these highlighted events</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-8"
            >
              {featuredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <Star className="w-4 h-4 text-golden-500 fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={event.organizer.avatar}
                          alt={event.organizer.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">{event.organizer.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-primary-600">
                          {event.price}
                        </span>
                        <button className="btn-primary">
                          Register
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Events */}
      <section className="py-12">
        <div className="container-custom">
          {regularEvents.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                <p className="text-gray-600">More exciting events to join</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {regularEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {event.registered}/{event.capacity} registered
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary-600">
                          {event.price}
                        </span>
                        <button className="btn-secondary text-sm">
                          Register
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedType !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Check back soon for upcoming events"}
              </p>
              {(searchQuery || selectedType !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedType('all')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}