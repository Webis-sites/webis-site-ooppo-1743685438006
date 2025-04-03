'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee, FaCookie, FaUtensils, FaEye, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';

// Product type definition
type Product = {
  id: string;
  name: string;
  hebrewName: string;
  description: string;
  price: number;
  image: string;
  category: 'beverages' | 'pastries' | 'mainDishes';
};

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    hebrewName: 'אספרסו',
    description: 'ריח עשיר וטעם חזק, מיוצר מפולי קפה איכותיים',
    price: 12,
    image: '/images/espresso.jpg',
    category: 'beverages',
  },
  {
    id: '2',
    name: 'Cappuccino',
    hebrewName: 'קפוצ׳ינו',
    description: 'אספרסו עם חלב מוקצף וקצת קצף חלב מעל',
    price: 16,
    image: '/images/cappuccino.jpg',
    category: 'beverages',
  },
  {
    id: '3',
    name: 'Croissant',
    hebrewName: 'קרואסון',
    description: 'קרואסון חמאה פריך אפוי במקום',
    price: 14,
    image: '/images/croissant.jpg',
    category: 'pastries',
  },
  {
    id: '4',
    name: 'Cheese Cake',
    hebrewName: 'עוגת גבינה',
    description: 'עוגת גבינה קרמית עם תחתית ביסקוויטים',
    price: 18,
    image: '/images/cheesecake.jpg',
    category: 'pastries',
  },
  {
    id: '5',
    name: 'Shakshuka',
    hebrewName: 'שקשוקה',
    description: 'ביצים ברוטב עגבניות עם תבלינים מסורתיים',
    price: 42,
    image: '/images/shakshuka.jpg',
    category: 'mainDishes',
  },
  {
    id: '6',
    name: 'Avocado Toast',
    hebrewName: 'טוסט אבוקדו',
    description: 'לחם כוסמין עם אבוקדו טרי, ביצה עלומה ושמן זית',
    price: 38,
    image: '/images/avocado-toast.jpg',
    category: 'mainDishes',
  },
];

// Category type and data
type Category = {
  id: string;
  name: string;
  hebrewName: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: 'all', name: 'All', hebrewName: 'הכל', icon: <FaUtensils /> },
  { id: 'beverages', name: 'Beverages', hebrewName: 'משקאות', icon: <FaCoffee /> },
  { id: 'pastries', name: 'Pastries', hebrewName: 'מאפים', icon: <FaCookie /> },
  { id: 'mainDishes', name: 'Main Dishes', hebrewName: 'מנות עיקריות', icon: <FaUtensils /> },
];

// QuickView component
const QuickView = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
        
        <div className="h-64 relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="text-right">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{product.hebrewName}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <button className="bg-primary text-white py-2 px-6 rounded-full flex items-center gap-2 hover:bg-primary-dark transition-colors">
              <FaShoppingCart /> הוסף להזמנה
            </button>
            <span className="text-xl font-bold text-primary">₪{product.price}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ProductCard component
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
            >
              <button
                onClick={() => setShowQuickView(true)}
                className="bg-white text-primary rounded-full p-3 hover:bg-primary hover:text-white transition-colors"
              >
                <FaEye size={20} />
              </button>
            </motion.div>
          )}
        </div>
        
        <div className="p-4 text-right">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{product.hebrewName}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">₪{product.price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs bg-primary text-white py-1 px-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              הוסף להזמנה
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {showQuickView && (
          <QuickView product={product} onClose={() => setShowQuickView(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const ProductsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(sampleProducts);
    } else {
      setFilteredProducts(
        sampleProducts.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <section className="py-16 bg-gray-50 dir-rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">התפריט שלנו</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            גלו את מגוון המוצרים האיכותיים שלנו, מקפה משובח ועד מנות מפנקות
          </p>
        </motion.div>

        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 py-2 px-6 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.hebrewName}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default ProductsShowcase;