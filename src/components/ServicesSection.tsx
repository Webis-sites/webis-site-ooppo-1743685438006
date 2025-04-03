'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaGlassCheers, FaCoffee, FaMusic, FaBirthdayCake } from 'react-icons/fa';
import { MdCatering, MdEventAvailable } from 'react-icons/md';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 0,
      title: 'קייטרינג',
      description: 'שירותי קייטרינג מותאמים אישית לאירועים קטנים וגדולים, עם תפריט עשיר ומגוון המשלב את הטעמים הייחודיים של בית הקפה שלנו.',
      icon: <MdCatering className="text-4xl" />
    },
    {
      id: 1,
      title: 'אירועים פרטיים',
      description: 'אירוח אירועים פרטיים באווירה אינטימית ומיוחדת. מתאים למסיבות, אירועים עסקיים, או כל אירוע שדורש מקום ייחודי.',
      icon: <MdEventAvailable className="text-4xl" />
    },
    {
      id: 2,
      title: 'קפה מיוחד',
      description: 'תערובות קפה ייחודיות וטכניקות הכנה מתקדמות. הבאריסטות המומחים שלנו מכינים את הקפה המושלם בכל פעם.',
      icon: <FaCoffee className="text-4xl" />
    },
    {
      id: 3,
      title: 'ערבי בידור',
      description: 'ערבי מוזיקה חיה, הופעות אמן, וערבי שירה. אנו מארחים כישרונות מקומיים ויוצרים חוויה תרבותית עשירה.',
      icon: <FaMusic className="text-4xl" />
    },
    {
      id: 4,
      title: 'אירועי יום הולדת',
      description: 'חגיגות יום הולדת מיוחדות עם תפריט מותאם אישית ואווירה חגיגית. נדאג לכל הפרטים כדי שהיום המיוחד שלכם יהיה מושלם.',
      icon: <FaBirthdayCake className="text-4xl" />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible, services.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-light mb-3 tracking-wide"
          >
            השירותים שלנו
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1 bg-secondary mx-auto mb-6"
          ></motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            בית הקפה ooppo מציע מגוון שירותים ייחודיים המשלבים את האהבה שלנו לקפה, אוכל ובידור
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full md:w-1/3 flex flex-col gap-4"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`cursor-pointer p-4 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                  activeService === service.id
                    ? 'bg-secondary text-white shadow-lg'
                    : 'bg-white hover:bg-gray-100 shadow'
                }`}
                onClick={() => setActiveService(service.id)}
                whileHover={{ x: 5 }}
              >
                <div className={`text-2xl ${activeService === service.id ? 'text-white' : 'text-secondary'}`}>
                  {service.icon}
                </div>
                <h3 className="font-medium text-lg">{service.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full md:w-2/3 relative min-h-[300px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-8 rounded-lg shadow-xl w-full h-full flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-medium mb-4">{services[activeService].title}</h3>
                <p className="text-gray-600 leading-relaxed">{services[activeService].description}</p>
                
                <div className="mt-8 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-secondary text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    פרטים נוספים
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 border border-secondary text-secondary rounded-md hover:bg-secondary/10 transition-all duration-300"
                  >
                    צור קשר
                  </motion.button>
                </div>

                <div className="absolute -z-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-secondary"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUtensils className="text-secondary text-2xl" />
              <h3 className="text-xl font-medium">תפריט מותאם אישית</h3>
            </div>
            <p className="text-gray-600">אנו מתאימים את התפריט שלנו לצרכים ולהעדפות הספציפיים שלך, עם אפשרויות לכל סוגי התזונה והטעמים.</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-secondary"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaGlassCheers className="text-secondary text-2xl" />
              <h3 className="text-xl font-medium">חבילות משקאות</h3>
            </div>
            <p className="text-gray-600">חבילות משקאות מיוחדות לאירועים, כולל קוקטיילים ייחודיים, יינות מובחרים, ומשקאות קפה מיוחדים.</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-secondary"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaMusic className="text-secondary text-2xl" />
              <h3 className="text-xl font-medium">בידור חי</h3>
            </div>
            <p className="text-gray-600">אפשרויות בידור מגוונות לאירועים שלכם, כולל מוזיקאים, די-ג'יי, ואמנים מקומיים לחוויה בלתי נשכחת.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;