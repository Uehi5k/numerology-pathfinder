
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import CalculatorForm from '@/components/CalculatorForm';
import NumerologyCalculationGuide from '@/components/NumerologyCalculationGuide';

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
            Calculate Your Numerology Profile
          </h1>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Discover your Life Path, Attitude, Generation, and Day of Birth numbers. Each number reveals different aspects of your character and destiny.
          </p>
        </motion.div>

        <div className="w-full max-w-md">
          <CalculatorForm />
        </div>

        <NumerologyCalculationGuide />
      </div>
    </Layout>
  );
};

export default LifePath;
