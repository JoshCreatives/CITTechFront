import { Mail, Phone, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FacultyMember {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  specialization: string[];
  education: string[];
  image: string;
  bio: string;
}

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Junry T. Valenzuela, MIT",
    title: "Dean & Professor",
    department: "Computer Science",
    email: "junryvalenzuela@cit.edu",
    phone: "(555) 123-4501",
    specialization: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    education: ["Ph.D. Computer Science - Stanford University", "M.S. Computer Science - MIT"],
    image: "/p68.jpg",
    bio: "Dr. Chen has over 15 years of experience in AI research and has published over 50 papers in top-tier conferences."
  },
  {
    id: 2,
    name: "Relvin Gloria",
    title: "Associate Professor",
    department: "Information Systems",
    email: "relvingloria@cit.edu",
    phone: "(555) 123-4502",
    specialization: ["Database Systems", "Cloud Computing", "Enterprise Architecture"],
    education: ["Ph.D. Information Systems - UC Berkeley", "M.S. Computer Engineering - Carnegie Mellon"],
    image: "/p35.jpg",
    bio: "Prof. Rodriguez is an expert in enterprise systems with extensive industry experience at major tech companies."
  },
    {
    id: 3,
    name: "Arlou Mataro",
    title: "Professor",
    department: "Cybersecurity",
    email: "arloumataro@cit.edu",
    phone: "(555) 123-4503",
    specialization: ["Network Security", "Cryptography", "Ethical Hacking"],
    education: ["Ph.D. Cybersecurity - Georgia Tech", "M.S. Information Security - NYU"],
    image: "/SirAr.jpg",
    bio: "Dr. Johnson is a renowned cybersecurity expert who has consulted for government agencies and Fortune 500 companies."
  },
  {
    id: 4,
    name: "May Centro Tejada",
    title: "Assistant Professor",
    department: "Software Engineering",
    email: "maycentrotejada@cit.edu",
    phone: "(555) 123-4504",
    specialization: ["Web Development", "Mobile Applications", "DevOps"],
    education: ["Ph.D. Software Engineering - University of Washington", "M.S. Computer Science - UIUC"],
    image: "/maammay.jpg",
    bio: "Prof. Kim brings real-world software development experience from leading tech startups and established companies."
  },
  {
    id: 5,
    name: "Rowel C. Salamingan",
    title: "Associate Professor",
    department: "Capstone",
    email: "rowelsalamingan@cit.edu",
    phone: "(555) 123-4505",
    specialization: ["Big Data Analytics", "Statistical Modeling", "Business Intelligence"],
    education: ["Ph.D. Statistics - Harvard University", "M.S. Applied Mathematics - Caltech"],
    image: "/p67.jpg",
    bio: "Dr. Thompson specializes in applying statistical methods to solve complex business and research problems."
  },
  {
    id: 6,
    name: "Daniel Estepualar",
    title: "Technician",
    department: "Network Administration",
    email: "danielestepualar@cit.edu",
    phone: "(555) 123-4506",
    specialization: ["Network Infrastructure", "System Administration", "Cloud Services"],
    education: ["Ph.D. Computer Networks - MIT", "M.S. Electrical Engineering - Stanford"],
    image: "/nodp.jpg",
    bio: "Prof. Wilson has extensive experience in designing and managing large-scale network infrastructures."
  }
];

export default function FacultyDirectory() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dean = facultyMembers.find(f => f.title.includes("Dean"));
  const otherFaculty = facultyMembers.filter(f => !f.title.includes("Dean"));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-4 md:px-6 lg:px-8 mb-12"
      >
        <div className="bg-gradient-to-r from-maroon-600 via-gray-100 to-gray-100 dark:from-maroon-700 dark:via-gray-900 dark:to-gray-900 rounded-2xl shadow-xl px-6 py-12 max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Faculty Directory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-black dark:text-gray-300 max-w-3xl mx-auto"
          >
            Meet our distinguished faculty members who bring expertise, innovation, and dedication to technology education.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dean's Card */}
        {dean && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={loaded ? { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                delay: 0.1, 
                duration: 0.5,
                ease: "backOut"
              } 
            } : {}}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 overflow-hidden border border-gray-200 dark:border-gray-700 mb-8 min-h-[500px]"
          >
            <div className="p-0 h-full flex flex-col">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center mb-4 px-6 py-4 rounded-t-xl bg-gray-900 dark:bg-gray-900"
              >
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  src={dean.image}
                  alt={dean.name}
                  className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-maroon-600 dark:border-maroon-500"
                />
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold text-white dark:text-white">
                    {dean.name}
                  </h3>
                  <p className="font-medium text-white dark:text-gray-300 text-lg">
                    {dean.title}
                  </p>
                  <p className="text-sm text-white dark:text-gray-400">
                    {dean.department}
                  </p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 flex-grow flex flex-col"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg flex-grow">
                  {dean.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <motion.div 
                    whileHover={{ x: 3 }}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                  >
                    <Mail className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    <a href={`mailto:${dean.email}`} className="hover:text-maroon-500 dark:hover:text-maroon-300 transition-colors text-lg">
                      {dean.email}
                    </a>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 3 }}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                  >
                    <Phone className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    <span className="text-lg">{dean.phone}</span>
                  </motion.div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    Specialization
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dean.specialization.map((spec, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-sm rounded-full border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600"
                      >
                        {spec}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center text-xl">
                    <BookOpen className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                    Education
                  </h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    {dean.education.map((edu, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start text-lg"
                      >
                        <span className="text-maroon-600 dark:text-maroon-500 mr-2">•</span> 
                        <span>{edu}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherFaculty.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={loaded ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  delay: 0.2 + index * 0.1, 
                  duration: 0.5,
                  ease: "backOut"
                } 
              } : {}}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 overflow-hidden border border-gray-200 dark:border-gray-700 min-h-[400px]"
            >
              <div className="p-0 h-full flex flex-col">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center mb-4 px-6 py-4 rounded-t-xl bg-gray-900 dark:bg-gray-900"
                >
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-gray-300 dark:border-gray-600"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-white dark:text-white">
                      {faculty.name}
                    </h3>
                    <p className="font-medium text-white dark:text-gray-300">
                      {faculty.title}
                    </p>
                    <p className="text-sm text-white dark:text-gray-400">
                      {faculty.department}
                    </p>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-6 flex-grow flex flex-col"
                >
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">
                    {faculty.bio}
                  </p>

                  <div className="space-y-2 mb-4">
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Mail className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      <a href={`mailto:${faculty.email}`} className="hover:text-maroon-500 dark:hover:text-maroon-300 transition-colors">
                        {faculty.email}
                      </a>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Phone className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {faculty.phone}
                    </motion.div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      Specialization
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {faculty.specialization.map((spec, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 text-xs rounded-full border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600"
                        >
                          {spec}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      Education
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {faculty.education.map((edu, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 + i * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-maroon-600 dark:text-maroon-500 mr-1">•</span> 
                          <span>{edu}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}