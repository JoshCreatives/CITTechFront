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
} from "lucide-react";
import supabaseClient from "../services/supabaseClient";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidationError, setIsValidationError] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const [isSubmissionFailed, setIsSubmissionFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    program: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const programs = [
    "Bachelor of Science in Information Technology",
    "Bachelor of Science in Computer Science",
    "Bachelor of Science in Cybersecurity",
    "Bachelor of Science in Data Science",
    "Bachelor of Science in Software Engineering",
  ];

  const steps = [
    { number: 1, title: "Program Selection" },
    { number: 2, title: "Personal Information" },
    { number: 3, title: "Review & Submit" },
  ];

  // Add missing handler functions for form navigation and submission
  function handleNext() {
    // Validate current step before proceeding
    if (currentStep === 1 && !formData.program) {
      setIsValidationError(true);
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  function handlePrev() {
    setCurrentStep(currentStep - 1);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simple validation for all fields
    if (
      !formData.program ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.birthdate ||
      !formData.address
    ) {
      setIsValidationError(true);
      return;
    }
    // Simulate submission (replace with actual supabase insert if needed)
    try {
      // await supabaseClient.from("enrollments").insert([formData]);
      setIsSubmissionSuccess(true);
      setIsSubmissionFailed(false);
    } catch (err) {
      setIsSubmissionFailed(true);
      setIsSubmissionSuccess(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 transition-colors duration-300">


      {/* Validation Error Modal - Updated color */}
      {isValidationError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center max-w-sm mx-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />
            </div>
            <h2 className="text-xl font-bold text-maroon-600 dark:text-maroon-400 mb-4">
              Incomplete Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please complete all required fields before proceeding.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-maroon-600 px-4 py-2 rounded-lg text-white hover:bg-maroon-700 transition-colors"
              onClick={() => setIsValidationError(false)}
            >
              I Understand
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Submission Success Modal - Updated for CIT */}
      {isSubmissionSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center max-w-sm mx-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />
            </div>
            <h2 className="text-xl font-bold text-maroon-600 dark:text-maroon-400 mb-4">
              Enrollment Submitted!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your CIT enrollment form has been received successfully.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-maroon-600 px-4 py-2 rounded-lg text-white hover:bg-maroon-700 transition-colors"
              onClick={() => setIsSubmissionSuccess(false)}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}

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

      {/* Progress Steps - Updated color */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="mb-8"
      >
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-x-4 md:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="flex items-center"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number
                    ? "bg-maroon-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`hidden md:block w-12 h-1 mx-4 ${
                    currentStep > step.number ? "bg-maroon-600" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Form - Updated button colors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-6 border border-gray-200 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit}>
          {/* Step 1: Program Selection */}
          {currentStep === 1 && (
            <motion.div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select CIT Program
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                >
                  <option value="">Choose a CIT program</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors shadow-md"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <motion.div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="First Name"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Middle Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="Middle Name"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="Last Name"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="Email"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="Phone"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Birthdate
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-maroon-500 focus:border-maroon-500 transition-colors"
                  placeholder="Address"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors shadow-md"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors shadow-md"
                >
                  Next
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <motion.div className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Review Your Information
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 text-sm space-y-2">
                  <div>
                    <strong>Program:</strong> {formData.program}
                  </div>
                  <div>
                    <strong>Name:</strong> {formData.firstName}{" "}
                    {formData.middleName} {formData.lastName}
                  </div>
                  <div>
                    <strong>Email:</strong> {formData.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {formData.phone}
                  </div>
                  <div>
                    <strong>Birthdate:</strong> {formData.birthdate}
                  </div>
                  <div>
                    <strong>Address:</strong> {formData.address}
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors shadow-md"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors shadow-md"
                >
                  Submit Enrollment
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </form>
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
                Complete this online enrollment form with accurate information
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