import React, { useState, useEffect } from 'react';
import { MapPin, Users, Monitor, Wifi, Clock, Shield, Cpu, Database, Code, Smartphone, Camera, Gamepad2, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface Facility {
  id: string;
  name: string;
  type: 'Computer Lab' | 'Research Lab' | 'Specialized Lab' | 'Study Space' | 'Equipment Room';
  location: string;
  capacity: number;
  description: string;
  equipment: string[];
  software: string[];
  features: string[];
  hours: string;
  image: string;
  booking_required: boolean;
  access_level: 'Open' | 'Restricted' | 'Faculty Only';
}

const facilities: Facility[] = [
  {
    id: "1",
    name: "Advanced Computing Laboratory",
    type: "Computer Lab",
    location: "Tech Building - Room 101",
    capacity: 40,
    description: "State-of-the-art computer lab equipped with high-performance workstations for programming, software development, and computational tasks.",
    equipment: [
      "40 Dell Precision 7000 Workstations",
      "Intel Core i9 processors, 32GB RAM",
      "NVIDIA RTX 4080 Graphics Cards",
      "Dual 27-inch 4K monitors per station",
      "Ergonomic adjustable desks and chairs"
    ],
    software: [
      "Visual Studio Professional",
      "IntelliJ IDEA Ultimate",
      "Adobe Creative Suite",
      "MATLAB & Simulink",
      "AutoCAD & SolidWorks"
    ],
    features: [
      "Gigabit ethernet connectivity",
      "Wireless presentation system",
      "Climate controlled environment",
      "24/7 security monitoring",
      "Backup power systems"
    ],
    hours: "Monday-Friday: 7 AM - 11 PM, Weekends: 9 AM - 9 PM",
    image: "/top2.jpg",
    booking_required: false,
    access_level: "Open"
  },
  {
    id: "2",
    name: "Cybersecurity Operations Center",
    type: "Specialized Lab",
    location: "Security Building - Room 201",
    capacity: 25,
    description: "Advanced cybersecurity lab simulating real-world network environments for hands-on security training and research.",
    equipment: [
      "25 Security-focused workstations",
      "Network simulation equipment",
      "Penetration testing tools",
      "Forensics analysis stations",
      "Isolated network segments"
    ],
    software: [
      "Kali Linux & Parrot OS",
      "Wireshark & Nmap",
      "Metasploit Framework",
      "Burp Suite Professional",
      "SIEM platforms (Splunk, ELK)"
    ],
    features: [
      "Isolated network environment",
      "Virtual machine infrastructure",
      "Incident response simulation",
      "Malware analysis sandbox",
      "Secure communication systems"
    ],
    hours: "Monday-Friday: 8 AM - 10 PM, Weekends: By appointment",
    image: "/p30.jpg",
    booking_required: true,
    access_level: "Restricted"
  },
  {
    id: "3",
    name: "AI & Machine Learning Research Lab",
    type: "Research Lab",
    location: "Innovation Center - Room 301",
    capacity: 20,
    description: "Cutting-edge research facility for artificial intelligence and machine learning projects with high-performance computing resources.",
    equipment: [
      "NVIDIA DGX A100 GPU cluster",
      "20 Research workstations",
      "High-speed storage arrays",
      "Specialized AI hardware",
      "Data visualization displays"
    ],
    software: [
      "TensorFlow & PyTorch",
      "CUDA & cuDNN",
      "Jupyter Notebooks",
      "R & RStudio",
      "Apache Spark & Hadoop"
    ],
    features: [
      "GPU-accelerated computing",
      "Distributed computing cluster",
      "Large dataset storage",
      "Collaborative research tools",
      "Publication support resources"
    ],
    hours: "24/7 access for authorized researchers",
    image: "/exi2.jpg",
    booking_required: true,
    access_level: "Restricted"
  },
  {
    id: "4",
    name: "Mobile Development Studio",
    type: "Specialized Lab",
    location: "Dev Center - Room 150",
    capacity: 30,
    description: "Dedicated space for mobile application development with devices for testing across multiple platforms and operating systems.",
    equipment: [
      "30 Development workstations",
      "iOS and Android test devices",
      "Device testing racks",
      "Wireless charging stations",
      "Mobile app testing equipment"
    ],
    software: [
      "Xcode & Android Studio",
      "React Native & Flutter",
      "Unity for mobile games",
      "Firebase & AWS Mobile",
      "App store deployment tools"
    ],
    features: [
      "Device testing laboratory",
      "Cross-platform development",
      "App store publishing support",
      "User experience testing",
      "Performance monitoring tools"
    ],
    hours: "Monday-Friday: 8 AM - 10 PM, Weekends: 10 AM - 6 PM",
    image: "/p1.jpg",
    booking_required: false,
    access_level: "Open"
  },
  {
    id: "5",
    name: "Network Infrastructure Lab",
    type: "Specialized Lab",
    location: "Network Center - Room 180",
    capacity: 24,
    description: "Hands-on networking lab with enterprise-grade equipment for learning network design, configuration, and management.",
    equipment: [
      "Cisco & Juniper routers",
      "Managed switches & firewalls",
      "Wireless access points",
      "Network monitoring tools",
      "Cable management systems"
    ],
    software: [
      "Cisco Packet Tracer",
      "GNS3 network simulator",
      "Wireshark protocol analyzer",
      "SolarWinds monitoring",
      "Network configuration tools"
    ],
    features: [
      "Enterprise network simulation",
      "Hands-on equipment training",
      "Network troubleshooting",
      "Security implementation",
      "Performance optimization"
    ],
    hours: "Monday-Friday: 9 AM - 9 PM, Weekends: By appointment",
    image: "/p2.jpg",
    booking_required: true,
    access_level: "Restricted"
  },
  {
    id: "6",
    name: "Digital Media Production Suite",
    type: "Specialized Lab",
    location: "Creative Arts Building - Room 220",
    capacity: 16,
    description: "Professional-grade digital media lab for video production, audio editing, graphic design, and multimedia content creation.",
    equipment: [
      "16 Mac Pro workstations",
      "Professional cameras & lighting",
      "Audio recording equipment",
      "Green screen studio setup",
      "3D printing capabilities"
    ],
    software: [
      "Final Cut Pro & Premiere",
      "After Effects & Motion",
      "Logic Pro & Pro Tools",
      "Photoshop & Illustrator",
      "Blender & Maya"
    ],
    features: [
      "Professional studio lighting",
      "Sound-proof recording booth",
      "Video editing suites",
      "3D modeling and animation",
      "Virtual reality content creation"
    ],
    hours: "Monday-Friday: 8 AM - 10 PM, Weekends: 12 PM - 8 PM",
    image: "/p15.png",
    booking_required: true,
    access_level: "Open"
  },
  {
    id: "7",
    name: "Collaborative Study Spaces",
    type: "Study Space",
    location: "Library - Floors 2-4",
    capacity: 200,
    description: "Modern study areas designed for individual and group work with technology integration and flexible seating arrangements.",
    equipment: [
      "Modular furniture systems",
      "Interactive whiteboards",
      "Wireless presentation displays",
      "Charging stations",
      "Noise-canceling pods"
    ],
    software: [
      "Microsoft Office 365",
      "Google Workspace",
      "Zoom & Teams",
      "Collaborative tools",
      "Research databases"
    ],
    features: [
      "Flexible seating arrangements",
      "Quiet and collaborative zones",
      "Natural lighting",
      "Climate control",
      "24/7 access for students"
    ],
    hours: "24/7 access with student ID",
    image: "/p39.jpg",
    booking_required: false,
    access_level: "Open"
  },
  {
    id: "8",
    name: "IoT & Embedded Systems Lab",
    type: "Research Lab",
    location: "Engineering Building - Room 105",
    capacity: 18,
    description: "Specialized laboratory for Internet of Things development and embedded systems programming with various sensors and microcontrollers.",
    equipment: [
      "Arduino & Raspberry Pi kits",
      "Various sensors & actuators",
      "3D printers & prototyping tools",
      "Oscilloscopes & multimeters",
      "Soldering and assembly stations"
    ],
    software: [
      "Arduino IDE & PlatformIO",
      "Raspberry Pi OS",
      "Node-RED & MQTT",
      "LabVIEW & MATLAB",
      "CAD software for PCB design"
    ],
    features: [
      "Prototyping workbenches",
      "Electronic component library",
      "Testing and measurement tools",
      "Wireless connectivity testing",
      "Project showcase displays"
    ],
    hours: "Monday-Friday: 9 AM - 8 PM, Weekends: 1 PM - 5 PM",
    image: "/exi1.jpg",
    booking_required: true,
    access_level: "Restricted"
  }
];

const typeColors = {
  "Computer Lab": "bg-maroon-700 dark:bg-maroon-700 text-white dark:text-white",
  "Research Lab": "bg-maroon-700 dark:bg-maroon-700 text-white dark:text-white",
  "Specialized Lab": "bg-maroon-700 dark:bg-maroon-700 text-white dark:text-white",
  "Study Space": "bg-maroon-700 dark:bg-maroon-700 text-white dark:text-white",
  "Equipment Room": "bg-maroon-700 dark:bg-maroon-700 text-white dark:text-white"
};

const accessColors = {
  "Open": "bg-gray-900 dark:bg-gray-900 text-white dark:text-white",
  "Restricted": "bg-gray-900 dark:bg-gray-900 text-white dark:text-white",
  "Faculty Only": "bg-gray-900 dark:bg-gray-900 text-white dark:text-white"
};

const typeIcons = {
  "Computer Lab": Monitor,
  "Research Lab": Database,
  "Specialized Lab": Cpu,
  "Study Space": Users,
  "Equipment Room": Camera
};

export default function FacilitiesLabs() {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');
  const [showScroll, setShowScroll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  const types = ['All', 'Computer Lab', 'Research Lab', 'Specialized Lab', 'Study Space', 'Equipment Room'];
  const accessLevels = ['All', 'Open', 'Restricted', 'Faculty Only'];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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

  // Set loaded state for animations
  useEffect(() => {
    setLoaded(true);
  }, []);

  const filteredFacilities = facilities.filter(facility => {
    const matchesType = selectedType === 'All' || facility.type === selectedType;
    const matchesAccess = selectedAccess === 'All' || facility.access_level === selectedAccess;
    return matchesType && matchesAccess;
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-maroon-600 dark:text-maroon-500">Facilities</span> & Labs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our world-class facilities and laboratories equipped with cutting-edge technology 
            to support learning, research, and innovation in information technology.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">{facilities.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Total Facilities</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-maroon-500 mb-2">
              {facilities.reduce((sum, facility) => sum + facility.capacity, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Capacity</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">
              {facilities.filter(f => f.type === 'Research Lab').length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Research Labs</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-3xl font-bold text-maroon-600 dark:text-white mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Access Available</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {accessLevels.map(access => (
                  <option key={access} value={access}>{access} Access</option>
                ))}
              </select>
            </div>

            <div className="text-gray-600 dark:text-gray-400">
              Showing {filteredFacilities.length} of {facilities.length} facilities
            </div>
          </div>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {filteredFacilities.map((facility, index) => {
            const IconComponent = typeIcons[facility.type];
            return (
              <motion.div 
                key={facility.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeColors[facility.type]}`}>
                      <IconComponent className="h-4 w-4 mr-1" />
                      {facility.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${accessColors[facility.access_level]}`}>
                      {facility.access_level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{facility.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{facility.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {facility.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      Capacity: {facility.capacity}
                    </div>
                    <div className="flex items-center col-span-2">
                      <Clock className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                      {facility.hours}
                    </div>
                  </div>

                  {facility.booking_required && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                        <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">Booking Required</span>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Equipment:</h4>
                    <ul className="space-y-1">
                      {facility.equipment.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-maroon-600 dark:text-maroon-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                      {facility.equipment.length > 3 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                          +{facility.equipment.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Software & Tools:</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.software.slice(0, 4).map((software, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          {software}
                        </span>
                      ))}
                      {facility.software.length > 4 && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                          +{facility.software.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Special Features:</h4>
                    <ul className="space-y-1">
                      {facility.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <Wifi className="h-3 w-3 text-green-500 dark:text-green-400 mr-2 mt-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredFacilities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Monitor className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No facilities found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters to see more facilities.</p>
          </motion.div>
        )}

        {/* Booking Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Facility Booking</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">How to Book</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Use the online booking system or contact facility management</p>
                <p className="text-maroon-600 dark:text-maroon-500 text-sm">facilities@cit.edu | (555) 123-4580</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Booking Requirements</h3>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>• Valid student or faculty ID</li>
                  <li>• Advance booking (24-48 hours)</li>
                  <li>• Purpose and duration specification</li>
                  <li>• Supervisor approval for research labs</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-xl p-6 text-white"
          >
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-maroon-100 mb-6">
              Our facility management team is here to help you make the most of our resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-maroon-700 px-6 py-2 rounded-lg font-semibold hover:bg-maroon-50 transition-colors duration-200"
              >
                Book Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-maroon-700 transition-all duration-200"
              >
                Virtual Tour
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}