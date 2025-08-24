import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      { title: 'Mission & Vision', path: '/about/facilites' },
    ],
  },
];

const searchData = [
  { title: "CIT Orientation", path: "/events/orientation" },
  { title: "Tech Talk 2024", path: "/events/techtalk" },
  { title: "CIT life", path: "/campus-life" },
  { title: "Enrollment Period", path: "/enrollment" },
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
      if (showSearch && !(e.target as HTMLElement).closest('.search-container')) {
        setShowSearch(false);
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
    setActiveDropdown(activeDropdown === title ? null : title);
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
              <div key={item.title} className="relative">
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
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md hover:bg-maroon-700 dark:hover:bg-gray-700 focus:outline-none transition-colors"
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
      <div className="px-4 py-3 space-y-0"> {/* Changed space-y-2 to space-y-0 */}
        {navItems.map((item, index) => (
          <div key={item.title} className="mb-0"> {/* Changed mb-1 to mb-0 */}
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

export default Navbar;