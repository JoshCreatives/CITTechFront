import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const OnlineApplication = () => {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnrollClick = () => {
    // Replace with your actual enrollment website URL
    window.open("https://app.siitschool.com/account/login", "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 transition-colors duration-300">
      {/* Header - Updated for CIT */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <motion.h1 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-maroon-600 dark:text-white mb-2"
        >
          CIT Online Enrollment
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 dark:text-gray-400"
        >
          College of Information Technology Enrollment Portal
        </motion.p>
      </motion.div>

      {/* Enrollment Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700 text-center mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Enroll?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to access our full enrollment system and complete your application.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnrollClick}
          className="px-8 py-3 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors shadow-md flex items-center justify-center mx-auto"
        >
          Go to Enrollment Portal
          <ExternalLink className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>

      {/* Enrollment Guidelines Section - Updated for CIT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="bg-maroon-50 dark:bg-maroon-900 border-l-4 border-maroon-600 p-6 rounded-r-lg">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-maroon-600 dark:text-white mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-maroon-900 dark:text-white mb-2">
                CIT Enrollment Guidelines
              </h4>
              <ul className="list-disc list-inside text-maroon-800 dark:text-gray-300 space-y-2">
                <li>Must have completed Senior High School STEM or ICT track</li>
                <li>Prepare original and photocopy of academic records</li>
                <li>Valid government-issued ID required</li>
                <li>Passing grade in CIT entrance examination</li>
                <li>Interview with CIT department head may be required</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enrollment Process - Updated for CIT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          CIT Enrollment Process
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-start"
          >
            <div className="bg-maroon-600 dark:bg-maroon-700 p-3 rounded-full text-white mr-4">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">1. Online Application</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete the online enrollment form with accurate information
              </p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-start"
          >
            <div className="bg-maroon-600 dark:bg-maroon-700 p-3 rounded-full text-white mr-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">2. CIT Entrance Exam</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Take the technical aptitude test scheduled by the CIT department
              </p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-start"
          >
            <div className="bg-maroon-600 dark:bg-maroon-700 p-3 rounded-full text-white mr-4">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">3. Final Enrollment</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Submit required documents and pay fees at the CIT department office
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CIT Department Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          CIT Department Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-center"
          >
            <Mail className="h-6 w-6 text-maroon-600 dark:text-white mr-4" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                cit.department@university.edu
              </p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ x: 3 }}
            className="flex items-center"
          >
            <Phone className="h-6 w-6 text-maroon-600 dark:text-white mr-4" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">(02) 1234-5678</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnlineApplication;