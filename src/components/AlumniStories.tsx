"use client";
import { Award, Briefcase, MapPin, Quote, ChevronRight, Search, ArrowUp } from 'lucide-react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import supabaseClient from "../../src/services/supabaseClient";

const AlumniStories = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Fetch from Supabase
  const [featuredAlumni, setFeaturedAlumni] = useState<any[]>([]);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAlumni();
    fetchStories();
    // eslint-disable-next-line
  }, []);

  async function fetchAlumni() {
    const { data, error } = await supabaseClient
      .from("featured_alumni")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setFeaturedAlumni(data || []);
  }

  async function fetchStories() {
    const { data, error } = await supabaseClient
      .from("success_stories")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setSuccessStories(data || []);
  }

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

  // Filtered data for search
  const filteredAlumni = featuredAlumni.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase()) ||
    (a.quote || "").toLowerCase().includes(search.toLowerCase())
  );
  const filteredStories = successStories.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    s.company.toLowerCase().includes(search.toLowerCase()) ||
    (s.location || "").toLowerCase().includes(search.toLowerCase())
  );

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
          className="text-3xl font-bold text-center mb-12 text-maroon-700 dark:text-white"
        >
          Distinguished BSIT Graduates
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAlumni.map((alumni, index) => (
            <motion.div 
              key={alumni.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={alumni.image_url}
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
                  {alumni.quote && (
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-maroon-600 dark:text-maroon-500 mb-2" />
                      <p className="text-gray-600 dark:text-gray-300 italic">{alumni.quote}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    {(alumni.achievements || []).map((achievement: string, idx: number) => (
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
            {filteredStories.map((story, index) => (
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
          <h2 className="text-3xl font-bold mb-4 text-white">Share Your IT Journey</h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
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