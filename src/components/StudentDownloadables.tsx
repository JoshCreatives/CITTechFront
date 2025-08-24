import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, BookOpen, Users, Shield, Laptop, GraduationCap, Search, Filter, Star, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface Downloadable {
  id: string;
  title: string;
  description: string;
  category: 'Forms' | 'Handbooks' | 'Software' | 'Templates' | 'Guides' | 'Schedules';
  fileType: 'PDF' | 'DOC' | 'XLS' | 'ZIP' | 'EXE';
  fileSize: string;
  lastUpdated: string;
  downloads: number;
  featured: boolean;
  requirements?: string;
}

const downloadables: Downloadable[] = [
  {
    id: "1",
    title: "Student Registration Form",
    description: "Official form for course registration and enrollment. Required for all new and continuing students.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "2.3 MB",
    lastUpdated: "2024-12-15",
    downloads: 1250,
    featured: true
  },
  {
    id: "2",
    title: "CIT Student Handbook 2025",
    description: "Complete guide to policies, procedures, academic requirements, and campus resources.",
    category: "Handbooks",
    fileType: "PDF",
    fileSize: "8.7 MB",
    lastUpdated: "2024-12-01",
    downloads: 2100,
    featured: true
  },
  {
    id: "3",
    title: "Academic Calendar 2025",
    description: "Important dates, deadlines, holidays, and academic milestones for the entire academic year.",
    category: "Schedules",
    fileType: "PDF",
    fileSize: "1.2 MB",
    lastUpdated: "2024-11-30",
    downloads: 1800,
    featured: true
  },
  {
    id: "4",
    title: "Graduation Application Form",
    description: "Application form for students planning to graduate. Must be submitted by specified deadline.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "1.8 MB",
    lastUpdated: "2024-12-10",
    downloads: 450,
    featured: false
  },
  {
    id: "5",
    title: "Microsoft Office 365 Education",
    description: "Free Microsoft Office suite for enrolled students including Word, Excel, PowerPoint, and Teams.",
    category: "Software",
    fileType: "EXE",
    fileSize: "3.2 GB",
    lastUpdated: "2024-12-01",
    downloads: 3200,
    featured: true,
    requirements: "Valid student email address required"
  },
  {
    id: "6",
    title: "Visual Studio Professional",
    description: "Professional development environment for programming courses. Free for students.",
    category: "Software",
    fileType: "EXE",
    fileSize: "2.8 GB",
    lastUpdated: "2024-11-15",
    downloads: 2800,
    featured: false,
    requirements: "Computer Science or Software Engineering students only"
  },
  {
    id: "7",
    title: "Research Paper Template",
    description: "Official template for academic papers, thesis, and research projects with proper formatting.",
    category: "Templates",
    fileType: "DOC",
    fileSize: "245 KB",
    lastUpdated: "2024-10-20",
    downloads: 890,
    featured: false
  },
  {
    id: "8",
    title: "Lab Report Template",
    description: "Standardized template for laboratory reports across all technical courses.",
    category: "Templates",
    fileType: "DOC",
    fileSize: "180 KB",
    lastUpdated: "2024-10-15",
    downloads: 1200,
    featured: false
  },
  {
    id: "9",
    title: "Financial Aid Application Guide",
    description: "Step-by-step guide for applying for financial aid, scholarships, and student loans.",
    category: "Guides",
    fileType: "PDF",
    fileSize: "3.1 MB",
    lastUpdated: "2024-09-30",
    downloads: 750,
    featured: false
  },
  {
    id: "10",
    title: "Campus Network Setup Guide",
    description: "Instructions for connecting personal devices to campus WiFi and network resources.",
    category: "Guides",
    fileType: "PDF",
    fileSize: "1.5 MB",
    lastUpdated: "2024-11-20",
    downloads: 1600,
    featured: false
  },
  {
    id: "11",
    title: "Course Evaluation Form",
    description: "End-of-semester course and instructor evaluation form for student feedback.",
    category: "Forms",
    fileType: "PDF",
    fileSize: "890 KB",
    lastUpdated: "2024-12-05",
    downloads: 980,
    featured: false
  },
  {
    id: "12",
    title: "Internship Application Package",
    description: "Complete package including application form, guidelines, and evaluation criteria.",
    category: "Forms",
    fileType: "ZIP",
    fileSize: "4.2 MB",
    lastUpdated: "2024-11-25",
    downloads: 650,
    featured: false
  },
  {
    id: "13",
    title: "Programming Style Guide",
    description: "Official coding standards and best practices for all programming assignments.",
    category: "Guides",
    fileType: "PDF",
    fileSize: "2.8 MB",
    lastUpdated: "2024-10-30",
    downloads: 1400,
    featured: false
  },
  {
    id: "14",
    title: "Cybersecurity Lab Manual",
    description: "Comprehensive manual for cybersecurity laboratory exercises and procedures.",
    category: "Handbooks",
    fileType: "PDF",
    fileSize: "12.5 MB",
    lastUpdated: "2024-11-10",
    downloads: 520,
    featured: false
  },
  {
    id: "15",
    title: "Final Exam Schedule Spring 2025",
    description: "Complete schedule of final examinations with dates, times, and room assignments.",
    category: "Schedules",
    fileType: "PDF",
    fileSize: "950 KB",
    lastUpdated: "2024-12-12",
    downloads: 2200,
    featured: true
  }
];

const categoryColors = {
  "Forms": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white",
  "Handbooks": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white",
  "Software": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white",
  "Templates": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white",
  "Guides": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white",
  "Schedules": "bg-maroon-100 dark:bg-maroon-700 text-maroon-800 dark:text-white"
};

const categoryIcons = {
  "Forms": FileText,
  "Handbooks": BookOpen,
  "Software": Laptop,
  "Templates": Users,
  "Guides": Shield,
  "Schedules": Calendar
};

const fileTypeColors = {
  "PDF": "bg-red-500",
  "DOC": "bg-blue-500",
  "XLS": "bg-green-500",
  "ZIP": "bg-yellow-500",
  "EXE": "bg-purple-500"
};

export default function StudentDownloadables() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  const categories = ['All', 'Forms', 'Handbooks', 'Software', 'Templates', 'Guides', 'Schedules'];

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

  const filteredDownloadables = downloadables.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || item.featured;
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatFileSize = (size: string) => {
    return size;
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
            Student <span className="text-maroon-600 dark:text-maroon-500">Downloadables</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access essential forms, software, guides, and resources to support your academic journey at CIT.
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
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">{downloadables.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Total Resources</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-maroon-500 mb-2">
              {downloadables.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Downloads</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">
              {downloadables.filter(item => item.featured).length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Featured Items</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">6</div>
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
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="mr-2 rounded border-gray-300 dark:border-gray-600 text-maroon-600 focus:ring-maroon-500"
              />
              <span>Featured only</span>
            </label>

            <div className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
              Showing {filteredDownloadables.length} of {downloadables.length} items
            </div>
          </div>
        </motion.div>

        {/* Featured Downloads */}
        {!showFeaturedOnly && selectedCategory === 'All' && searchTerm === '' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Downloads</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadables.filter(item => item.featured).slice(0, 6).map((item, index) => {
                const IconComponent = categoryIcons[item.category];
                return (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={loaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[item.category]}`}>
                        <IconComponent className="h-4 w-4 mr-1" />
                        {item.category}
                      </span>
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${fileTypeColors[item.fileType]}`}></span>
                        {item.fileType} • {item.fileSize}
                      </div>
                      <span>{item.downloads.toLocaleString()} downloads</span>
                    </div>

                    {item.requirements && (
                      <div className="bg-maroon-50 dark:bg-maroon-900/30 border border-maroon-200 dark:border-maroon-700 rounded-lg p-3 mb-4">
                        <p className="text-maroon-800 dark:text-maroon-200 text-xs">{item.requirements}</p>
                      </div>
                    )}

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-2 bg-maroon-600 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-800 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Downloads */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {showFeaturedOnly ? 'Featured Resources' : 'All Resources'}
          </h2>
          {filteredDownloadables.map((item, index) => {
            const IconComponent = categoryIcons[item.category];
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${categoryColors[item.category]}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        {item.featured && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${fileTypeColors[item.fileType]}`}></span>
                          {item.fileType} • {item.fileSize}
                        </div>
                        <span>{item.downloads.toLocaleString()} downloads</span>
                        <span>Updated: {formatDate(item.lastUpdated)}</span>
                      </div>

                      {item.requirements && (
                        <div className="mt-3 bg-maroon-50 dark:bg-maroon-900/30 border border-maroon-200 dark:border-maroon-700 rounded-lg p-3">
                          <p className="text-maroon-800 dark:text-maroon-200 text-sm">{item.requirements}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[item.category]}`}>
                      {item.category}
                    </span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-maroon-600 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-800 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredDownloadables.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <FileText className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need Help?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Technical Support</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Having trouble downloading or accessing files?</p>
                <p className="text-maroon-600 dark:text-maroon-400 text-sm">support@cit.edu | (555) 123-4580</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Student Services</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Questions about forms or requirements?</p>
                <p className="text-maroon-600 dark:text-maroon-400 text-sm">services@cit.edu | (555) 123-4581</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Software Licensing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Issues with software downloads or licenses?</p>
                <p className="text-maroon-600 dark:text-maroon-400 text-sm">licensing@cit.edu | (555) 123-4582</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-xl p-6 text-white"
          >
            <h2 className="text-xl font-bold mb-4">Download Tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Download className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Use your student email to access software downloads</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Always scan downloaded files with antivirus software</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Check file requirements before downloading large software</span>
              </li>
              <li className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Bookmark this page for easy access to updated resources</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}