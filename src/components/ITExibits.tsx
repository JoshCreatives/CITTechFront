import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Eye, Camera, Monitor, Smartphone, Cpu, Shield, Database, Code, Gamepad2, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface Exhibit {
  id: string;
  title: string;
  description: string;
  category: 'Hardware' | 'Software' | 'Research' | 'Innovation' | 'Student Work';
  location: string;
  date: string;
  duration: string;
  visitors: number;
  image: string;
  features: string[];
  technologies: string[];
  presenter: string;
  department: string;
  interactive: boolean;
}

const exhibits: Exhibit[] = [
  // ... exhibits data remains unchanged
];

const categoryColors = {
  "Hardware": "bg-maroon-600 dark:bg-maroon-700 text-white dark:text-white",
  "Software": "bg-maroon-600 dark:bg-maroon-700 text-white dark:text-white",
  "Research": "bg-maroon-600 dark:bg-maroon-700 text-white dark:text-white",
  "Innovation": "bg-maroon-600 dark:bg-maroon-700 text-white dark:text-white",
  "Student Work": "bg-maroon-600 dark:bg-maroon-700 text-white dark:text-white"
};

const categoryIcons = {
  "Hardware": Cpu,
  "Software": Code,
  "Research": Database,
  "Innovation": Monitor,
  "Student Work": Users
};

export default function ITExhibits() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showInteractiveOnly, setShowInteractiveOnly] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  const categories = ['All', 'Hardware', 'Software', 'Research', 'Innovation', 'Student Work'];

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

  const filteredExhibits = exhibits.filter(exhibit => {
    const matchesCategory = selectedCategory === 'All' || exhibit.category === selectedCategory;
    const matchesInteractive = !showInteractiveOnly || exhibit.interactive;
    return matchesCategory && matchesInteractive;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            IT <span className="text-maroon-600 dark:text-maroon-500">Exhibits</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore cutting-edge technology demonstrations, research projects, and innovative solutions 
            developed by our faculty and students. Experience the future of information technology.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">{exhibits.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Active Exhibits</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-maroon-500 mb-2">
              {exhibits.reduce((sum, exhibit) => sum + exhibit.visitors, 0).toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Visitors</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">
              {exhibits.filter(e => e.interactive).length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Interactive Demos</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">5</div>
            <div className="text-gray-600 dark:text-gray-300">Categories</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showInteractiveOnly}
                  onChange={(e) => setShowInteractiveOnly(e.target.checked)}
                  className="mr-2 rounded border-gray-300 dark:border-gray-600 text-maroon-600 focus:ring-maroon-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Interactive exhibits only</span>
              </label>
            </div>

            <div className="text-gray-600 dark:text-gray-400">
              Showing {filteredExhibits.length} of {exhibits.length} exhibits
            </div>
          </div>
        </motion.div>

        {/* Exhibits Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {filteredExhibits.map((exhibit, index) => {
            const IconComponent = categoryIcons[exhibit.category];
            return (
              <motion.div 
                key={exhibit.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[exhibit.category]}`}>
                      <IconComponent className="h-4 w-4 mr-1" />
                      {exhibit.category}
                    </span>
                    {exhibit.interactive && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-900 dark:bg-gray-900 text-white dark:text-white">
                        <Eye className="h-3 w-3 mr-1" />
                        Interactive
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exhibit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exhibit.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {exhibit.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {formatDate(exhibit.date)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {exhibit.visitors.toLocaleString()} visitors
                    </div>
                    <div className="text-sm">
                      <strong>Duration:</strong> {exhibit.duration}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Presenter:</strong> {exhibit.presenter} • {exhibit.department}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {exhibit.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-maroon-600 dark:text-maroon-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                      {exhibit.features.length > 3 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                          +{exhibit.features.length - 3} more features...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exhibit.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredExhibits.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Monitor className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No exhibits found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters to see more exhibits.</p>
          </motion.div>
        )}

        {/* Visit Information - Only keeping the visiting hours info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Visiting Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">General Hours</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Sunday: Closed</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Group Tours</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Available by appointment for groups of 10+</p>
                <p className="text-maroon-600 dark:text-maroon-500 text-sm">Contact: exhibits@cit.edu</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Admission</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Free for students, faculty, and staff</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">$5 for general public</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}