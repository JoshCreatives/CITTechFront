import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/Hero.jpg",
    title: "Welcome to CIT",
    description: "Shaping Future Leaders Through Quality Education",
  },
  {
    image: "/Hero1.jpg",
    title: "Modern Learning Facilities",
    description: "State-of-the-art laboratories and classrooms",
  },
];

const SLICE_COUNT = 8;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-[600px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={currentSlide === index ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, zIndex: 10 },
              hidden: { opacity: 0, zIndex: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover absolute inset-0"
                initial={false}
                animate={
                  currentSlide === index
                    ? { scale: 1, filter: "brightness(1)" }
                    : { scale: 1.1, filter: "brightness(0.8)" }
                }
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                style={{ zIndex: 1 }}
              />
              
              {Array.from({ length: SLICE_COUNT }).map((_, sliceIdx) => (
                <motion.div
                  key={sliceIdx}
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: `${100 / SLICE_COUNT}%`,
                    left: `${(100 / SLICE_COUNT) * sliceIdx}%`,
                    overflow: "hidden",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                  initial={{
                    y: 0,
                    opacity: 0.5,
                    scaleY: 0.9,
                  }}
                  animate={
                    currentSlide === index
                      ? {
                          y: 0,
                          opacity: 0,
                          scaleY: 1,
                          transition: {
                            delay: 0.1 + sliceIdx * 0.07,
                            duration: 0.6,
                            ease: "easeOut",
                          },
                        }
                      : {
                          y: 40,
                          opacity: 0.5,
                          scaleY: 0.9,
                          transition: {
                            delay: 0.05 + sliceIdx * 0.04,
                            duration: 0.5,
                            ease: "easeIn",
                          },
                        }
                  }
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)`,
                      borderRadius: "0 0 40% 40%/0 0 100% 100%",
                    }}
                  />
                </motion.div>
              ))}
              
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
              <div className="text-center text-white px-4">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center"
                  initial="hidden"
                  animate="visible"
                  key={currentSlide}
                >
                  {slide.title.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, scaleX: 0, filter: "blur(4px)" },
                        visible: {
                          opacity: 1,
                          scaleX: 1,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.25,
                            delay: i * 0.07,
                          },
                        },
                      }}
                      style={{
                        display: "inline-block",
                        whiteSpace: "pre",
                        fontFamily: "Orbitron, 'Segoe UI', monospace",
                        transformOrigin: "left",
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {slide.description}
                </motion.p>
                <a
                  href="/about-cit"
                  className="bg-maroon-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-lg font-semibold hover:bg-maroon-700 transition-colors inline-block"
                >
                  Learn more
                </a>
              </div>
            </div>
          </motion.div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all opacity-0 hover:opacity-100 z-50"
        >
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all opacity-0 hover:opacity-100 z-50"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;