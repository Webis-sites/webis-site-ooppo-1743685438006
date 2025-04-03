'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCoffee, FaAward, FaUsers } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div 
        className="text-4xl mb-4 text-secondary"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

export default function AboutUsSection() {
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { once: true, margin: "-100px 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const features = [
    {
      icon: <FaCoffee />,
      title: "איכות ללא פשרות",
      description: "אנו מקפידים על חומרי גלם איכותיים ביותר לכל מנה ומשקה"
    },
    {
      icon: <FaAward />,
      title: "ניסיון מקצועי",
      description: "צוות השפים שלנו בעל ניסיון רב בתחום הקולינרי"
    },
    {
      icon: <FaUsers />,
      title: "שירות מסור",
      description: "אנו מאמינים במתן שירות אישי ומסור לכל לקוח"
    }
  ];

  return (
    <section dir="rtl" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.3,
                delayChildren: 0.2,
                duration: 0.8 
              } 
            }
          }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">אודות ooppo</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-3 bg-secondary opacity-30 w-full -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg leading-relaxed mb-8 text-gray-700"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            אנחנו בית קפה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
          </motion.p>
          
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto my-8"
            variants={{
              hidden: { width: 0 },
              visible: { width: "6rem", transition: { duration: 1 } }
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <motion.div 
          className="mt-16 p-8 bg-white rounded-lg shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px 0px" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-bl-full" />
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">הסיפור שלנו</h3>
              <p className="text-gray-600 mb-4">
                בית הקפה ooppo נוסד מתוך אהבה עמוקה לקפה איכותי ואוכל טוב. המייסדים שלנו, בעלי ניסיון רב בתעשיית המזון, החליטו ליצור מקום שמשלב בין חוויה קולינרית מעולה לאווירה נעימה ומזמינה.
              </p>
              <p className="text-gray-600">
                אנו מאמינים שכל ביקור ב-ooppo צריך להיות חוויה מיוחדת, ולכן אנו משקיעים תשומת לב רבה בכל פרט - מבחירת חומרי הגלם, דרך הכנת המנות, ועד לשירות החם והאישי שאנו מעניקים.
              </p>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-56 h-56 md:w-72 md:h-72 bg-secondary/30 rounded-full flex items-center justify-center">
                    <motion.div 
                      className="w-48 h-48 md:w-64 md:h-64 bg-secondary/40 rounded-full flex items-center justify-center text-white text-5xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaCoffee className="text-white text-4xl md:text-6xl" />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <span className="text-secondary text-xl font-bold">15+</span>
                  <span className="block text-xs text-gray-600">שנות ניסיון</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}