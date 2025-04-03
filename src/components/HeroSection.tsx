'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaArrowLeft } from 'react-icons/fa';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add any additional initialization logic here if needed
  }, []);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default action if no handler is provided
      console.log('CTA clicked');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="hero-section relative min-h-[90vh] bg-gradient-to-br from-white to-gray-100 overflow-hidden rtl"
      dir="rtl"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[15%] w-32 h-32 rounded-full bg-primary opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full bg-secondary opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Text content */}
        <motion.div 
          className="lg:w-1/2 text-right mb-12 lg:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="inline-block mb-4 bg-primary text-white px-4 py-2 rounded-lg"
            variants={itemVariants}
          >
            <FaCoffee className="inline-block ml-2" />
            <span>אוופו קפה</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
            variants={itemVariants}
          >
            בית קפה <span className="text-primary">מוביל</span> בישראל
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-8"
            variants={itemVariants}
          >
            חווית לקוח מושלמת בכל ביקור
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleCtaClick}
              className="cta-button bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              קבע תור עכשיו
              <FaArrowLeft className="mr-2 animate-pulse" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex items-center justify-end space-x-4 space-x-reverse"
            variants={itemVariants}
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={floatingAnimation}
                transition={{
                  delay: i * 0.3,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Image/visual section */}
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative">
            <motion.div 
              className="w-full h-[400px] md:h-[500px] bg-[url('/images/cafe-atmosphere.jpg')] bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="text-primary font-bold text-xl">4.9 ★</div>
              <div className="text-sm text-gray-600">ביקורות מעולות</div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-3 rounded-full shadow-lg"
              animate={floatingAnimation}
            >
              <FaCoffee className="text-primary text-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scrolling indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}