
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberCardProps {
  number: number;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const NumberCard: React.FC<NumberCardProps> = ({ 
  number, 
  title, 
  description, 
  onClick,
  className
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass rounded-xl p-6 cursor-pointer overflow-hidden relative group",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-accent/10" />
      <div className="flex flex-col space-y-2 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center w-12 h-12 text-2xl font-semibold rounded-full bg-accent/10 text-accent"
          >
            {number}
          </motion.span>
          <span className="text-xs px-2 py-1 rounded-full bg-foreground/5 text-foreground/80">
            {title}
          </span>
        </div>
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <p className="text-sm text-foreground/70 line-clamp-3">{description}</p>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-accent/30"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default NumberCard;
