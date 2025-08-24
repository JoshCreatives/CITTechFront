import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickAccess from './components/QuickAccess';
import Blog from './components/Blog';
import Features from './components/Features';
import FacultyDirectory from './components/FacultyDirectory';
import FacultyAchievements from './components/FacultyAchievements';
import OfficeHours from './components/OfficeHours';
import CoursesHandled from './components/CoursesHandled';
import EnrollmentBanner from './components/EnrollmentBanner';
import VideoShowcase from './components/VideoShowcase';
import PresidentBanner from './components/PresidentBanner';
import ClassSchedules from './components/ClassSchedules';
import StudentHandbook from './components/StudentHandbook';
import CampusLife from './components/CampusLife';
import BlogPage from './components/BlogPage';
import History from './components/History';
import Footer from './components/Footer';
import CitAchievements from './components/CitAchievements';
import AlumniStories from './components/AlumniStories';
import AlumniAssociation from './components/AlumniAssociation';
import QualityManagement from './components/QualityManagement';
import PresidentProfile from './components/PresidentProfile';
import ITExibits from './components/ITExibits';
import CapstoneProject from './components/CapstoneProject';
import BlogPostView from './components/BlogPostView';
import AboutCIT from './pages/about-cit';
import AdminDashboard from '../app/admin/AdminDashboard';
import EnrollmentGuidelines from './components/EnrollmentGuidelines';
import StudentDownloadables from './components/StudentDownloadables';
import FacilitiesAndLabs from './components/FacilitiesAndLabs';
import MissionVision from './components/MissionVision';

// Theme hook
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { theme, toggleTheme };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Handle loading state for initial load and route changes
  useEffect(() => {
    setIsLoading(true);
    setShowAnimation(true);
    
    // Minimum display time for animation (1 second)
    const animationTimer = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);

    // Maximum loading time (2 seconds)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(loadingTimer);
    };
  }, [location.pathname]);

  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  const handleAnimationError = () => {
    setShowAnimation(false);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (location.pathname.startsWith('/blog/') && location.pathname !== '/blog') {
      return <BlogPostView />;
    }

    switch (location.pathname) {
      case '/Faculty/directory': return <FacultyDirectory />;
      case '/Faculty/achievements': return <FacultyAchievements />;
      case '/Faculty/hours': return <OfficeHours />;
      case '/Faculty/course': return <CoursesHandled />;
      case '/sched/classsched': return <ClassSchedules />;
      case '/student/handbook': return <StudentHandbook />;
      case '/campus-life': return <CampusLife />;
      case '/blog': return <BlogPage />;
      case '/about/history': return <History />;
      case '/about/citachievements': return <CitAchievements />;
      case '/alumni/stories': return <AlumniStories />;
      case '/alumni/association': return <AlumniAssociation />;
      case '/about/quality': return <QualityManagement />;
      case '/about/president': return <PresidentProfile />;
      case '/about/exibits': return <ITExibits />;
      case '/about-cit': return <AboutCIT />;
      case '/student/enrollment': return <EnrollmentGuidelines />;
      case '/student/files': return <StudentDownloadables />;
      case '/about/facilabs': return <FacilitiesAndLabs />;
      case '/about/capstone': return <CapstoneProject />;
      case '/admin': return <AdminDashboard />;
      case '/about/mission': return <MissionVision />;
      default:
        return (
          <>
            <Hero />
            <EnrollmentBanner />
            <PresidentBanner />
            <QuickAccess />
            <Blog />
            <VideoShowcase />
            <Features />
          </>
        );
    }
  };

  if (isLoading || showAnimation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-white transition-colors duration-300 z-[9999]">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <video
            src="/CIT LOGO ANIMATION.mp4" // Ensure this path is correct
            autoPlay
            muted
            playsInline
            className="w-48 h-48 sm:w-64 sm:h-64 max-w-full"
            onEnded={handleAnimationEnd}
            onError={handleAnimationError}
            key={location.pathname} // Force re-render on route change
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-16">
        {renderContent()}
      </main>
      <Footer />
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-maroon-800'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-300">
          <p>© {new Date().getFullYear()} SIIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;