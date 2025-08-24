import { useState, useEffect } from 'react';
import { BookOpen, Download, Search, ChevronRight, FileText, Users, Shield, GraduationCap, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface HandbookSection {
  id: string;
  title: string;
  icon: any;
  subsections: {
    id: string;
    title: string;
    content: string;
    important?: boolean;
  }[];
}

const handbookSections: HandbookSection[] = [
  {
    id: "academic-policies",
    title: "Academic Policies",
    icon: GraduationCap,
    subsections: [
      {
        id: "grading-system",
        title: "Grading System",
        content: "CIT uses a standard 4.0 GPA scale. Letter grades are assigned as follows: A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), F (0.0). A minimum GPA of 2.0 is required for graduation.",
        important: true
      },
      {
        id: "attendance-policy",
        title: "Attendance Policy",
        content: "Regular class attendance is expected and required. Students are responsible for all material covered in class. Excessive absences may result in course failure. Students must notify instructors of planned absences in advance."
      },
      {
        id: "academic-integrity",
        title: "Academic Integrity",
        content: "CIT maintains the highest standards of academic integrity. Plagiarism, cheating, and other forms of academic dishonesty are strictly prohibited and may result in course failure or dismissal from the college.",
        important: true
      },
      {
        id: "graduation-requirements",
        title: "Graduation Requirements",
        content: "Students must complete all required coursework with a minimum 2.0 GPA, fulfill residency requirements, and submit a graduation application by the specified deadline. A minimum of 120 credit hours is required for bachelor's degrees."
      }
    ]
  },
  {
    id: "student-services",
    title: "Student Services",
    icon: Users,
    subsections: [
      {
        id: "academic-advising",
        title: "Academic Advising",
        content: "All students are assigned an academic advisor who provides guidance on course selection, degree planning, and career preparation. Students must meet with their advisor each semester before registration."
      },
      {
        id: "tutoring-services",
        title: "Tutoring Services",
        content: "Free tutoring is available for all core courses. The Learning Center offers both individual and group tutoring sessions. Peer tutors are available for programming, mathematics, and technical writing."
      },
      {
        id: "career-services",
        title: "Career Services",
        content: "Career Services assists students with internship placement, job search strategies, resume writing, and interview preparation. Regular career fairs and networking events are organized throughout the year."
      },
      {
        id: "disability-services",
        title: "Disability Services",
        content: "CIT provides accommodations for students with documented disabilities. Services include extended test time, note-taking assistance, and accessible technology. Students must register with Disability Services to receive accommodations."
      }
    ]
  },
  {
    id: "student-conduct",
    title: "Student Conduct",
    icon: Shield,
    subsections: [
      {
        id: "code-of-conduct",
        title: "Code of Conduct",
        content: "Students are expected to conduct themselves with integrity, respect, and responsibility. Violations of the code of conduct may result in disciplinary action including warnings, probation, suspension, or expulsion.",
        important: true
      },
      {
        id: "technology-policy",
        title: "Technology Use Policy",
        content: "Students must use college technology resources responsibly and ethically. Unauthorized access to systems, software piracy, and inappropriate use of network resources are prohibited."
      },
      {
        id: "harassment-policy",
        title: "Anti-Harassment Policy",
        content: "CIT is committed to providing a safe and inclusive environment. Harassment, discrimination, and bullying based on any protected characteristic are strictly prohibited and will result in disciplinary action.",
        important: true
      },
      {
        id: "grievance-procedure",
        title: "Student Grievance Procedure",
        content: "Students who believe they have been treated unfairly may file a formal grievance. The procedure includes informal resolution, formal complaint filing, investigation, and appeal processes."
      }
    ]
  },
  {
    id: "campus-resources",
    title: "Campus Resources",
    icon: MapPin,
    subsections: [
      {
        id: "library-services",
        title: "Library Services",
        content: "The CIT Library provides access to books, journals, databases, and digital resources. Study spaces, computer labs, and research assistance are available. Library hours are Monday-Friday 7 AM - 11 PM, weekends 9 AM - 9 PM."
      },
      {
        id: "computer-labs",
        title: "Computer Labs",
        content: "Multiple computer labs are available with the latest software and hardware. Labs include programming environments, design software, and specialized tools for cybersecurity and data analysis. Lab access requires student ID."
      },
      {
        id: "student-organizations",
        title: "Student Organizations",
        content: "CIT hosts numerous student organizations including ACM chapter, Cybersecurity Club, Women in Tech, and Programming Competition Team. Participation in student organizations enhances learning and networking opportunities."
      },
      {
        id: "health-wellness",
        title: "Health and Wellness",
        content: "Student health services include basic medical care, mental health counseling, and wellness programs. The fitness center is available to all students with valid ID. Emergency services are available 24/7."
      }
    ]
  }
];

export default function CITHandbook() {
  const [activeSection, setActiveSection] = useState<string>('academic-policies');
  const [activeSubsection, setActiveSubsection] = useState<string>('grading-system');
  const [searchTerm, setSearchTerm] = useState('');
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currentSection = handbookSections.find(section => section.id === activeSection);
  const currentSubsection = currentSection?.subsections.find(sub => sub.id === activeSubsection);

  const filteredSections = handbookSections.map(section => ({
    ...section,
    subsections: section.subsections.filter(sub => 
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.subsections.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            CIT Student Handbook
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Your comprehensive guide to policies, procedures, and resources at the College of Information Technology.
          </motion.p>
        </motion.div>

        {/* Search and Download */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search handbook..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
              />
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/CIT_Student_Handbook.pdf"
              download
              className="flex items-center px-6 py-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors border border-maroon-700 dark:border-maroon-600 shadow-md"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </motion.a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 sticky top-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {(searchTerm ? filteredSections : handbookSections).map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <motion.div 
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveSection(section.id);
                          if (section.subsections.length > 0) {
                            setActiveSubsection(section.subsections[0].id);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-maroon-600 dark:bg-maroon-700 text-white border border-maroon-700 dark:border-maroon-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          activeSection === section.id ? 'rotate-90' : ''
                        }`} />
                      </motion.button>
                      
                      {activeSection === section.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 mt-2 space-y-1"
                        >
                          {section.subsections.map((subsection, subIndex) => (
                            <motion.button
                              key={subsection.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * subIndex, duration: 0.2 }}
                              whileHover={{ scale: 1.02, x: 3 }}
                              onClick={() => setActiveSubsection(subsection.id)}
                              className={`w-full text-left p-2 rounded text-sm transition-colors ${
                                activeSubsection === subsection.id
                                  ? 'bg-maroon-100 dark:bg-maroon-800 text-maroon-800 dark:text-maroon-200'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              <div className="flex items-center">
                                {subsection.important && (
                                  <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                                )}
                                {subsection.title}
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-8 border border-gray-200 dark:border-gray-700"
            >
              {currentSubsection ? (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center mb-6"
                  >
                    {currentSubsection.important && (
                      <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    )}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentSubsection.title}</h1>
                  </motion.div>
                  
                  {currentSubsection.important && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6"
                    >
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                        <span className="font-medium text-red-800 dark:text-red-200">Important Policy</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose max-w-none"
                  >
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                      {currentSubsection.content}
                    </p>
                  </motion.div>

                  {/* Navigation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Section: {currentSection?.title}
                    </div>
                    <div className="flex space-x-2">
                      {currentSection?.subsections.map((sub, index) => (
                        <motion.button
                          key={sub.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setActiveSubsection(sub.id)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            sub.id === activeSubsection ? 'bg-maroon-600 dark:bg-maroon-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-12"
                >
                  <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a section to begin</h3>
                  <p className="text-gray-500 dark:text-gray-400">Choose a topic from the navigation menu to view detailed information.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Quick Reference */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <Phone className="h-6 w-6 text-maroon-600 dark:text-maroon-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emergency Contacts</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Campus Security:</strong> (555) 123-9999</p>
              <p><strong>Health Services:</strong> (555) 123-4570</p>
              <p><strong>Counseling:</strong> (555) 123-4571</p>
              <p><strong>IT Help Desk:</strong> (555) 123-4572</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-maroon-600 dark:text-maroon-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Important Emails</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Registrar:</strong> registrar@cit.edu</p>
              <p><strong>Financial Aid:</strong> finaid@cit.edu</p>
              <p><strong>Academic Advising:</strong> advising@cit.edu</p>
              <p><strong>Student Services:</strong> services@cit.edu</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-maroon-600 dark:text-maroon-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><a href="#" className="text-maroon-600 dark:text-maroon-400 hover:underline">Student Portal</a></p>
              <p><a href="#" className="text-maroon-600 dark:text-maroon-400 hover:underline">Course Catalog</a></p>
              <p><a href="#" className="text-maroon-600 dark:text-maroon-400 hover:underline">Academic Calendar</a></p>
              <p><a href="#" className="text-maroon-600 dark:text-maroon-400 hover:underline">Library Resources</a></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}