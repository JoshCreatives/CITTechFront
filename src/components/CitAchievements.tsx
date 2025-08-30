import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Calendar, Users, BookOpen, Globe, TrendingUp, Medal, Crown } from 'lucide-react';
import { motion } from "framer-motion";
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

interface Achievement {
  id: string;
  title: string;
  category: 'Academic' | 'Research' | 'Industry' | 'Student' | 'Faculty' | 'International';
  year: string;
  description: string;
  details: string[];
  impact: string;
  image: string;
  ranking?: string;
  award_body: string;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Top 10 IT College Nationally",
    category: "Academic",
    year: "2024",
    description: "Ranked among the top 10 information technology colleges in the nation by TechEd Rankings for academic excellence and industry partnerships.",
    details: [
      "95% graduate employment rate within 6 months",
      "Average starting salary 25% above national average",
      "Strong industry partnerships with Fortune 500 companies",
      "State-of-the-art facilities and equipment"
    ],
    impact: "Enhanced reputation attracting top-tier students and faculty nationwide",
    image: "/top2.jpg",
    ranking: "#8",
    award_body: "TechEd Rankings"
  },
  {
    id: "2",
    title: "Excellence in Cybersecurity Education",
    category: "Academic",
    year: "2024",
    description: "Designated as a National Center of Academic Excellence in Cyber Defense Education by the NSA and DHS.",
    details: [
      "Rigorous curriculum meeting national standards",
      "Faculty with industry certifications and experience",
      "Advanced cybersecurity laboratory facilities",
      "Strong partnerships with government agencies"
    ],
    impact: "Students eligible for federal cybersecurity scholarships and priority hiring",
    image: "/wangs.jpg",
    award_body: "NSA & Department of Homeland Security"
  },
  {
    id: "3",
    title: "$5M Research Grant Award",
    category: "Research",
    year: "2023",
    description: "Received largest research grant in college history for AI and machine learning research from the National Science Foundation.",
    details: [
      "5-year collaborative research program",
      "Focus on ethical AI and bias reduction",
      "Partnership with 3 major universities",
      "Training 50+ graduate students"
    ],
    impact: "Established CIT as a leading AI research institution",
    image: "/oten.jpg",
    award_body: "National Science Foundation"
  },
  {
    id: "4",
    title: "International Programming Championship",
    category: "Student",
    year: "2024",
    description: "CIT programming team won first place at the International Collegiate Programming Contest (ICPC) World Finals.",
    details: [
      "Competed against 140+ teams worldwide",
      "Solved 11 out of 13 complex algorithmic problems",
      "First-time participation in World Finals",
      "Team members received full scholarships for graduate studies"
    ],
    impact: "Put CIT on the global map for competitive programming excellence",
    image: "/top1.jpg",
    award_body: "International Collegiate Programming Contest"
  },
  {
    id: "5",
    title: "Industry Partnership Excellence Award",
    category: "Industry",
    year: "2024",
    description: "Recognized for outstanding collaboration with technology industry partners in curriculum development and student placement.",
    details: [
      "Partnerships with 50+ technology companies",
      "Co-developed curriculum with industry input",
      "95% job placement rate for graduates",
      "$2M in student scholarships from industry partners"
    ],
    impact: "Graduates are industry-ready with relevant skills and experience",
    image: "/top3.jpg",
    award_body: "National Association of Technology Colleges"
  },
  {
    id: "6",
    title: "Outstanding Faculty Research Recognition",
    category: "Faculty",
    year: "2023",
    description: "Three faculty members received prestigious research awards for contributions to their respective fields.",
    details: [
      "Dr. Sarah Chen - IEEE Fellow for AI research",
      "Dr. Emily Johnson - NSF CAREER Award for cybersecurity",
      "Dr. Lisa Thompson - Best Paper Award at Data Science Conference",
      "Combined research impact factor of 15.7"
    ],
    impact: "Enhanced research reputation and attracted top-tier graduate students",
    image: "/top4.jpg",
    award_body: "Various Professional Organizations"
  },
  {
    id: "7",
    title: "Green Technology Innovation Award",
    category: "Research",
    year: "2024",
    description: "Awarded for developing sustainable technology solutions that reduce campus energy consumption by 30%.",
    details: [
      "IoT-based energy monitoring system",
      "AI-powered optimization algorithms",
      "Student-led sustainability initiatives",
      "$500K annual cost savings"
    ],
    impact: "Model for other institutions seeking sustainable technology solutions",
    image: "/top5.jpg",
    award_body: "Environmental Technology Council"
  },
  {
    id: "8",
    title: "International Student Exchange Excellence",
    category: "International",
    year: "2024",
    description: "Recognized for outstanding international student exchange programs and global partnerships.",
    details: [
      "Exchange programs with 15 countries",
      "200+ international students annually",
      "Dual degree programs with European universities",
      "Cultural diversity and inclusion initiatives"
    ],
    impact: "Enhanced global perspective and cultural competency of graduates",
    image: "/top 6.jpg",
    award_body: "International Education Association"
  }
];

const categoryColors = {
  "Academic": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Research": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Industry": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Student": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "Faculty": "bg-maroon-600 dark:bg-maroon-700 text-white",
  "International": "bg-maroon-600 dark:bg-maroon-700 text-white"
};

const categoryIcons = {
  "Academic": BookOpen,
  "Research": Star,
  "Industry": TrendingUp,
  "Student": Users,
  "Faculty": Award,
  "International": Globe
};

export default function CITAchievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyNow = () => {
    navigate('/student/enrollment');
  };

  const categories = ['All', 'Academic', 'Research', 'Industry', 'Student', 'Faculty', 'International'];
  const years = ['All', '2024', '2023', '2022', '2021'];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || achievement.year === selectedYear;
    return matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CIT Achievements</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Celebrating our remarkable accomplishments in academics, research, industry partnerships, 
            and student success that establish CIT as a leader in technology education.
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
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-white">Major Awards</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">#8</div>
            <div className="text-white">National Ranking</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">$5M</div>
            <div className="text-white">Research Funding</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-maroon-600 dark:bg-maroon-700 rounded-lg p-6 text-center shadow-lg"
          >
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-white">Job Placement</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="text-gray-700 dark:text-gray-300">
              Showing {filteredAchievements.length} of {achievements.length} achievements
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="space-y-8">
          {filteredAchievements.map((achievement, index) => {
            const IconComponent = categoryIcons[achievement.category];
            return (
              <motion.div 
                key={achievement.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 ${index === 0 ? 'ring-2 ring-maroon-600 dark:ring-maroon-500' : ''}`}
              >
                {index === 0 && (
                  <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 text-white text-center py-2">
                    <div className="flex items-center justify-center">
                      <Crown className="h-5 w-5 mr-2 text-white" />
                      <span className="font-semibold">Featured Achievement</span>
                    </div>
                  </div>
                )}
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[achievement.category]}`}>
                        <IconComponent className="h-4 w-4 mr-1 text-white" />
                        {achievement.category}
                      </span>
                      <div className="flex items-center text-sm text-maroon-600 dark:text-white">
                        <Calendar className="h-4 w-4 mr-1" />
                        {achievement.year}
                        {achievement.ranking && (
                          <span className="ml-2 px-2 py-1 bg-maroon-600 dark:bg-maroon-700 text-white rounded-full text-xs font-medium">
                            {achievement.ranking}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{achievement.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {achievement.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <Medal className="h-3 w-3 text-maroon-600 dark:text-maroon-500 mr-2 mt-1 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Impact:</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{achievement.impact}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Awarded by:</strong> {achievement.award_body}
                      </div>
                      <div className="flex items-center text-maroon-600 dark:text-white">
                        <Trophy className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Achievement Unlocked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Trophy className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more achievements.</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="mt-16 bg-gradient-to-r from-maroon-600 to-maroon-700 dark:from-maroon-700 dark:to-maroon-800 rounded-xl p-8 text-center text-white shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Success Story</h2>
          <p className="text-maroon-100 mb-6 max-w-2xl mx-auto">
            Join a college that's making history in technology education. Experience excellence, 
            innovation, and achievement at every level of your academic journey.
          </p>
          <div className="flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApplyNow}
              className="bg-white text-maroon-700 px-8 py-3 rounded-lg font-semibold hover:bg-maroon-50 transition-colors duration-200 shadow-lg"
            >
              Apply Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}