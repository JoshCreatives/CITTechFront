"use client";
import {
  Users,
  Calendar,
  Award,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  ChevronRight,
  X,
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  ArrowUp,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import supabaseClient from "../services/supabaseClient";

const benefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Networking Opportunities",
    description:
      "Connect with fellow alumni through events and online platforms",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Exclusive Events",
    description: "Access to special alumni gatherings, workshops, and seminars",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Career Support",
    description:
      "Job postings, career counseling, and professional development resources",
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Industry Connections",
    description:
      "Build relationships with industry partners and potential employers",
  },
];

const upcomingEvents = [
  {
    title: "Alumni Homecoming 2024",
    date: "March 30, 2024",
    location: "Dapa, Gymnasium",
    image: "/p59.jpg",
  },
  {
    title: "Alumni Night",
    date: "April 15, 2024",
    location: "Dapa Gymnasium",
    image: "/p60.jpg",
  },
  {
    title: "Grand Alumni",
    date: "May 5, 2024",
    location: "SMX Convention Center",
    image: "/p61.jpg",
  },
];

const boardMembers = [
  {
    name: "Atty. Maria Santos",
    position: "President",
    batch: "1995",
    image: "/p62.jpg",
  },
  {
    name: "Engr. James Rodriguez",
    position: "Vice President",
    batch: "1997",
    image: "/p63.jpg",
  },
  {
    name: "Dr. Sarah Chen",
    position: "Secretary",
    batch: "2000",
    image: "/p64.jpg",
  },
  {
    name: "Mr. Jemar Sumalinog",
    position: "Treasurer",
    batch: "1998",
    image: "/p65.jpg",
  },
];

const AlumniAssociation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false); // State for the submission success modal
  const [isSubmissionFailed, setIsSubmissionFailed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    batch: "",
    program: "",
    company: "",
    position: "",
    address: "",
  });

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here

    const response: any = await supabaseClient
      .from("alumni")
      .upsert({
        program: formData.program,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        company: formData.company,
        batch: formData.batch,
        role: formData.position,
      })
      .select();

    console.log(response);

    setShowModal(false);

    if (!response.error) {
      setIsSubmissionSuccess(true); // Show submission success modal
      console.log("Form Data:", formData); // Log form data for debugging
    } else {
      setIsSubmissionFailed(true);
      console.log("eror");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">



      {/* Submission Success Modal */}
      {isSubmissionSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center max-w-sm mx-4 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />{" "}
              {/* Success icon */}
            </div>
            <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
              Submission Successful!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your registration has been submitted successfully.
            </p>
            <button
              className="bg-maroon-600 dark:bg-maroon-500 px-4 py-2 rounded-lg text-white hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors"
              onClick={() => setIsSubmissionSuccess(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Submission Failed Modal */}
      {isSubmissionFailed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl text-center max-w-sm mx-4 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />{" "}
              {/* Success icon */}
            </div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
              Submission Failed!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your registration has failed. Please try again later.
            </p>
            <button
              className="bg-maroon-600 dark:bg-maroon-500 px-4 py-2 rounded-lg text-white hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors"
              onClick={() => setIsSubmissionFailed(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

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

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px]"
      >
        <img
          src="/p59.jpg"
          alt="Alumni Association"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-white to-maroon-600 bg-clip-text text-transparent">
                SIIT Alumni Association
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Connecting generations of SIIT graduates through networking,
              professional development, and lifelong learning opportunities.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Membership Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
        >
          Membership Benefits
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="bg-maroon-600/20 dark:bg-maroon-600 p-3 rounded-full w-12 h-12 flex items-center justify-center text-maroon-600 dark:text-white mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Board Members */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
          >
            Board of Directors
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border-4 border-maroon-600 dark:border-maroon-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-maroon-600 dark:text-maroon-500 font-medium mb-1">
                  {member.position}
                </p>
                <p className="text-gray-700 dark:text-gray-300">Batch {member.batch}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-maroon-600 dark:text-white"
        >
          Upcoming Events
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-maroon-600 dark:text-maroon-500" />
                  <span>{event.location}</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-maroon-600 dark:text-maroon-500 hover:underline font-medium"
                >
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-green-400">
                Join the Association
              </h2>
              <p className="text-lg text-green-200 mb-8">
                Become a member of the SIIT Alumni Association and stay
                connected with your alma mater. Enjoy exclusive benefits and
                help shape the future of SIIT.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors"
              >
                Register Now
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-4 text-green-400" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-green-200">alumni@siit.edu</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-4 text-green-400" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-green-200">09783657257</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-4 text-green-400" />
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-green-200">
                    Alumni Center, SIIT Main Campus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">
                Alumni Registration
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Year
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Program
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Company
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniAssociation;
