"use client";
import { Award, BookOpen, GraduationCap, Briefcase, Calendar, MapPin, ArrowUp, Code, Cpu, Database } from 'lucide-react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const DeanProfile = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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

  const achievements = [
    {
      year: "2021",
      title: "Appointed as CIT Dean",
      description: "Led the digital transformation of the college's curriculum and facilities"
    },
    {
      year: "2019",
      title: "Outstanding Educator in IT Award",
      description: "Recognized by the Philippine Computing Society for innovative teaching methods"
    },
    {
      year: "2016",
      title: "Research Excellence Award",
      description: "For groundbreaking work in artificial intelligence applications"
    }
  ];

  const initiatives = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Industry-Aligned Curriculum",
      description: "Updated programs to include emerging technologies like AI, blockchain, and cloud computing"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Tech Infrastructure Upgrade",
      description: "Modernized computer labs with high-performance computing equipment"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Industry Partnerships",
      description: "Established collaborations with top tech companies for internships and research"
    }
  ];

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

      {/* Split Header Section - Horizontal Layout */}
      <div className="relative flex flex-col md:flex-row">
        {/* Image Section - Left Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full md:w-1/2 h-[400px] md:h-[500px]"
        >
          <img
            src="/Jun1.jpg"
            alt="Dr. Junry T. Valenzuela"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Background Section for Name - Right Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-800 dark:bg-white text-gray-900 dark:text-white py-12 px-4 md:px-8 lg:px-16 flex items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white dark:text-white">
                Junry T. Valenzuela, MIT
              </h1>
              <p className="text-xl md:text-2xl text-white dark:text-white mb-2">Dean, College of Information Technology</p>
              <p className="text-lg text-maroon-500 dark:text-maroon-500 max-w-2xl">
                Leading CIT's mission to produce world-class IT professionals since 2021
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Ph.D. in Computer Science</p>
                    <p className="text-gray-600 dark:text-gray-400">Stanford University, 2015</p>
                    <p className="text-gray-600 dark:text-gray-400">Specialization: Artificial Intelligence</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">M.S. in Information Systems</p>
                    <p className="text-gray-600 dark:text-gray-400">University of the Philippines, 2008</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">B.S. in Computer Science</p>
                    <p className="text-gray-600 dark:text-gray-400">Ateneo de Manila University</p>
                    <p className="text-gray-600 dark:text-gray-400">Summa Cum Laude, 2005</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Previous Positions</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Briefcase className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Department Chair</p>
                    <p className="text-gray-600 dark:text-gray-400">Computer Science Department</p>
                    <p className="text-gray-600 dark:text-gray-400">2018-2021</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Briefcase className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Senior Software Architect</p>
                    <p className="text-gray-600 dark:text-gray-400">Globe Telecom</p>
                    <p className="text-gray-600 dark:text-gray-400">2010-2015</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Briefcase className="h-5 w-5 text-maroon-600 dark:text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Research Scientist</p>
                    <p className="text-gray-600 dark:text-gray-400">IBM Research Philippines</p>
                    <p className="text-gray-600 dark:text-gray-400">2008-2010</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Center Column - Main Content */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Vision for CIT</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                As Dean of the College of Information Technology, my mission is to create an 
                environment where students gain not just technical skills but also the innovative 
                mindset needed to thrive in the digital economy. We focus on four strategic areas: 
                cutting-edge curriculum, industry collaboration, research excellence, and student 
                entrepreneurship in technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initiatives.map((initiative, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="text-center"
                  >
                    <div className="bg-maroon-600 dark:bg-maroon-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                      {initiative.icon}
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{initiative.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{initiative.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Achievements</h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-maroon-600 dark:bg-maroon-700 p-2 rounded-full text-white mr-4">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-gray-500 dark:text-gray-400">{achievement.year}</span>
                      </div>
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{achievement.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-maroon-50 dark:bg-maroon-900/30 p-8 rounded-lg shadow-lg dark:shadow-gray-900 border border-maroon-200 dark:border-maroon-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-maroon-900 dark:text-white">Connect with the Dean</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-maroon-600 dark:text-white mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-maroon-900 dark:text-white">Office Location</p>
                    <p className="text-maroon-700 dark:text-white">Dean's Office, 3rd Floor</p>
                    <p className="text-maroon-700 dark:text-white">CIT Building</p>
                    <p className="text-maroon-700 dark:text-white">Open: Mon-Fri, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div>
                  <p className="text-maroon-800 dark:text-white mb-4">
                    For student consultations, research collaborations, or industry partnership 
                    inquiries, please schedule an appointment through the Dean's Office secretary.
                  </p>
                  <p className="text-maroon-700 dark:text-maroon-500 font-medium">
                    Email: dean.cit@university.edu<br />
                    Phone: (02) 1234-5678 local 123
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeanProfile;