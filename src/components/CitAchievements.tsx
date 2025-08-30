import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Search, Sun, Moon, Award, Trophy, Star, Calendar, Users, BookOpen, Globe, TrendingUp, Medal, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navigation Components
interface NavItem {
  title: string;
  dropdownItems?: { title: string; path: string }[];
  path?: string;
}

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const navItems: NavItem[] = [
  {
    title: 'Faculty',
    dropdownItems: [
      { title: 'Faculty Directory', path: '/Faculty/directory' },
      { title: 'Faculty Achievements', path: '/Faculty/achievements' },
      { title: 'Office hours', path: '/Faculty/hours' },
      { title: 'Courses Handled', path: '/Faculty/course' },
    ],
  },
  {
    title: 'Students',
    dropdownItems: [
      { title: 'Class Schedules', path: '/sched/classsched' },
      { title: 'Enrollment Guidelines', path: '/student/enrollment' },
      { title: 'Student Handbook', path: '/student/handbook' },
      { title: 'Downloadables', path: '/student/files' },
    ],
  },
  {
    title: 'CIT life',
    path: '/campus-life',
  },
  {
    title: 'CIT Lounge',
    path: '/blog',
  },
  {
    title: 'Alumni',
    dropdownItems: [
      { title: 'Alumni Stories', path: '/alumni/stories' },
      { title: 'SIIT Alumni Association', path: '/alumni/association' },
    ],
  },
  {
    title: 'About CIT',
    dropdownItems: [
      { title: 'History', path: '/about/history' },
      { title: 'CIT Achievements', path: '/about/citachievements' },
      { title: 'IT Exhibits', path: '/about/exibits' },
      { title: 'Capstone Projects', path: '/about/capstone' },
      { title: 'Facilities and labs', path: '/about/facilabs' },
      { title: 'Mission & Vision', path: '/about/mission' },
    ],
  },
];

const searchData = [
  { title: "CIT Orientation", path: "/events/orientation" },
  { title: "Tech Talk 2024", path: "/events/techtalk" },
  { title: "CIT life", path: "/campus-life" },
  { title: "Enrollment", path: "/student/enrollment" },
  { title: "Alumni Homecoming", path: "/events/alumni-homecoming" },
  { title: "President's Message", path: "/about/president" },
  { title: "Campus Safety", path: "/about/safety" },
];

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchData>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Close dropdowns if clicked outside
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      
      // Close search if clicked outside of search container and not on the search button
      if (showSearch && 
          searchContainerRef.current && 
          !searchContainerRef.current.contains(e.target as Node) &&
          searchButtonRef.current &&
          !searchButtonRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown, showSearch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSearchResults(
      searchTerm.trim() === "" 
        ? [] 
        : searchData.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [searchTerm]);

  const toggleMobileDropdown = (title: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === title ? null : title);
  };

  const handleDropdownClick = (title: string) => {
    // Toggle the dropdown - if it's already active, hide it
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const handleSearchToggle = () => {
    if (showSearch) {
      // If search is already open, close it
      setShowSearch(false);
      setSearchTerm("");
    } else {
      // If search is closed, open it
      setShowSearch(true);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky
          ? theme === 'light'
            ? 'bg-white text-black shadow-md'
            : 'bg-gray-800 text-white shadow-md'
          : theme === 'light'
            ? 'bg-white text-black'
            : 'bg-gray-800 text-white'
      }`}
      style={{
        backdropFilter: isSticky ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: isSticky ? 'blur(16px)' : undefined,
        backgroundColor: isSticky
          ? theme === 'light'
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(31,41,55,0.95)'
          : theme === 'light'
            ? '#fff'
            : '#1f2937',
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title with proper spacing */}
          <div className="flex items-center">
            <div className="relative flex items-center">
              <div className="bg-maroon-700 rounded-lg flex items-center justify-center w-16 h-16 overflow-hidden">
                <Link to="/">
                  <img
                    src="/HeroAko.png"
                    alt="SIIT Logo"
                    className="h-14 w-14 object-contain"
                  />
                </Link>
              </div>
              {/* Added ml-6 (1.5rem) spacing between logo and text */}
              <a
                href="/"
                className="font-bold hover:text-maroon-700 dark:hover:text-gray-300 transition-colors text-xl whitespace-nowrap ml-6 hidden md:inline-block"
              >
                College of Information Technology
              </a>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <div 
                key={item.title} 
                className="relative"
                ref={el => dropdownRefs.current[item.title] = el}
              >
                {item.dropdownItems ? (
                  <button
                    className={`flex items-center px-3 py-2 text-base font-semibold tracking-wide transition-colors whitespace-nowrap ${
                      theme === 'light'
                        ? 'text-black hover:text-maroon-700'
                        : 'text-white hover:text-gray-300'
                    }`}
                    onClick={() => handleDropdownClick(item.title)}
                  >
                    {item.title}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className={`flex items-center px-3 py-2 text-base font-semibold tracking-wide transition-colors whitespace-nowrap ${
                      theme === 'light'
                        ? 'text-black hover:text-maroon-700'
                        : 'text-white hover:text-gray-300'
                    }`}
                  >
                    {item.title}
                  </a>
                )}

                <AnimatePresence>
                  {item.dropdownItems && activeDropdown === item.title && (
                    <motion.div
                      className={`absolute z-50 left-0 mt-2 w-56 rounded-md shadow-lg py-1 border ${
                        theme === 'light'
                          ? 'bg-white border-gray-200'
                          : 'bg-gray-900 border-gray-800'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.title}
                          href={dropdownItem.path}
                          className={`block px-4 py-2 text-sm font-medium transition-colors ${
                            theme === 'light'
                              ? 'text-black hover:bg-maroon-600 hover:text-white'
                              : 'text-white hover:bg-gray-900'
                          }`}
                        >
                          {dropdownItem.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md focus:outline-none transition-colors flex items-center justify-center
                ${theme === 'dark' ? 'hover:bg-white group' : 'hover:bg-maroon-700 group'}`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-300 transition-colors duration-200 group-hover:text-black" />
              ) : (
                <Moon className="h-5 w-5 text-black transition-colors duration-200 group-hover:text-white" />
              )}
            </button>

            {/* Search (Desktop & Mobile) */}
            <button
              ref={searchButtonRef}
              onClick={handleSearchToggle}
              className={`p-2 rounded-md focus:outline-none transition-colors ${
                showSearch 
                  ? 'bg-maroon-700 dark:bg-gray-700 text-white' 
                  : 'hover:bg-maroon-700 dark:hover:bg-gray-700'
              }`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-maroon-700 dark:hover:bg-gray-700 focus:outline-none md:hidden transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              ref={searchContainerRef}
              className="search-container absolute right-4 md:right-8 top-16 z-50 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-md rounded-lg shadow-lg p-4 w-[calc(100%-2rem)] md:w-80 border border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search events and details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-600 focus:border-transparent text-black dark:text-white dark:bg-gray-800 mb-2"
                autoFocus
              />
              <div className="max-h-60 overflow-y-auto">
                {searchResults.length === 0 && searchTerm ? (
                  <div className="text-gray-500 dark:text-gray-400 px-2 py-1 text-sm">
                    No results found for "{searchTerm}"
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <a
                      key={item.title}
                      href={item.path}
                      className="block px-3 py-2 rounded hover:bg-maroon-600 dark:hover:bg-gray-800 hover:text-white text-black dark:text-white text-sm"
                      onClick={() => {
                        setShowSearch(false);
                        setSearchTerm("");
                      }}
                    >
                      {item.title}
                    </a>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-4 py-3 space-y-0">
                {navItems.map((item, index) => (
                  <div key={item.title} className="mb-0">
                    {item.dropdownItems ? (
                      <div>
                        <button
                          className={`w-full flex justify-between items-center px-3 py-4 text-sm font-semibold transition-colors rounded-md ${
                            theme === 'light'
                              ? 'text-black hover:bg-maroon-600 hover:text-white'
                              : 'text-white hover:bg-gray-900'
                          }`}
                          onClick={() => toggleMobileDropdown(item.title)}
                        >
                          {item.title}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              mobileActiveDropdown === item.title ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileActiveDropdown === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 space-y-1"
                            >
                              {item.dropdownItems.map((dropdownItem) => (
                                <a
                                  key={dropdownItem.title}
                                  href={dropdownItem.path}
                                  className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                                    theme === 'light'
                                      ? 'text-black hover:bg-maroon-600 hover:text-white'
                                      : 'text-white hover:bg-gray-900'
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {dropdownItem.title}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.path}
                        className={`block px-3 py-4 text-sm font-semibold transition-colors rounded-md ${
                          theme === 'light'
                            ? 'text-black hover:bg-maroon-600 hover:text-white'
                            : 'text-white hover:bg-gray-900'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    )}
                    
                    {/* Add divider line after each item except the last one */}
                    {index < navItems.length - 1 && (
                      <hr className={`my-1 ${theme === 'light' ? 'border-gray-200' : 'border-gray-700/50'}`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Achievements Page
interface Achievement {
  id: string;
  title: string;
  category: 'Academic' | 'Research' | 'Industry' | 'Student' | 'Faculty' | 'International';
  year: string;
  description: string;
  details: string[];
  impact: string;
  image: string;
  ranking?: string;
  award_body: string;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Top 10 IT College Nationally",
    category: "Academic",
    year: "2024",
    description: "Ranked among the top 10 information technology colleges in the nation by TechEd Rankings for academic excellence and industry partnerships.",
    details: [
      "95% graduate employment rate within 6 months",
      "Average starting salary 25% above national average",
      "Strong industry partnerships with Fortune 500 companies",
      "State-of-the-art facilities and equipment"
    ],
    impact: "Enhanced reputation attracting top-tier students and faculty nationwide",
    image: "/top2.jpg",
    ranking: "#8",
    award_body: "TechEd Rankings"
  },
  {
    id: "2",
    title: "Excellence in Cybersecurity Education",
    category: "Academic",
    year: "2024",
    description: "Designated as a National Center of Academic Excellence in Cyber Defense Education by the NSA and DHS.",
    details: [
      "Rigorous curriculum meeting national standards",
      "Faculty with industry certifications and experience",
      "Advanced cybersecurity laboratory facilities",
      "Strong partnerships with government agencies"
    ],
    impact: "Students eligible for federal cybersecurity scholarships and priority hiring",
    image: "/wangs.jpg",
    award_body: "NSA & Department of Homeland Security"
  },
  {
    id: "3",
    title: "$5M Research Grant Award",
    category: "Research",
    year: "2023",
    description: "Received largest research grant in college history for AI and machine learning research from the National Science Foundation.",
    details: [
      "5-year collaborative research program",
      "Focus on ethical AI and bias reduction",
      "Partnership with 3 major universities",
      "Training 50+ graduate students"
    ],
    impact: "Established CIT as a leading AI research institution",
    image: "/oten.jpg",
    award_body: "National Science Foundation"
  },
  {
    id: "4",
    title: "International Programming Championship",
    category: "Student",
    year: "2024",
    description: "CIT programming team won first place at the International Collegiate Programming Contest (ICPC) World Finals.",
    details: [
      "Competed against 140+ teams worldwide",
      "Solved 11 out of 13 complex algorithmic problems",
      "First-time participation in World Finals",
      "Team members received full scholarships for graduate studies"
    ],
    impact: "Put CIT on the global map for competitive programming excellence",
    image: "/top1.jpg",
    award_body: "International Collegiate Programming Contest"
  },
  {
    id: "5",
    title: "Industry Partnership Excellence Award",
    category: "Industry",
    year: "2024",
    description: "Recognized for outstanding collaboration with technology industry partners in curriculum development and student placement.",
    details: [
      "Partnerships with 50+ technology companies",
      "Co-developed curriculum with industry input",
      "95% job placement rate for graduates",
      "$2M in student scholarships from industry partners"
    ],
    impact: "Graduates are industry-ready with relevant skills and experience",
    image: "/top3.jpg",
    award_body: "National Association of Technology Colleges"
  },
  {
    id: "6",
    title: "Outstanding Faculty Research Recognition",
    category: "Faculty",
    year: "2023",
    description: "Three faculty members received prestigious research awards for contributions to their respective fields.",
    details: [
      "Dr. Sarah Chen - IEEE Fellow for AI research",
      "Dr. Emily Johnson - NSF CAREER Award for cybersecurity",
      "Dr. Lisa Thompson - Best Paper Award at Data Science Conference",
      "Combined research impact factor of 15.7"
    ],
    impact: "Enhanced research reputation and attracted top-tier graduate students",
    image: "/top4.jpg",
    award_body: "Various Professional Organizations"
  },
  {
    id: "7",
    title: "Green Technology Innovation Award",
    category: "Research",
    year: "2024",
    description: "Awarded for developing sustainable technology solutions that reduce campus energy consumption by 30%.",
    details: [
      "IoT-based energy monitoring system",
      "AI-powered optimization algorithms",
      "Student-led sustainability initiatives",
      "$500K annual cost savings"
    ],
    impact: "Model for other institutions seeking sustainable technology solutions",
    image: "/top5.jpg",
    award_body: "Environmental Technology Council"
  },
  {
    id: "8",
    title: "International Student Exchange Excellence",
    category: "International",
    year: "2024",
    description: "Recognized for outstanding international student exchange programs and global partnerships.",
    details: [
      "Exchange programs with 15 countries",
      "200+ international students annually",
      "Dual degree programs with European universities",
      "Cultural diversity and inclusion initiatives"
    ],
    impact: "Enhanced global perspective and cultural competency of graduates",
    image: "/top 6.jpg",
    award_body: "International Education Association"
  }
];

const categoryColors = {
  "Academic": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Research": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Industry": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Student": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Faculty": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "International": "bg-maroon-600 dark:bg-maroon-700 text-white"
};

const categoryIcons = {
  "Academic": BookOpen,
  "Research": Star,
  "Industry": TrendingUp,
  "Student": Users,
  "Faculty": Award,
  "International": Globe
};

// Theme Hook (simplified version)
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
};

export default function CITAchievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [loaded, setLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Academic', 'Research', 'Industry', 'Student', 'Faculty', 'International'];
  const years = ['All', '2024', '2023', '2022', '2021'];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || achievement.year === selectedYear;
    return matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CIT Achievements</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Celebrating our remarkable accomplishments in academics, research, industry partnerships, 
              and student success that establish CIT as a leader in technology education.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white">Major Awards</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-white mb-2">#8</div>
              <div className="text-white">National Ranking</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-white mb-2">$5M</div>
              <div className="text-white">Research Funding</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
            >
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-white">Job Placement</div>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="text-gray-700 dark:text-gray-300">
                Showing {filteredAchievements.length} of {achievements.length} achievements
              </div>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <div className="space-y-8">
            {filteredAchievements.map((achievement, index) => {
              const IconComponent = categoryIcons[achievement.category];
              return (
                <motion.div 
                  key={achievement.id} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 ${index === 0 ? 'ring-2 ring-maroon-600 dark:ring-maroon-500' : ''}`}
                >
                  {index === 0 && (
                    <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 text-white text-center py-2">
                      <div className="flex items-center justify-center">
                        <Crown className="h-5 w-5 mr-2 text-white" />
                        <span className="font-semibold">Featured Achievement</span>
                      </div>
                    </div>
                  )}
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[achievement.category]}`}>
                          <IconComponent className="h-4 w-4 mr-1 text-white" />
                          {achievement.category}
                        </span>
                        <div className="flex items-center text-sm text-maroon-600 dark:text-white">
                          <Calendar className="h-4 w-4 mr-1" />
                          {achievement.year}
                          {achievement.ranking && (
                            <span className="ml-2 px-2 py-1 bg-maroon-600 dark:bg-maroon-700 text-white rounded-full text-xs font-medium">
                              {achievement.ranking}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{achievement.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h4>
                        <ul className="space-y-1">
                          {achievement.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                              <Medal className="h-3 w-3 text-maroon-600 dark:text-maroon-500 mr-2 mt-1 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Impact:</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{achievement.impact}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Awarded by:</strong> {achievement.award_body}
                        </div>
                        <div className="flex items-center text-maroon-600 dark:text-white">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Achievement Unlocked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAchievements.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Trophy className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more achievements.</p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="mt-16 bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-xl p-8 text-center text-white shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Be Part of Our Success Story</h2>
            <p className="text-maroon-100 mb-6 max-w-2xl mx-auto">
              Join a college that's making history in technology education. Experience excellence, 
              innovation, and achievement at every level of your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply-now">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-maroon-700 px-8 py-3 rounded-lg font-semibold hover:bg-maroon-50 transition-colors duration-200 shadow-lg"
                >
                  Apply Now
                </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-maroon-700 transition-all duration-200"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}