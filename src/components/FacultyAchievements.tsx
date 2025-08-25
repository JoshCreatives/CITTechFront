import React from 'react';
import { Award, BookOpen, Users, Trophy, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Achievement {
  id: number;
  facultyName: string;
  title: string;
  category: 'Research' | 'Teaching' | 'Service' | 'Industry' | 'Publication';
  description: string;
  date: string;
  details: string[];
  image: string;
}

const achievements: Achievement[] = [
    {
    id: 1,
    facultyName: "Junry T. Valenzuela, MIT",
    title: "IEEE Fellow Recognition",
    category: "Research",
    description: "Elevated to IEEE Fellow for outstanding contributions to artificial intelligence and machine learning research.",
    date: "2024",
    details: [
      "Published 50+ papers in top-tier AI conferences",
      "Cited over 3,000 times in academic literature",
      "Led breakthrough research in neural network optimization",
      "Mentored 15 PhD students to completion"
    ],
    image: "/p68.jpg"
  },
  {
    id: 2,
    facultyName: "Relvin Gloria",
    title: "Outstanding Teaching Excellence Award",
    category: "Teaching",
    description: "Recognized for innovative teaching methods and exceptional student engagement in database systems courses.",
    date: "2024",
    details: [
      "Developed interactive database simulation platform",
      "Achieved 98% student satisfaction rating",
      "Implemented project-based learning curriculum",
      "Mentored students in 12 successful industry internships"
    ],
    image: "/p35.jpg"
  },
  {
    id: 3,
    facultyName: "Arlou Mataro",
    title: "NSF CAREER Award",
    category: "Research",
    description: "Received prestigious NSF CAREER Award for research in quantum cryptography and secure communications.",
    date: "2023",
    details: [
      "$500,000 grant for 5-year research program",
      "Focus on post-quantum cryptographic protocols",
      "Collaboration with national laboratories",
      "Training next generation of cybersecurity experts"
    ],
    image: "/SirAr.jpg"
  },
  {
    id: 4,
    facultyName: "May Centro Tejada",
    title: "Industry Partnership Excellence",
    category: "Industry",
    description: "Established successful partnerships with major tech companies for student internship and job placement programs.",
    date: "2024",
    details: [
      "Partnerships with Google, Microsoft, and Amazon",
      "95% job placement rate for program graduates",
      "Created industry-sponsored capstone projects",
      "Facilitated $2M in student scholarships"
    ],
    image: "/maammay.jpg"
  },
  {
    id: 5,
    facultyName: "Rowel C. Salamingan",
    title: "Best Paper Award - Data Science Conference",
    category: "Publication",
    description: "Received best paper award at International Conference on Data Science for groundbreaking work in predictive analytics.",
    date: "2023",
    details: [
      "Novel approach to time-series forecasting",
      "Improved prediction accuracy by 35%",
      "Open-sourced research tools and datasets",
      "Keynote speaker at 3 international conferences"
    ],
    image: "/p67.jpg"
  },
  {
    id: 6,
    facultyName: "Daniel Estepualar",
    title: "Community Service Leadership Award",
    category: "Service",
    description: "Recognized for exceptional service to the academic community and professional organizations.",
    date: "2024",
    details: [
      "Chair of ACM Education Council",
      "Editorial board member of 3 journals",
      "Organized 5 international workshops",
      "Volunteer IT support for local nonprofits"
    ],
    image: "/nodp.jpg"
  }
];

const categoryColors = {
  Research: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
  Teaching: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200",
  Service: "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200",
  Industry: "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200",
  Publication: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
};

const categoryIcons = {
  Research: Award,
  Teaching: Users,
  Service: Star,
  Industry: Trophy,
  Publication: BookOpen
};

export default function FacultyAchievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loaded, setLoaded] = useState(false);
  const categories = ['All', 'Research', 'Teaching', 'Service', 'Industry', 'Publication'];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Enhanced with better gradient and shadow */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 bg-gradient-to-r from-maroon-900 via-maroon-600 to-maroon-600 dark:from-maroon-800 dark:via-gray-900 dark:to-gray-900 py-12 px-6 rounded-xl shadow-xl dark:shadow-gray-800/20"
        >
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-4"
          >
            Faculty Achievements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-white dark:text-gray-300 max-w-3xl mx-auto"
          >
            Celebrating the outstanding accomplishments of our faculty members in research, teaching, 
            service, and industry collaboration.
          </motion.p>
        </motion.div>

        {/* Category Filter - Improved button styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-maroon-600 dark:bg-maroon-700 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-maroon-600 hover:text-white shadow-md border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid - Enhanced card styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = categoryIcons[achievement.category as keyof typeof categoryIcons];
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={loaded ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.15, 
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] 
                  } 
                } : {}}
                whileHover={{ 
                  y: -5,
                  scale: 1.01,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-800/30 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-maroon-500 dark:hover:border-maroon-500 transition-all duration-300"
              >
                <div className="p-0 h-full flex flex-col">
                  {/* Card Header - Improved dark mode */}
                  <motion.div 
                    whileHover={{ scale: 1.005 }}
                    className="flex items-center px-6 py-5 rounded-t-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-900"
                  >
                    <motion.img
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      src={achievement.image}
                      alt={achievement.facultyName}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-gray-300 dark:border-gray-600"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      <h3 className="text-lg font-semibold text-white dark:text-white">
                        {achievement.facultyName}
                      </h3>
                      <p className="font-medium text-gray-300 dark:text-gray-300">
                        {achievement.title}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-400">
                        {achievement.category}
                      </p>
                    </motion.div>
                  </motion.div>
                  
                  {/* Card Body - Enhanced dark mode contrast */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="p-6 flex-grow flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        {achievement.date}
                      </motion.div>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          categoryColors[achievement.category as keyof typeof categoryColors]
                        }`}
                      >
                        <IconComponent className="h-4 w-4 mr-1" />
                        {achievement.category}
                      </motion.span>
                    </div>

                    <motion.h4 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.55 }}
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                      {achievement.title}
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                      className="text-gray-600 dark:text-gray-300 mb-4"
                    >
                      {achievement.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.65 }}
                      className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h5>
                      <ul className="space-y-2">
                        {achievement.details.map((detail, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.7 + i * 0.05 }}
                            className="text-sm text-gray-700 dark:text-gray-200 flex items-start"
                          >
                            <span className="text-maroon-600 dark:text-maroon-500 mr-2">•</span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action - Enhanced gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-16 bg-gradient-to-r from-maroon-600 via-maroon-700 to-maroon-800 dark:from-maroon-800 dark:via-maroon-900 dark:to-gray-900 rounded-xl p-8 text-center text-white shadow-xl dark:shadow-gray-800/30"
        >
          <motion.h2 
            whileHover={{ scale: 1.02 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
          >
            Join Our Distinguished Faculty
          </motion.h2>
          <motion.p 
            whileHover={{ scale: 1.01 }}
            className="text-white/90 dark:text-white/80 mb-6 max-w-2xl mx-auto text-lg"
          >
            Are you a passionate educator and researcher? Explore opportunities to join our award-winning faculty 
            and contribute to the future of technology education.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-maroon-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 border border-gray-300 shadow-md"
            >
              View Open Positions
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold bg-maroon-700 hover:bg-maroon-600 transition-all duration-200 shadow-md"
            >
              Faculty Resources
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}