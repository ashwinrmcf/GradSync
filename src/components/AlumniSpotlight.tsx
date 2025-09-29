'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

export default function AlumniSpotlight() {
  const alumni = [
    {
      name: 'Priya Sharma',
      batch: '2020',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'San Francisco, USA',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      story: 'From PIEMR to Silicon Valley - leading AI initiatives at Google and mentoring 50+ students.',
      achievements: ['AI/ML Expert', 'Tech Lead', 'Mentor'],
      linkedin: '#',
    },
    {
      name: 'Rahul Patel',
      batch: '2019',
      company: 'Microsoft',
      position: 'Product Manager',
      location: 'Seattle, USA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      story: 'Building products used by millions worldwide and driving innovation in cloud computing.',
      achievements: ['Product Strategy', 'Team Leadership', 'Innovation'],
      linkedin: '#',
    },
    {
      name: 'Anita Desai',
      batch: '2018',
      company: 'Goldman Sachs',
      position: 'Vice President',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      story: 'Leading fintech innovations and managing multi-million dollar portfolios in investment banking.',
      achievements: ['Finance Expert', 'VP Level', 'Global Impact'],
      linkedin: '#',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Alumni Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet some of our outstanding graduates who are making their mark across the globe
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {alumni.map((person, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Batch {person.batch}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {person.name}
                  </h3>
                  <p className="text-primary-500 font-semibold">
                    {person.position}
                  </p>
                  <p className="text-golden-600 font-medium">
                    {person.company}
                  </p>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{person.location}</span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {person.story}
                </p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {person.achievements.map((achievement, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>

                {/* Connect Button */}
                <button className="w-full btn-primary flex items-center justify-center space-x-2 group">
                  <span>Connect</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Alumni */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="btn-secondary">
            View All Alumni Stories
          </button>
        </motion.div>
      </div>
    </section>
  )
}
