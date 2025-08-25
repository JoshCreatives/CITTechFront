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
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
  const [showScroll, setShowScroll] = useState(false);

  // Function to redirect to external registration website
  const handleRegisterClick = () => {
    window.location.href = "https://siit-alumni.great-site.net/register.php";
  };

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
              <span className="bg-gradient-to-r from-maroon-500 to-maroon-600 bg-clip-text text-transparent">
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
              <div className="bg-maroon-600 dark:bg-maroon-600 p-3 rounded-full w-12 h-12 flex items-center justify-center text-white dark:text-white mb-4">
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
                onClick={handleRegisterClick}
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
    </div>
  );
};

export default AlumniAssociation;