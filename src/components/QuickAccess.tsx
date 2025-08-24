import { GraduationCap, Users, BookOpen, Computer } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const QuickAccess = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollOffset(-30);
      } else {
        setScrollOffset(0);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="py-16 overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Events Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-maroon-600 dark:text-maroon-500 mb-4">
            Events
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Explore upcoming events, campus activities, and more at SIIT.
          </p>
        </motion.div>

        {/* Grid Sections */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          animate={{ y: scrollOffset }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Image with Smooth Hover Effect */}
              <motion.div
                className="relative h-64"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-200">
                      {section.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <section.icon className="h-8 w-8 text-maroon-600 dark:text-white" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {section.subtitle}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {section.subtext}
                    </p>
                  </div>
                </div>
                <a
                  href={section.link}
                  className="text-maroon-600 dark:text-maroon-500 hover:text-maroon-800 dark:hover:text-maroon-300 font-medium text-sm hover:underline hover:underline-offset-4 transition-all"
                >
                  {section.linkText} →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Section Data (unchanged)
const sections = [
  {
    title: "Faculty meeting",
    description: "Meet the CIT Instructors",
    image: "./p4.jpg",
    icon: GraduationCap,
    subtitle: "Engineering & Technology",
    subtext: "Leading-edge technical education",
    link: "/blog",
    linkText: "Explore Programs",
  },
  {
    title: "CIT Pinning Ceremony",
    description: "1st CIT Pinning",
    image: "./p5.jpg",
    icon: Users,
    subtitle: "4th year CIT",
    subtext: "Meet & Great your seniors",
    link: "/blog",
    linkText: "Learn More",
  },
  {
    title: "Start Your Journey",
    description: "Apply to CIT course today",
    image: "p2.jpg",
    icon: BookOpen,
    subtitle: "Admission Requirements",
    subtext: "Everything you need to know",
    link: "/student/enrollment",
    linkText: "Learn More",
  },
  {
    title: "Computer laboratory",
    description: "Over 100 computers",
    image: "./p1.jpg",
    icon: Computer,
    subtitle: "Department Laboratory",
    subtext: "State-of-the-art facilities",
    link: "/about/facilabs",
    linkText: "View Campuses",
  },
];

export default QuickAccess;