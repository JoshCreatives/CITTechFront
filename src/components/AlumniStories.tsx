"use client";
import { Award, Briefcase, MapPin, Quote, ChevronRight, Search, ArrowUp } from 'lucide-react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

const AlumniStories = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  const featuredAlumni = [
    {
      name: "Jhunrey Obligado",
      batch: "2015",
      role: "Senior Software Architect",
      company: "TechVision Solutions",
      image: "/p38.jpg",
      quote: "The BSIT program gave me the technical foundation and problem-solving skills needed to design complex software systems.",
      achievements: [
        "Microsoft Certified Solutions Expert",
        "Tech Innovation Award 2022",
        "Speaker at DevCon International"
      ]
    },
    {
      name: "Nessie Navarro",
      batch: "2012",
      role: "Cybersecurity Director",
      company: "Global Systems Inc.",
      image: "/p37.jpg",
      quote: "The cybersecurity courses in BSIT prepared me for real-world challenges in protecting enterprise systems.",
      achievements: [
        "Certified Information Systems Security Professional",
        "Industry Leadership Award",
        "Women in Tech Honoree"
      ]
    }
  ];

  const successStories = [
    {
      name: "Relvin",
      batch: "2018",
      role: "Cloud Solutions Engineer",
      company: "Techlab Unite",
      image: "/p35.jpg",
      location: "Siargao Island"
    },
    {
      name: "Rowel Casa",
      batch: "2019",
      role: "Data Science Lead",
      company: "Microsoft",
      image: "/p67.jpg",
      location: "SiarGao Island"
    },
    {
      name: "Junry Valenzuela",
      batch: "2017",
      role: "DevOps Specialist",
      company: "Techlab Unite",
      image: "/p68.jpg",
      location: "Siargao Island"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-maroon-600 text-white p-3 rounded-full shadow-lg hover:bg-maroon-700 transition-colors z-40"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[500px]"
      >
        <img
          src="/school2.jpg"
          alt="IT Alumni Stories"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/75 dark:from-gray-900/90 dark:to-gray-900/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white mb-6">BSIT Alumni Success Stories</h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover how our Bachelor of Science in Information Technology graduates 
                are excelling in the tech industry worldwide.
              </p>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search IT alumni stories..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800/70 dark:bg-gray-700/80 border border-gray-600 dark:border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Alumni */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-maroon-700 dark:text-maroon-500"
        >
          Distinguished BSIT Graduates
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredAlumni.map((alumni, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-maroon-700 text-white px-3 py-1 rounded-full text-sm">
                      BSIT {alumni.batch}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{alumni.name}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <Briefcase className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    <span>{alumni.role} at {alumni.company}</span>
                  </div>
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-maroon-600 dark:text-maroon-500 mb-2" />
                    <p className="text-gray-600 dark:text-gray-300 italic">{alumni.quote}</p>
                  </div>
                  <div className="space-y-2">
                    {alumni.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center">
                        <Award className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-maroon-700 dark:text-white"
          >
            IT Career Paths
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-64">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-maroon-700 text-white px-3 py-1 rounded-full text-sm">
                      BSIT {story.batch}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{story.name}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Briefcase className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    <span>{story.role} at {story.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    <span>{story.location}</span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center text-maroon-600 dark:text-white hover:text-maroon-800 dark:hover:text-maroon-300 font-medium transition-colors"
                  >
                    Read Full Story
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Your Story */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-maroon-800 rounded-lg shadow-xl text-white p-8 text-center border border-maroon-700"
        >
          <h2 className="text-3xl font-bold mb-4 text-maroon-300">Share Your IT Journey</h2>
          <p className="text-lg text-maroon-200 mb-8 max-w-2xl mx-auto">
            Are you a BSIT graduate? Share your career progression and inspire current students 
            by showcasing the diverse opportunities in the IT field.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-maroon-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-700 transition-colors"
          >
            Submit Your Story
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniStories;