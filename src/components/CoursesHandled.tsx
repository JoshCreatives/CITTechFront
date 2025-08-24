import React from 'react';
import { BookOpen, Users, Clock, Calendar, Award, Database, Shield, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  level: 'Undergraduate' | 'Graduate';
  semester: string;
  enrolledStudents: number;
  maxCapacity: number;
  schedule: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  icon: any;
}

interface FacultyCourses {
  facultyName: string;
  title: string;
  department: string;
  image: string;
  totalCourses: number;
  totalStudents: number;
  courses: Course[];
}

const facultyCoursesData: FacultyCourses[] = [
   {
    facultyName: "Junry T. Valezuela, MIT",
    title: "Dean & Professor",
    department: "Computer Science",
    image: "/p68.jpg",
    totalCourses: 3,
    totalStudents: 180,
    courses: [
      {
        id: "CS501",
        name: "Advanced Machine Learning",
        code: "CS 501",
        credits: 3,
        level: "Graduate",
        semester: "Spring 2025",
        enrolledStudents: 45,
        maxCapacity: 50,
        schedule: "MWF 10:00-11:00 AM",
        description: "Advanced topics in machine learning including deep learning, reinforcement learning, and neural networks.",
        prerequisites: ["CS 301 - Data Structures", "MATH 341 - Statistics"],
        learningOutcomes: [
          "Implement advanced ML algorithms from scratch",
          "Design and train deep neural networks",
          "Apply reinforcement learning to real-world problems",
          "Evaluate and optimize model performance"
        ],
        icon: Award
      },
      {
        id: "CS401",
        name: "Artificial Intelligence",
        code: "CS 401",
        credits: 3,
        level: "Undergraduate",
        semester: "Fall 2024",
        enrolledStudents: 75,
        maxCapacity: 80,
        schedule: "TTh 2:00-3:30 PM",
        description: "Introduction to AI concepts, search algorithms, knowledge representation, and expert systems.",
        prerequisites: ["CS 201 - Programming Fundamentals", "CS 301 - Data Structures"],
        learningOutcomes: [
          "Understand fundamental AI concepts and techniques",
          "Implement search and optimization algorithms",
          "Design knowledge-based systems",
          "Apply AI techniques to solve practical problems"
        ],
        icon: Award
      },
      {
        id: "CS601",
        name: "Research Methodology in AI",
        code: "CS 601",
        credits: 2,
        level: "Graduate",
        semester: "Spring 2025",
        enrolledStudents: 25,
        maxCapacity: 30,
        schedule: "W 6:00-8:00 PM",
        description: "Research methods, paper writing, and presentation skills for AI research.",
        prerequisites: ["CS 501 - Advanced Machine Learning"],
        learningOutcomes: [
          "Design and conduct AI research experiments",
          "Write and publish research papers",
          "Present research findings effectively",
          "Critically evaluate AI research literature"
        ],
        icon: BookOpen
      }
    ]
  },
  {
    facultyName: "Relvin Gloria",
    title: "Associate Professor",
    department: "Information Systems",
    image: "/p35.jpg",
    totalCourses: 4,
    totalStudents: 220,
    courses: [
      {
        id: "IS301",
        name: "Database Management Systems",
        code: "IS 301",
        credits: 3,
        level: "Undergraduate",
        semester: "Fall 2024",
        enrolledStudents: 85,
        maxCapacity: 90,
        schedule: "MWF 9:00-10:00 AM",
        description: "Design, implementation, and management of relational database systems.",
        prerequisites: ["CS 201 - Programming Fundamentals"],
        learningOutcomes: [
          "Design normalized database schemas",
          "Write complex SQL queries and procedures",
          "Implement database security measures",
          "Optimize database performance"
        ],
        icon: Database
      },
      {
        id: "IS401",
        name: "Enterprise Systems Architecture",
        code: "IS 401",
        credits: 3,
        level: "Undergraduate",
        semester: "Spring 2025",
        enrolledStudents: 60,
        maxCapacity: 65,
        schedule: "TTh 11:00-12:30 PM",
        description: "Design and implementation of large-scale enterprise information systems.",
        prerequisites: ["IS 301 - Database Management Systems"],
        learningOutcomes: [
          "Architect scalable enterprise systems",
          "Integrate multiple system components",
          "Implement enterprise security frameworks",
          "Manage system deployment and maintenance"
        ],
        icon: Network
      },
      {
        id: "IS501",
        name: "Advanced Database Systems",
        code: "IS 501",
        credits: 3,
        level: "Graduate",
        semester: "Fall 2024",
        enrolledStudents: 35,
        maxCapacity: 40,
        schedule: "MW 7:00-8:30 PM",
        description: "Advanced topics in database systems including NoSQL, distributed databases, and big data.",
        prerequisites: ["IS 301 - Database Management Systems"],
        learningOutcomes: [
          "Design and implement NoSQL databases",
          "Manage distributed database systems",
          "Handle big data processing and analytics",
          "Optimize database performance at scale"
        ],
        icon: Database
      },
      {
        id: "IS502",
        name: "Cloud Computing Architecture",
        code: "IS 502",
        credits: 3,
        level: "Graduate",
        semester: "Spring 2025",
        enrolledStudents: 40,
        maxCapacity: 45,
        schedule: "TTh 7:00-8:30 PM",
        description: "Design and deployment of applications in cloud computing environments.",
        prerequisites: ["IS 401 - Enterprise Systems Architecture"],
        learningOutcomes: [
          "Design cloud-native applications",
          "Implement microservices architecture",
          "Manage cloud infrastructure and services",
          "Ensure cloud security and compliance"
        ],
        icon: Network
      }
    ]
  },
  {
    facultyName: "Arlou Mataro",
    title: "Professor",
    department: "Cybersecurity",
    image: "/SirAr.jpg",
    totalCourses: 3,
    totalStudents: 165,
    courses: [
      {
        id: "CY301",
        name: "Network Security",
        code: "CY 301",
        credits: 3,
        level: "Undergraduate",
        semester: "Fall 2024",
        enrolledStudents: 70,
        maxCapacity: 75,
        schedule: "MWF 1:00-2:00 PM",
        description: "Principles and practices of network security, including firewalls, VPNs, and intrusion detection.",
        prerequisites: ["CS 201 - Programming Fundamentals", "NET 201 - Network Fundamentals"],
        learningOutcomes: [
          "Configure network security devices",
          "Implement secure network protocols",
          "Detect and respond to network intrusions",
          "Design secure network architectures"
        ],
        icon: Shield
      },
      {
        id: "CY401",
        name: "Cryptography and Data Protection",
        code: "CY 401",
        credits: 3,
        level: "Undergraduate",
        semester: "Spring 2025",
        enrolledStudents: 55,
        maxCapacity: 60,
        schedule: "TTh 3:00-4:30 PM",
        description: "Mathematical foundations of cryptography and practical data protection techniques.",
        prerequisites: ["MATH 241 - Discrete Mathematics", "CY 301 - Network Security"],
        learningOutcomes: [
          "Implement cryptographic algorithms",
          "Design secure communication protocols",
          "Apply digital signatures and certificates",
          "Analyze cryptographic vulnerabilities"
        ],
        icon: Shield
      },
      {
        id: "CY501",
        name: "Advanced Cybersecurity",
        code: "CY 501",
        credits: 3,
        level: "Graduate",
        semester: "Fall 2024",
        enrolledStudents: 40,
        maxCapacity: 45,
        schedule: "W 6:00-9:00 PM",
        description: "Advanced topics in cybersecurity including threat intelligence, incident response, and forensics.",
        prerequisites: ["CY 401 - Cryptography and Data Protection"],
        learningOutcomes: [
          "Conduct advanced threat analysis",
          "Lead incident response procedures",
          "Perform digital forensics investigations",
          "Develop cybersecurity policies and frameworks"
        ],
        icon: Shield
      }
    ]
  }
];

const levelColors = {
  Undergraduate: "bg-white dark:bg-gray-800 text-maroon-800 dark:text-white border border-maroon-200 dark:border-gray-600",
  Graduate: "bg-maroon-900 text-white"
};

export default function CoursesHandled() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = facultyCoursesData.filter(faculty => 
    selectedFaculty === 'all' || faculty.facultyName === selectedFaculty
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with maroon gradient background */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 bg-gradient-to-r from-maroon-600 via-gray-50 to-gray-50 dark:from-maroon-800 dark:via-gray-900 dark:to-gray-900 py-10 px-4 rounded-xl shadow-lg dark:shadow-gray-800/20"
        >
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Courses Handled by Faculty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-black dark:text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive overview of courses taught by our distinguished faculty members across 
            undergraduate and graduate programs.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <motion.select
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-maroon-600 dark:focus:ring-maroon-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          >
            <option value="all">All Faculty</option>
            {facultyCoursesData.map(faculty => (
              <option key={faculty.facultyName} value={faculty.facultyName}>
                {faculty.facultyName}
              </option>
            ))}
          </motion.select>
          
          <motion.select
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-maroon-600 dark:focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          >
            <option value="all">All Levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </motion.select>
        </motion.div>

        {/* Faculty Course Overview */}
        {filteredData.map((faculty, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: index * 0.15, 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] 
              } 
            } : {}}
            className="mb-12"
          >
            <motion.div
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  src={faculty.image}
                  alt={faculty.facultyName}
                  className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-maroon-600 dark:border-maroon-500"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{faculty.facultyName}</h2>
                  <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">{faculty.title}</p>
                  <p className="text-gray-600 dark:text-gray-300">{faculty.department}</p>
                </div>
                <div className="text-right">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{faculty.totalCourses}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-maroon-600 dark:text-maroon-400">{faculty.totalStudents}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">Students</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {faculty.courses
                  .filter(course => selectedLevel === 'all' || course.level === selectedLevel)
                  .map((course, courseIndex) => {
                    const IconComponent = course.icon;
                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + courseIndex * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow duration-200 hover:border-maroon-400 dark:hover:border-maroon-500"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-maroon-900 rounded-lg flex items-center justify-center mr-3">
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.name}</h3>
                              <p className="text-gray-600 dark:text-gray-300">{course.code} • {course.credits} Credits</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[course.level]}`}>
                            {course.level}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-800 dark:text-white">
                            <Calendar className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-400" />
                            {course.semester}
                          </div>
                          <div className="flex items-center text-sm text-gray-800 dark:text-white">
                            <Clock className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-400" />
                            {course.schedule}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <Users className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-400" />
                            {course.enrolledStudents}/{course.maxCapacity} Students
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="bg-maroon-600 h-2 rounded-full" 
                                style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {Math.round((course.enrolledStudents / course.maxCapacity) * 100)}%
                            </span>
                          </div>
                        </div>

                        {course.prerequisites.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prerequisites:</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.prerequisites.map((prereq, prereqIndex) => (
                                <motion.span
                                  key={prereqIndex}
                                  whileHover={{ scale: 1.05 }}
                                  className="px-2 py-1 bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-white text-xs rounded border border-maroon-200 dark:border-maroon-700"
                                >
                                  {prereq}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Learning Outcomes:</h4>
                          <ul className="space-y-1">
                            {course.learningOutcomes.slice(0, 2).map((outcome, outcomeIndex) => (
                              <motion.li 
                                key={outcomeIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 + courseIndex * 0.1 + outcomeIndex * 0.05 }}
                                className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                              >
                                <span className="text-maroon-600 dark:text-maroon-400 mr-2">•</span>
                                {outcome}
                              </motion.li>
                            ))}
                            {course.learningOutcomes.length > 2 && (
                              <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                                +{course.learningOutcomes.length - 2} more outcomes...
                              </li>
                            )}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="bg-gradient-to-r from-maroon-600 via-maroon-700 to-maroon-800 dark:from-maroon-800 dark:via-maroon-900 dark:to-gray-900 rounded-xl p-8 text-white shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Course Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: facultyCoursesData.reduce((sum, faculty) => sum + faculty.totalCourses, 0),
                label: "Total Courses"
              },
              {
                value: facultyCoursesData.reduce((sum, faculty) => sum + faculty.totalStudents, 0),
                label: "Total Students"
              },
              {
                value: facultyCoursesData.reduce((sum, faculty) => 
                  sum + faculty.courses.filter(course => course.level === 'Undergraduate').length, 0
                ),
                label: "Undergraduate Courses"
              },
              {
                value: facultyCoursesData.reduce((sum, faculty) => 
                  sum + faculty.courses.filter(course => course.level === 'Graduate').length, 0
                ),
                label: "Graduate Courses"
              }
            ].map((stat, statIndex) => (
              <motion.div
                key={statIndex}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/10 dark:bg-black/20 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-maroon-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}