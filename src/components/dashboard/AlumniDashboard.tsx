'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Award,
  Plus,
  Search,
  Bell,
  MapPin,
  Building,
  ExternalLink
} from 'lucide-react'
import { useAuth, mockAlumni } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export default function AlumniDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      icon: Users,
      label: 'Network Connections',
      value: '156',
      change: '+12 this month',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50'
    },
    {
      icon: Briefcase,
      label: 'Job Referrals',
      value: '8',
      change: '+3 this month',
      color: 'text-golden-500',
      bgColor: 'bg-golden-50'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      value: '24',
      change: '5 unread',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Calendar,
      label: 'Events Attended',
      value: '12',
      change: '2 upcoming',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  const recentActivities = [
    {
      type: 'connection',
      message: 'Priya Sharma accepted your connection request',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      type: 'job',
      message: 'New job posting: Senior Developer at Microsoft',
      time: '4 hours ago',
      avatar: null
    },
    {
      type: 'event',
      message: 'PIEMR Alumni Meetup - Bangalore registered',
      time: '1 day ago',
      avatar: null
    },
    {
      type: 'message',
      message: 'Rahul Patel sent you a message',
      time: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const upcomingEvents = [
    {
      title: 'PIEMR Alumni Meetup - Bangalore',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      location: 'Bangalore, India',
      attendees: 45
    },
    {
      title: 'Tech Talk: AI in Healthcare',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      location: 'Virtual Event',
      attendees: 120
    }
  ]

  const jobOpportunities = [
    {
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Bangalore, India',
      type: 'Full-time',
      postedBy: 'Priya Sharma',
      postedTime: '2 days ago'
    },
    {
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      postedBy: 'Rahul Patel',
      postedTime: '5 days ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Welcome Section */}
        <div className="gradient-primary text-white">
          <div className="container-custom py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=1e40af&color=fff`}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                />
                <div>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {user?.firstName}!
                  </h1>
                  <p className="text-primary-100">
                    {user?.position} at {user?.currentCompany} • Batch of {user?.batchYear}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                  <Bell size={20} />
                </button>
                <button className="bg-white text-primary-500 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                  <div className="text-xs text-green-600">{stat.change}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors group">
                    <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">Find Alumni</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-golden-300 hover:bg-golden-50 transition-colors group">
                    <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-golden-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-golden-600">Post Job</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group">
                    <Award className="w-8 h-8 text-gray-400 group-hover:text-green-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">Mentor Student</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                    <Calendar className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Create Event</span>
                  </button>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {activity.avatar ? (
                        <img
                          src={activity.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Briefcase size={16} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Job Opportunities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Latest Job Opportunities</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All Jobs
                  </button>
                </div>
                <div className="space-y-4">
                  {jobOpportunities.map((job, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Building size={14} className="mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {job.location}
                            </div>
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                              {job.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Posted by {job.postedBy} • {job.postedTime}
                          </p>
                        </div>
                        <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-1">
                          <span>Apply</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Profile Completion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Profile Completion</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Strength</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Add your skills and experience to reach 100%
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Complete Profile
                  </button>
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <div>{event.date} at {event.time}</div>
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {event.location}
                        </div>
                        <div>{event.attendees} attending</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
                  View All Events
                </button>
              </motion.div>

              {/* Network Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">People You May Know</h3>
                <div className="space-y-3">
                  {mockAlumni.slice(0, 3).map((alumni, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={alumni.profileImage}
                        alt={`${alumni.firstName} ${alumni.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {alumni.firstName} {alumni.lastName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {alumni.position} at {alumni.currentCompany}
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-xs font-medium">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
                  View More
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
