"use client";
import { CheckCircle2, Award, Shield, Target, ClipboardCheck, Users, BookOpen, Star, ArrowUp } from 'lucide-react';
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from 'react';

const QualityManagement = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System Certification",
      date: "Certified since 2010"
    },
    {
      name: "ISO 21001:2018",
      description: "Educational Organization Management System",
      date: "Certified since 2019"
    },
    {
      name: "CHED Center of Excellence",
      description: "Information Technology Education",
      date: "Awarded 2020"
    }
  ];

  const standards = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Strategic Planning",
      description: "Comprehensive approach to quality objectives and continuous improvement"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Stakeholder Focus",
      description: "Meeting and exceeding stakeholder expectations"
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Process Management",
      description: "Systematic approach to educational and administrative processes"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Performance Evaluation",
      description: "Regular monitoring and measurement of quality indicators"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">


      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
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
          src="/p69.jpg"
          alt="Quality Management"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/75 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Quality Management
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Committed to excellence through comprehensive quality management systems
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quality Policy */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700"
        >
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-green-500 mr-4" />
            <h2 className="text-3xl font-bold text-white">Quality Policy</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            SIIT is committed to delivering excellence in education through continuous improvement 
            of our quality management system, ensuring compliance with regulatory requirements, 
            and exceeding stakeholder expectations. We achieve this through:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Maintaining high academic standards",
              "Continuous professional development",
              "Regular system evaluation and improvement",
              "Stakeholder engagement and satisfaction"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certifications */}
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-green-400"
          >
            Our Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-800/70 backdrop-blur-sm rounded-lg p-6 border border-green-700"
              >
                <Award className="h-12 w-12 mb-4 text-green-400" />
                <h3 className="text-xl font-bold mb-2 text-white">{cert.name}</h3>
                <p className="text-green-200 mb-4">{cert.description}</p>
                <span className="text-sm text-green-300">{cert.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Standards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-green-400"
        >
          Quality Standards
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
            >
              <div className="bg-green-900 p-3 rounded-full w-12 h-12 flex items-center justify-center text-green-400 mb-4">
                {standard.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{standard.title}</h3>
              <p className="text-gray-300">{standard.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quality Objectives */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-green-400"
          >
            Quality Objectives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-700 p-8 rounded-lg shadow-md border border-gray-600"
            >
              <BookOpen className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Academic Excellence</h3>
              <ul className="space-y-3">
                {[
                  "Maintain high passing rates in board examinations",
                  "Achieve graduate employability rate above 90%",
                  "Regular curriculum review and enhancement",
                  "Faculty development and research initiatives"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-700 p-8 rounded-lg shadow-md border border-gray-600"
            >
              <Users className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Stakeholder Satisfaction</h3>
              <ul className="space-y-3">
                {[
                  "Regular stakeholder feedback collection and analysis",
                  "Timely response to stakeholder concerns",
                  "Enhanced student support services",
                  "Industry partnership development"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityManagement;