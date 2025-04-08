
import React from 'react';
import { motion } from 'framer-motion';

interface LifePathDetailsProps {
  meaning: string;
  strengths: string[];
  lifeLessons: string;
}

const LifePathDetails: React.FC<LifePathDetailsProps> = ({ 
  meaning, 
  strengths, 
  lifeLessons 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="glass-dark p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Life Path Overview</h3>
        <p className="text-foreground/80 leading-relaxed">{meaning}</p>
      </div>
      
      <div className="glass-dark p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Strengths</h3>
        <div className="grid grid-cols-2 gap-2">
          {strengths.map((strength, index) => (
            <div 
              key={index} 
              className="bg-accent/5 px-3 py-2 rounded-md text-sm"
            >
              {strength}
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-dark p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Life Lessons</h3>
        <p className="text-foreground/80 leading-relaxed">{lifeLessons}</p>
      </div>
    </motion.div>
  );
};

export default LifePathDetails;
