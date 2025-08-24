import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const PresidentBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -50px 0px" });

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [lastInView, setLastInView] = useState(false);

  useEffect(() => {
    if (isInView && !lastInView) {
      setShouldAnimate(true);
    }
    if (!isInView) {
      setShouldAnimate(false);
    }
    setLastInView(isInView);
  }, [isInView, lastInView]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full h-auto flex flex-col md:flex-row bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px]">
        <img
          src="./JUNRY.jpg"
          alt="School President with Students"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section (Animated) */}
      <div
        ref={ref}
        className="w-full md:w-1/2 h-auto md:h-[600px] bg-maroon-700 dark:bg-white flex flex-col justify-center p-8 md:p-16 text-center md:text-left transition-colors duration-300"
      >
        <motion.span
          className="text-maroon-100 dark:text-black text-4xl md:text-6xl font-semibold uppercase"
          variants={textVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          CIT DEPARTMENT
        </motion.span>

        <motion.h2
          className="text-white dark:text-maroon-600 text-6xl md:text-9xl font-bold italic mt-2"
          variants={textVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          DEAN
        </motion.h2>

        <motion.p
          className="text-maroon-50 dark:text-black text-2xl md:text-5xl mt-2"
          variants={textVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          JUNRY T. VALENZUELA, MIT
        </motion.p>

        <motion.a
          href="/about/president"
          className="mt-6 md:mt-8 bg-white dark:bg-maroon-600 text-maroon-600 dark:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg md:text-xl font-bold hover:bg-gray-200 dark:hover:bg-maroon-700 transition-all w-fit mx-auto md:mx-0"
          variants={textVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          Learn More
        </motion.a>
      </div>
    </div>
  );
};

export default PresidentBanner;