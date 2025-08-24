import React from 'react';
import { Clock, MapPin, Calendar, Phone, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OfficeHour {
  facultyName: string;
  title: string;
  department: string;
  office: string;
  email: string;
  phone: string;
  schedule: {
    day: string;
    time: string;
    type: string;
  }[];
  notes: string;
  image: string;
}

const officeHours: OfficeHour[] = [
  {
    facultyName: "Dr. Sarah Chen",
    title: "Dean & Professor",
    department: "Computer Science",
    office: "Admin Building, Room 301",
    email: "s.chen@cit.edu",
    phone: "(555) 123-4501",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "2:00 PM - 4:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Friday", time: "1:00 PM - 2:00 PM", type: "Virtual" }
    ],
    notes: "Please email in advance for virtual meetings. Available for urgent matters by appointment."
  },
  {
    facultyName: "Prof. Michael Rodriguez",
    title: "Associate Professor",
    department: "Information Systems",
    office: "Tech Building, Room 205",
    email: "m.rodriguez@cit.edu",
    phone: "(555) 123-4502",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Tuesday", time: "9:00 AM - 11:00 AM", type: "In-Person" },
      { day: "Thursday", time: "2:00 PM - 4:00 PM", type: "In-Person" },
      { day: "Friday", time: "3:00 PM - 4:00 PM", type: "Virtual" }
    ],
    notes: "Drop-in welcome during scheduled hours. For project consultations, please schedule in advance."
  },
  {
    facultyName: "Dr. Emily Johnson",
    title: "Professor",
    department: "Cybersecurity",
    office: "Security Lab, Room 101",
    email: "e.johnson@cit.edu",
    phone: "(555) 123-4503",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "1:00 PM - 3:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "11:00 AM - 1:00 PM", type: "In-Person" },
      { day: "Thursday", time: "4:00 PM - 5:00 PM", type: "Virtual" }
    ],
    notes: "Security lab access available during office hours. Virtual sessions via secure video conference."
  },
  {
    facultyName: "Prof. David Kim",
    title: "Assistant Professor",
    department: "Software Engineering",
    office: "Dev Center, Room 150",
    email: "d.kim@cit.edu",
    phone: "(555) 123-4504",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Tuesday", time: "3:00 PM - 5:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "2:00 PM - 3:00 PM", type: "Virtual" }
    ],
    notes: "Code review sessions available. Bring your laptop for hands-on debugging assistance."
  },
  {
    facultyName: "Dr. Lisa Thompson",
    title: "Associate Professor",
    department: "Data Science",
    office: "Analytics Lab, Room 220",
    email: "l.thompson@cit.edu",
    phone: "(555) 123-4505",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Tuesday", time: "1:00 PM - 3:00 PM", type: "In-Person" },
      { day: "Thursday", time: "10:00 AM - 12:00 PM", type: "In-Person" },
      { day: "Friday", time: "2:00 PM - 3:00 PM", type: "Virtual" }
    ],
    notes: "Statistical software assistance available. Data analysis consultations by appointment."
  },
  {
    facultyName: "Prof. James Wilson",
    title: "Professor",
    department: "Network Administration",
    office: "Network Center, Room 180",
    email: "j.wilson@cit.edu",
    phone: "(555) 123-4506",
    image: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=300",
    schedule: [
      { day: "Monday", time: "11:00 AM - 1:00 PM", type: "In-Person" },
      { day: "Wednesday", time: "3:00 PM - 5:00 PM", type: "In-Person" },
      { day: "Thursday", time: "1:00 PM - 2:00 PM", type: "Virtual" }
    ],
    notes: "Network troubleshooting help available. Lab access for hands-on network configuration."
  }
];

export default function OfficeHours() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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
            Faculty Office Hours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Connect with our faculty members during their scheduled office hours for academic guidance, 
            project consultation, and personalized support.
          </motion.p>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 dark:bg-maroon-900 border border-gray-900 dark:border-maroon-700 rounded-lg p-6 mb-8 shadow-md"
        >
          <h2 className="text-lg font-semibold text-white dark:text-white mb-2">Important Notes</h2>
          <ul className="text-white dark:text-white space-y-1">
            {[
              "Office hours are subject to change during exam periods and holidays",
              "Virtual meetings require advance scheduling via email",
              "For urgent matters outside office hours, contact faculty via email",
              "Group consultations are welcome but please notify in advance"
            ].map((note, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start"
              >
                <span className="text-maroon-600 dark:text-maroon-400 mr-2">•</span>
                <span>{note}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Faculty Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {officeHours.map((faculty, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={loaded ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  delay: index * 0.15, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] 
                } 
              } : {}}
              whileHover={{ 
                y: -5,
                scale: 1.01,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-800/30 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-maroon-500 dark:hover:border-maroon-600 transition-all duration-300"
            >
              <div className="p-0">
                {/* Faculty Header with gray-900 background */}
                <motion.div 
                  whileHover={{ scale: 1.005 }}
                  className="flex items-center px-6 py-4 rounded-t-xl bg-gray-900"
                >
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    src={faculty.image}
                    alt={faculty.facultyName}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-gray-300 dark:border-gray-600"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-white">{faculty.facultyName}</h3>
                    <p className="font-medium text-gray-300">{faculty.title}</p>
                    <p className="text-sm text-gray-400">{faculty.department}</p>
                  </motion.div>
                </motion.div>
                
                {/* Card Body */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className="p-6"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <MapPin className="h-4 w-4 mr-2 text-maroon-600 dark:text-white" />
                        {faculty.office}
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Mail className="h-4 w-4 mr-2 text-maroon-600 dark:text-white" />
                        <a href={`mailto:${faculty.email}`} className="hover:text-maroon-500 dark:hover:text-maroon-500 transition-colors">
                          {faculty.email}
                        </a>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 3 }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Phone className="h-4 w-4 mr-2 text-maroon-600 dark:text-white" />
                        {faculty.phone}
                      </motion.div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-maroon-700 dark:text-white mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      Office Hours Schedule
                    </h4>
                    <div className="space-y-2">
                      {faculty.schedule.map((slot, slotIndex) => (
                        <motion.div
                          key={slotIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 + 0.6 + slotIndex * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-maroon-600 dark:text-white" />
                            <span className="font-medium text-maroon-700 dark:text-white">{slot.day}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-maroon-700 dark:text-white">{slot.time}</div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              slot.type === 'Virtual' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                                : 'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-white'
                            }`}>
                              {slot.type}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.8 }}
                    className="bg-maroon-50 dark:bg-maroon-800 border border-maroon-200 dark:border-maroon-500 rounded-lg p-4"
                  >
                    <h5 className="font-medium text-maroon-900 dark:text-white mb-1">Additional Notes</h5>
                    <p className="text-maroon-800 dark:text-white text-sm">{faculty.notes}</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-800/30 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Make the Most of Office Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Before Your Visit</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {[
                  "Review course materials and attempt the problem first",
                  "Prepare specific questions rather than general topics",
                  "Bring relevant materials (textbooks, assignments, code)",
                  "Check if the professor prefers email scheduling"
                ].map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-maroon-600 dark:text-maroon-400 mr-2">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-maroon-700 dark:text-maroon-500 mb-4">During Your Visit</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {[
                  "Be punctual and respectful of time limits",
                  "Take notes during the discussion",
                  "Ask for clarification if you don't understand",
                  "Discuss your academic and career goals"
                ].map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-maroon-600 dark:text-maroon-400 mr-2">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}