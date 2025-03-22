
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Calculator, BookOpen, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <motion.div 
            className="h-24 w-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <span className="text-4xl font-light text-accent">9</span>
          </motion.div>
          
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Discover Your Life Path Through Numerology
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Uncover the hidden meanings behind your birth numbers and gain insights into your life's purpose, challenges, and potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/life-path" 
              className="glass hover:shadow-md group block h-full p-6 rounded-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-accent" />
                </div>
                <h3 className="ml-4 text-xl font-medium">Life Path Calculator</h3>
              </div>
              <p className="text-foreground/70">
                Calculate your Life Path number based on your birth date to discover your core personality traits and life purpose.
              </p>
              <div className="flex items-center mt-4 text-accent font-medium">
                <span>Calculate now</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/numbers" 
              className="glass hover:shadow-md group block h-full p-6 rounded-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <h3 className="ml-4 text-xl font-medium">Number Meanings</h3>
              </div>
              <p className="text-foreground/70">
                Explore the meanings and influences of different numerology numbers and how they may affect various aspects of your life.
              </p>
              <div className="flex items-center mt-4 text-accent font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="w-full max-w-4xl glass rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-medium mb-4">What is Numerology?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Numerology is the belief in the divine and mystical relationship between numbers and events. It is the study of the numerical value of letters in words, names, and ideas. Through these numbers, you can discover talents, opportunities, and obstacles present in your life.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
