import React, { useState, useEffect } from 'react';
import { Users, Calendar, Award, Github, Play, Star, Search, ArrowUp } from 'lucide-react';
import { motion } from "framer-motion";
import { useTheme } from '../hooks/useTheme';

interface Project {
  id: string;
  title: string;
  team: string[];
  advisor: string;
  department: string;
  year: string;
  semester: string;
  description: string;
  technologies: string[];
  features: string[];
  achievements: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'Web Development' | 'Mobile App' | 'AI/ML' | 'Cybersecurity' | 'Data Science' | 'Game Development';
  status: 'Completed' | 'In Progress' | 'Awarded';
}

const capstoneProjects: Project[] = [
  {
    id: "1",
    title: "CIT-LMS Learning Management System",
    team: ["John Joshua Tiu", "Daryl Villar", "Jhanmark Acedera"],
    advisor: "Rowel C. Salamingan",
    department: "BSIT",
    year: "2025",
    semester: "Fall",
    description: "A application that provides real-time navigation assistance for campus visitors and students, featuring indoor mapping, crowd density analysis, and accessibility routing.",
    technologies: ["React Native", "PHP", "SQL", "Infinityfree"],
    features: [
      "Real-time indoor navigation with AR overlay",
      "Crowd density prediction using ML algorithms",
      "Accessibility-friendly route planning",
      "Multi-language support",
      "Integration with campus events calendar"
    ],
    achievements: [
      "Winner - Best Innovation Award 2025",
      "Featured in Campus Technology Magazine",
      "Adopted by university administration",
      "10,000+ downloads in first month"
    ],
    image: "/wang1.jpg",
    demoUrl: "https://citlms.free.nf/",
    githubUrl: "https://github.com/citcampus/smart-navigation",
    category: "Mobile App",
    status: "Awarded"
  },
  {
    id: "2",
    title: "CyberGuard: Network Intrusion Detection",
    team: ["Emily Rodriguez", "James Wilson", "Sarah Kim"],
    advisor: "Dr. Emily Johnson",
    department: "Cybersecurity",
    year: "2024",
    semester: "Spring",
    description: "Advanced network intrusion detection system using machine learning to identify and prevent cyber attacks in real-time, with automated response capabilities.",
    technologies: ["Python", "Scikit-learn", "Wireshark", "Docker", "Elasticsearch"],
    features: [
      "Real-time network traffic analysis",
      "ML-based anomaly detection",
      "Automated threat response system",
      "Comprehensive security dashboard",
      "Integration with SIEM platforms"
    ],
    achievements: [
      "Best Cybersecurity Project 2024",
      "Presented at National Security Conference",
      "Patent application filed",
      "Interest from 3 major security firms"
    ],
    image: "/exi5.jpg",
    demoUrl: "https://cyberguard-demo.cit.edu",
    githubUrl: "https://github.com/citcyber/cyberguard",
    category: "Cybersecurity",
    status: "Awarded"
  },
  {
    id: "3",
    title: "EcoTrack: Environmental Monitoring Platform",
    team: ["Michael Brown", "Lisa Wang", "Robert Taylor"],
    advisor: "Dr. Lisa Thompson",
    department: "Data Science",
    year: "2024",
    semester: "Fall",
    description: "IoT-based environmental monitoring system that tracks air quality, noise levels, and energy consumption across campus, providing actionable insights for sustainability initiatives.",
    technologies: ["IoT Sensors", "Python", "React", "PostgreSQL", "AWS IoT"],
    features: [
      "Real-time environmental data collection",
      "Predictive analytics for energy optimization",
      "Interactive data visualization dashboard",
      "Mobile alerts for environmental hazards",
      "Integration with campus sustainability goals"
    ],
    achievements: [
      "Green Innovation Award 2024",
      "Reduced campus energy consumption by 15%",
      "Published research paper",
      "Collaboration with Environmental Science dept"
    ],
    image: "/exi4.jpg",
    demoUrl: "https://ecotrack.cit.edu",
    category: "Data Science",
    status: "Completed"
  },
  {
    id: "4",
    title: "CodeMentor: AI-Powered Learning Assistant",
    team: ["Jennifer Lee", "Kevin Martinez", "Amanda Foster"],
    advisor: "Prof. David Kim",
    department: "Software Engineering",
    year: "2024",
    semester: "Spring",
    description: "Intelligent tutoring system that provides personalized coding assistance, automated code review, and adaptive learning paths for programming students.",
    technologies: ["Python", "OpenAI GPT", "React", "Node.js", "MongoDB"],
    features: [
      "AI-powered code analysis and suggestions",
      "Personalized learning path generation",
      "Real-time collaboration tools",
      "Automated assignment grading",
      "Progress tracking and analytics"
    ],
    achievements: [
      "Best Educational Technology Project",
      "Used by 500+ students",
      "Improved student performance by 25%",
      "Featured in EdTech conference"
    ],
    image: "/exi3.jpg",
    demoUrl: "https://codementor.cit.edu",
    githubUrl: "https://github.com/citcode/codementor",
    category: "AI/ML",
    status: "Completed"
  },
  {
    id: "5",
    title: "VirtualLab: Remote Laboratory Access",
    team: ["Thomas Anderson", "Rachel Green", "Mark Johnson"],
    advisor: "Prof. James Wilson",
    department: "Network Administration",
    year: "2024",
    semester: "Fall",
    description: "Cloud-based virtual laboratory platform enabling remote access to network equipment and simulation environments for hands-on learning.",
    technologies: ["Docker", "Kubernetes", "React", "WebRTC", "GNS3"],
    features: [
      "Remote access to network equipment",
      "Virtual machine provisioning",
      "Real-time collaboration features",
      "Automated lab setup and teardown",
      "Performance monitoring and analytics"
    ],
    achievements: [
      "Innovation in Education Award",
      "Enabled remote learning during pandemic",
      "Adopted by 5 other universities",
      "Cost savings of $50,000 annually"
    ],
    image: "/exi8.jpg",
    demoUrl: "https://virtuallab.cit.edu",
    category: "Web Development",
    status: "Completed"
  },
  {
    id: "6",
    title: "GameForge: Collaborative Game Development",
    team: ["Chris Parker", "Nicole Davis", "Ryan Mitchell"],
    advisor: "Prof. Michael Rodriguez",
    department: "Information Systems",
    year: "2025",
    semester: "Spring",
    description: "Collaborative platform for game development teams with integrated version control, asset management, and real-time multiplayer testing capabilities.",
    technologies: ["Unity", "C#", "Node.js", "Socket.io", "AWS S3"],
    features: [
      "Real-time collaborative editing",
      "Integrated version control system",
      "Asset library and management",
      "Multiplayer testing framework",
      "Project analytics and reporting"
    ],
    achievements: [
      "Currently in development",
      "Alpha testing with 50+ users",
      "Interest from indie game studios",
      "Potential for commercialization"
    ],
    image: "/exi2.jpg",
    category: "Game Development",
    status: "In Progress"
  }
];

const categoryColors = {
  "Web Development": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Mobile App": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "AI/ML": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Cybersecurity": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Data Science": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Game Development": "bg-maroon-600 dark:bg-maroon-700 text-white"
};

const statusColors = {
  "Completed": "bg-green-600 dark:bg-green-700 text-white",
  "In Progress": "bg-gray-700 dark:bg-gray-700 text-white",
  "Awarded": "bg-yellow-600 dark:bg-yellow-600 text-white"
};

export default function CapstoneProjects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    
    // Add scroll event listener for scroll-to-top button
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = ['All', 'Web Development', 'Mobile App', 'AI/ML', 'Cybersecurity', 'Data Science', 'Game Development'];
  const statuses = ['All', 'Completed', 'In Progress', 'Awarded'];

  const filteredProjects = capstoneProjects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.team.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300 py-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Capstone Projects</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative final-year projects that demonstrate the practical application of technology 
            skills and creative problem-solving by our talented students.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">{capstoneProjects.length}</div>
            <div className="text-white">Total Projects</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {capstoneProjects.filter(p => p.status === 'Awarded').length}
            </div>
            <div className="text-white">Award Winners</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">6</div>
            <div className="text-white">Categories</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">18</div>
            <div className="text-white">Student Teams</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-maroon-600 dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <div className="text-white dark:text-maroon-100 flex items-center justify-center">
              Showing {filteredProjects.length} of {capstoneProjects.length} projects
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[project.category]}`}>
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                    {project.team.length} Team Members
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-maroon-600 dark:text-maroon-500" />
                    {project.semester} {project.year}
                  </div>
                  <div className="col-span-2">
                    <strong>Advisor:</strong> {project.advisor}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-100 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-maroon-600 dark:text-maroon-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-sm text-gray-500 dark:text-gray-400 italic">
                        +{project.features.length - 3} more features...
                      </li>
                    )}
                  </ul>
                </div>

                {project.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-1 text-yellow-500" />
                      Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <Star className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Team:</strong> {project.team.join(', ')}
                  </div>
                  <div className="flex space-x-2">
                    {project.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-maroon-600 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-800 transition-colors text-sm"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-maroon-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="mt-16 bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-xl p-8 text-center text-white shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Capstone Project?</h2>
          <p className="text-maroon-100 mb-6 max-w-2xl mx-auto">
            Join our innovative students in creating technology solutions that make a real impact. 
            Get guidance from expert faculty and industry mentors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-maroon-700 px-6 py-3 rounded-lg font-semibold hover:bg-maroon-50 transition-colors duration-200"
            >
              Project Guidelines
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-maroon-700 transition-all duration-200"
            >
              Find a Mentor
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}