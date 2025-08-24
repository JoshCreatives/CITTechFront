import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Preload the image for faster loading
  useEffect(() => {
    const img = new Image();
    img.src = "/Hero.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Background image with upward animation */}
            <motion.img
              src="/Hero.jpg"
              alt="Welcome to CIT"
              className="w-full h-full object-cover absolute inset-0"
              initial={{ y: 100, scale: 1.1 }}
              animate={
                imageLoaded
                  ? {
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 1.2,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
              onAnimationComplete={() => setAnimationComplete(true)}
              style={{ zIndex: 1 }}
              loading="eager"
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }} />
          </div>
          
          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
            <div className="text-center text-white px-4 max-w-4xl">
              {/* Title with left slide animation */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ x: -100, opacity: 0 }}
                animate={
                  animationComplete
                    ? { x: 0, opacity: 1, transition: { duration: 0.8 } }
                    : {}
                }
              >
                Welcome to CIT
              </motion.h1>
              
              {/* Description with left slide animation */}
              <motion.p
                className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
                initial={{ x: -100, opacity: 0 }}
                animate={
                  animationComplete
                    ? {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.8, delay: 0.2 },
                      }
                    : {}
                }
              >
                Shaping Future Leaders Through Quality Education
              </motion.p>
              
              {/* Button with fade animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  animationComplete
                    ? {
                        opacity: 1,
                        transition: { duration: 0.5, delay: 0.4 },
                      }
                    : {}
                }
              >
                <a
                  href="/about-cit"
                  className="bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-lg font-semibold hover:bg-red-900 transition-colors inline-block"
                >
                  Learn more
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;