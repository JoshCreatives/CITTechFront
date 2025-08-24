"use client";
import { Clock, Award, Star, BookOpen, Users, Building2, ArrowUp, Code, Cpu, Database, Network } from 'lucide-react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const CITHistory = () => {
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

  const milestones = [
    {
      year: "2005",
      title: "Establishment of CIT",
      description: "The College of Information Technology was founded in 2005 with a vision to provide cutting-edge technical education in the region. Starting with just 2 faculty members and 50 students, we offered our first degree program in Computer Science.",
      image: "/p29.jpg"
    },
    {
      year: "2012",
      title: "Curriculum Modernization",
      description: "Implemented a complete curriculum overhaul to include emerging technologies like web development, networking, and database systems. Established our first computer laboratories with modern equipment.",
      image: "/p30.jpg"
    },
    {
      year: "2018",
      title: "Industry Partnerships",
      description: "Forged strategic partnerships with leading tech companies including IBM, Microsoft, and local IT firms to provide internship opportunities and industry-aligned training programs for our students.",
      image: "/p21.jpg"
    },
    {
      year: "2023",
      title: "Center of Excellence",
      description: "Recognized by the Commission on Higher Education as a Center of Excellence in Information Technology Education. Launched our graduate programs in Data Science and Cybersecurity.",
      image: "/p44.jpg"
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Accredited Programs",
      description: "All CIT programs accredited by PACUCOA"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Alumni Network",
      description: "Over 2,000 graduates working in top tech companies"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Tech Competitions",
      description: "Multiple national hackathon champions"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Industry Links",
      description: "Partnerships with 50+ tech companies"
    }
  ];

  const leaders = [
    {
      name: "Dr. Maria Cristina Santos",
      role: "Founding Dean (2005-2015)",
      image: "/p68.jpg",
      contribution: "Established the foundational curriculum and secured initial industry partnerships that shaped CIT's direction."
    },
    {
      name: "Dr. Junry Valenzuela",
      role: "Current Dean (2015-Present)",
      image: "/p68.jpg",
      contribution: "Spearheaded the digital transformation of CIT, introducing cloud computing, AI, and data science programs."
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

      {/* Hero Section with 70/30 Split */}
      <div className="relative h-[500px]">
        {/* Background Image (70% width) */}
        <div className="absolute left-0 top-0 h-full w-[70%]">
          <img
            src="/p16.jpg"
            alt="CIT Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/75 flex items-center">
            <div className="max-w-3xl px-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  <span className="text-white bg-clip-text text-transparent">
                    Our Digital Evolution
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200">
                  Since 2005, the College of Information Technology has been shaping the future of tech education.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* School Logo (30% width) */}
        <div className="absolute right-0 top-0 h-full w-[30%] bg-maroon-700 dark:bg-maroon-700 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="max-w-[400px]"
          >
            <img 
              src="/HeroAko.png" 
              alt="CIT Logo" 
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
        >
          Technological Milestones
        </motion.h2>
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-maroon-600 dark:bg-maroon-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                      {milestone.year}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{milestone.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaders Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
          >
            Visionary Leaders
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{leader.name}</h3>
                    <div className="text-maroon-600 dark:text-maroon-500 font-semibold mb-4">{leader.role}</div>
                    <p className="text-gray-700 dark:text-gray-300">{leader.contribution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-maroon-50 dark:bg-maroon-900/30 text-gray-900 dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
          >
            Our Proud Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={loaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center"
              >
                <div className="bg-maroon-600 dark:bg-maroon-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{achievement.title}</h3>
                <p className="text-maroon-700 dark:text-gray-200">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-maroon-600 dark:bg-maroon-700 p-4 rounded-full w-16 h-16 flex items-center justify-center text-white mb-6">
                <Cpu className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Building the Digital Future</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                As we look ahead, CIT remains committed to innovation in technology education. Our roadmap includes establishing specialized labs in AI and IoT, expanding our industry collaboration network, and developing new programs in emerging fields like quantum computing and blockchain technology. We continue to invest in faculty development and state-of-the-art facilities to ensure our students graduate with the skills needed to thrive in the rapidly evolving digital landscape.
              </p>
              <div className="flex items-center text-maroon-600 dark:text-maroon-500">
                <Clock className="h-5 w-5 mr-2" />
                <span>18 Years of Technological Leadership</span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src="/p7.jpg"
                alt="CIT Future"
                className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CITHistory;