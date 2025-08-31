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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  const pathname = usePathname();

  // Handle loading state for initial load and route changes
  useEffect(() => {
    setIsLoading(true);
    setShowAnimation(true);

    const fadingLoadingPage = document.getElementById("page-loading-container");
    if (fadingLoadingPage) {
      setTimeout(() => {
        fadingLoadingPage.classList.remove("opacity-100");
        fadingLoadingPage.classList.add("opacity-0");
      }, 1000);
    }

    // Minimum display time for animation (1 second)
    const animationTimer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    // Maximum loading time (2 seconds)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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

  const pageLoader = () => (
    <div
      id="page-loading-container"
      className="fixed z-100 inset-0 flex items-center justify-center bg-white dark:bg-white z-[9999] overflow-hidden opacity-100 transition-opacity duration-500 ease-out"
    >
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

  return (
    <>
      <Hero />
      <EnrollmentBanner />
      <PresidentBanner />
      <QuickAccess />
      <Blog />
      <VideoShowcase />
      <Features />

      {(isLoading || showAnimation) && pageLoader()}
    </>
  );
}

export default App;
