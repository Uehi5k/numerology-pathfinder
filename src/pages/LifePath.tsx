
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import CalculatorForm from '@/components/CalculatorForm';

const LifePath = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl"
        >
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Calculate Your Life Path Number
          </h1>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Your Life Path number is one of the most important numbers in your numerology chart. It reveals your life's purpose and the path you'll take to fulfill it.
          </p>
        </motion.div>

        <div className="w-full max-w-md">
          <CalculatorForm />
        </div>

        <motion.div 
          className="w-full max-w-3xl glass rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-medium mb-4">How It Works</h2>
          <div className="space-y-4 text-foreground/80">
            <p>
              Your Life Path number is derived from your birth date. Each component—the month, day, and year—is reduced to a single digit or master number.
            </p>
            <p>
              For example, if you were born on October 15, 1990:
            </p>
            <div className="glass-dark p-4 rounded-lg">
              <p className="mb-2"><strong>Month:</strong> October = 10 → 1 + 0 = 1</p>
              <p className="mb-2"><strong>Day:</strong> 15 → 1 + 5 = 6</p>
              <p className="mb-2"><strong>Year:</strong> 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1</p>
              <p className="mt-4 font-medium">Life Path Number: 1 + 6 + 1 = 8</p>
            </div>
            <p className="mt-2">
              Master numbers (11, 22, and 33) are not reduced further as they have special significance in numerology.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LifePath;
