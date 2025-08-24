import React, { useEffect, useState } from 'react';
import { Target, Eye, Heart, Users, Globe, Lightbulb, Award, TrendingUp, BookOpen, Shield, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We foster creativity and embrace cutting-edge technologies to solve tomorrow's challenges."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in education, research, and service to our community."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and partnerships to achieve extraordinary results."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold ethical principles and transparency in all our academic and professional endeavors."
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "We prepare students to thrive in an interconnected world through diverse experiences."
  },
  {
    icon: Heart,
    title: "Student-Centered",
    description: "We prioritize student success and create supportive environments for learning and growth."
  }
];

const strategicGoals = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Maintain top-tier academic programs that prepare students for successful careers in technology.",
    metrics: ["95% job placement rate", "Top 10 national ranking", "Industry-aligned curriculum"]
  },
  {
    icon: Lightbulb,
    title: "Research Innovation",
    description: "Advance knowledge through groundbreaking research in emerging technology fields.",
    metrics: ["$5M+ in research grants", "50+ published papers annually", "10+ industry partnerships"]
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Strengthen relationships with industry, government, and local communities.",
    metrics: ["25+ industry partners", "500+ internship placements", "Community outreach programs"]
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Expand our impact while maintaining quality and financial sustainability.",
    metrics: ["2,500+ enrolled students", "150+ expert faculty", "State-of-the-art facilities"]
  }
];

export default function MissionVision() {
  const [showScroll, setShowScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show scroll button when user scrolls down
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  // Set loaded state for animations
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 bg-maroon-600 dark:bg-maroon-500 text-white p-3 rounded-full shadow-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors z-40"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-maroon-600 dark:text-maroon-500">Mission</span> & Vision
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Guiding principles that drive our commitment to excellence in technology education, 
            research, and service to our community and the world.
          </p>
        </motion.div>

        {/* Mission and Vision Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Mission */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-maroon-600 dark:bg-maroon-600 rounded-full flex items-center justify-center mr-4">
                <Target className="h-8 w-8 text-white dark:text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              To provide exceptional education in information technology, fostering innovation, critical thinking, 
              and ethical leadership. We prepare students to excel in their careers while contributing to the 
              advancement of technology for the betterment of society.
            </p>
            <div className="bg-maroon-50 dark:bg-maroon-900/20 rounded-lg p-4 border border-maroon-200 dark:border-maroon-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">We Achieve This By:</h3>
              <ul className="space-y-2 text-gray-900 dark:text-white">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  Delivering cutting-edge curriculum aligned with industry needs
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  Conducting impactful research in emerging technologies
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  Building strong partnerships with industry and community
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  Promoting diversity, inclusion, and ethical practices
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-maroon-600 dark:bg-maroon-600 rounded-full flex items-center justify-center mr-4">
                <Eye className="h-8 w-8 text-white dark:text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              To be a globally recognized leader in technology education and research, known for producing 
              innovative graduates who shape the future of information technology and make meaningful 
              contributions to society.
            </p>
            <div className="bg-maroon-50 dark:bg-maroon-900/20 rounded-lg p-4 border border-maroon-200 dark:border-maroon-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">By 2030, We Will Be:</h3>
              <ul className="space-y-2 text-gray-900 dark:text-white">
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  Among the top 5 IT colleges nationally
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  A hub for groundbreaking technology research
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  The preferred partner for leading tech companies
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 dark:text-white mr-2">•</span>
                  A model for inclusive and sustainable education
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The fundamental principles that guide our decisions, actions, and relationships 
              within our academic community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-maroon-500 to-maroon-600 dark:from-maroon-600 dark:to-maroon-700 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Strategic Goals */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Strategic Goals</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our roadmap for achieving excellence and making a lasting impact in technology education.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {strategicGoals.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-maroon-500 to-maroon-600 dark:from-maroon-600 dark:to-maroon-700 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{goal.description}</p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Metrics:</h4>
                    <div className="space-y-2">
                      {goal.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-maroon-500 dark:bg-maroon-400 rounded-full mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Leadership Message */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-2xl p-8 text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">A Message from Our Leadership</h2>
            <blockquote className="text-xl italic mb-6 leading-relaxed">
              "At CIT, we believe that technology has the power to transform lives and solve the world's 
              most pressing challenges. Our mission is to nurture the next generation of technology leaders 
              who will drive innovation, promote ethical practices, and create a better future for all."
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Dr. Sarah Chen"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <div className="font-semibold text-lg">Dr. Sarah Chen</div>
                <div className="text-maroon-100">Dean, College of Information Technology</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a community dedicated to excellence, innovation, and making a positive impact 
            through technology education and research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-maroon-600 dark:bg-maroon-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-maroon-700 dark:hover:bg-maroon-800 transition-colors duration-200 shadow-lg"
            >
              Apply Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-maroon-600 dark:border-maroon-500 text-maroon-600 dark:text-maroon-400 px-8 py-3 rounded-lg font-semibold hover:bg-maroon-50 dark:hover:bg-maroon-900/20 transition-all duration-200"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}