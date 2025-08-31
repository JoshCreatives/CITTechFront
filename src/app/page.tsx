"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Hero from "../components/Hero";
import QuickAccess from "../components/QuickAccess";
import Blog from "../components/Blog";
import Features from "../components/Features";
import EnrollmentBanner from "../components/EnrollmentBanner";
import VideoShowcase from "../components/VideoShowcase";
import PresidentBanner from "../components/PresidentBanner";
import BlogPostView from "../components/BlogPostView";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  const pathname = usePathname();

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
  }, []);

  const handleAnimationEnd = () => {
    setShowAnimation(false);
  };

  const handleAnimationError = () => {
    setShowAnimation(false);
    setIsLoading(false);
  };

  if (isLoading || showAnimation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-white transition-colors duration-300 z-[9999] overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <video
            src="/CIT LOGO ANIMATION.mp4" // Ensure this path is correct
            autoPlay
            muted
            playsInline
            className="w-48 h-48 sm:w-64 sm:h-64 max-w-full"
            onEnded={handleAnimationEnd}
            onError={handleAnimationError}
            key={pathname} // Force re-render on route change
          />
        </div>
      </div>
    );
  }

  if (pathname?.startsWith("/blog/") && pathname !== "/blog") {
    return <BlogPostView />;
  }

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

export default App;
