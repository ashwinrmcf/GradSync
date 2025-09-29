'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Briefcase, 
  Award,
  TrendingUp, 
  Calendar,
  MessageCircle,
  Search,
  Bell,
  MapPin,
  Building,
  ExternalLink,
  GraduationCap
} from 'lucide-react'
import { useAuth, mockAlumni } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export default function StudentDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Completed',
      value: '12',
      change: '+2 this semester',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50'
    },
    {
      icon: Users,
      label: 'Alumni Connections',
      value: '28',
      change: '+5 this month',
      color: 'text-golden-500',
      bgColor: 'bg-golden-50'
    },
    {
      icon: Briefcase,
      label: 'Internship Applications',
      value: '6',
      change: '2 pending',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '4',
      change: '1 new badge',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  const opportunities = [
    {
      type: 'internship',
      title: 'Software Development Intern',
      company: 'Google',
      location: 'Bangalore, India',
      duration: '3 months',
      stipend: '₹50,000/month',
      deadline: 'Dec 30, 2024',
      referredBy: 'Priya Sharma'
    },
    {
      type: 'internship',
      title: 'Product Management Intern',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      duration: '6 months',
      stipend: '₹45,000/month',
      deadline: 'Jan 15, 2025',
      referredBy: 'Rahul Patel'
    },
    {
      type: 'job',
      title: 'Graduate Trainee Program',
      company: 'TCS',
      location: 'Multiple Cities',
      duration: 'Full-time',
      stipend: '₹3.5 LPA',
      deadline: 'Feb 1, 2025',
      referredBy: null
    }
  ]

  const mentors = [
    {
      name: 'Priya Sharma',
      company: 'Google',
      position: 'Senior Software Engineer',
      expertise: ['Software Development', 'System Design', 'Career Guidance'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      sessions: 45
    },
    {
      name: 'Rahul Patel',
      company: 'Microsoft',
      position: 'Product Manager',
      expertise: ['Product Management', 'Strategy', 'Leadership'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      sessions: 32
    }
  ]

  const upcomingEvents = [
    {
      title: 'Career Guidance Workshop',
      date: 'Dec 18, 2024',
      time: '4:00 PM',
      location: 'Virtual Event',
      speaker: 'Anita Desai, VP at Goldman Sachs',
      attendees: 150
    },
    {
      title: 'Resume Building Session',
      date: 'Dec 22, 2024',
      time: '3:00 PM',
      location: 'PIEMR Campus',
      speaker: 'Multiple Alumni',
      attendees: 80
    }
  ]

  const recentActivities = [
    {
      type: 'application',
      message: 'Applied for Software Development Intern at Google',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'connection',
      message: 'Connected with Priya Sharma (Google)',
      time: '1 day ago',
      status: 'success'
    },
    {
      type: 'event',
      message: 'Registered for Career Guidance Workshop',
      time: '2 days ago',
      status: 'success'
    },
    {
      type: 'mentor',
      message: 'Scheduled mentorship session with Rahul Patel',
      time: '3 days ago',
      status: 'scheduled'
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
                    Welcome, {user?.firstName}!
                  </h1>
                  <p className="text-primary-100">
                    {user?.branch} • Batch of {user?.batchYear} • Final Year
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                  <Bell size={20} />
                </button>
                <button className="bg-white text-primary-500 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
                  Update Profile
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
                    <Search className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600">Find Opportunities</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-golden-300 hover:bg-golden-50 transition-colors group">
                    <Users className="w-8 h-8 text-gray-400 group-hover:text-golden-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-golden-600">Connect Alumni</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group">
                    <GraduationCap className="w-8 h-8 text-gray-400 group-hover:text-green-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">Find Mentor</span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                    <Calendar className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Join Events</span>
                  </button>
                </div>
              </motion.div>

              {/* Opportunities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Latest Opportunities</h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{opportunity.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              opportunity.type === 'internship' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {opportunity.type === 'internship' ? 'Internship' : 'Full-time'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Building size={14} className="mr-1" />
                              {opportunity.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {opportunity.location}
                            </div>
                            <div>Duration: {opportunity.duration}</div>
                            <div>Stipend: {opportunity.stipend}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              Deadline: {opportunity.deadline}
                              {opportunity.referredBy && (
                                <span className="ml-2 text-primary-600">
                                  • Referred by {opportunity.referredBy}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="btn-primary text-sm px-4 py-2 flex items-center space-x-1 ml-4">
                          <span>Apply</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100' :
                        activity.status === 'pending' ? 'bg-yellow-100' :
                        activity.status === 'scheduled' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {activity.type === 'application' && <Briefcase size={16} className="text-yellow-600" />}
                        {activity.type === 'connection' && <Users size={16} className="text-green-600" />}
                        {activity.type === 'event' && <Calendar size={16} className="text-blue-600" />}
                        {activity.type === 'mentor' && <GraduationCap size={16} className="text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Available Mentors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Available Mentors</h3>
                <div className="space-y-4">
                  {mentors.map((mentor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm">{mentor.name}</h4>
                          <p className="text-xs text-gray-600">{mentor.position}</p>
                          <p className="text-xs text-gray-600">{mentor.company}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span>⭐ {mentor.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{mentor.sessions} sessions</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {mentor.expertise.slice(0, 2).map((skill, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-3 btn-primary text-sm py-2">
                        Book Session
                      </button>
                    </div>
                  ))}
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
                  View All Mentors
                </button>
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
                        <div>Speaker: {event.speaker}</div>
                        <div>{event.attendees} registered</div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-xs font-medium mt-2">
                        Register Now
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Career Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="card p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Career Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Completion</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>✅ Basic Information</div>
                    <div>✅ Academic Details</div>
                    <div>⏳ Skills & Projects</div>
                    <div>⏳ Career Preferences</div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Complete Profile
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
