
import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface LifePathCardProps {
  lifePath: number;
  title: string;
  meaning: string;
  formattedDate?: string;
}

const LifePathCard: React.FC<LifePathCardProps> = ({ 
  lifePath, 
  title, 
  meaning, 
  formattedDate 
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Life Path Number is ${lifePath}: ${title}`,
        text: `I discovered my Life Path number is ${lifePath}. ${title}: ${meaning?.slice(0, 100)}...`,
        url: window.location.href,
      })
      .catch(() => {
        toast.error("Couldn't share your reading");
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast.success('Link copied to clipboard!');
        })
        .catch(() => {
          toast.error("Couldn't copy link to clipboard");
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div className="relative h-40 bg-gradient-to-r from-accent/20 to-accent/5 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute h-32 w-32 rounded-full bg-accent/10 backdrop-blur-md flex items-center justify-center border border-accent/20"
        >
          <span className="text-6xl font-light text-accent">{lifePath}</span>
        </motion.div>
        
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-accent/10 transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-8">
        {formattedDate && (
          <div className="mb-6 text-center">
            <p className="text-sm text-foreground/60">Birth Date</p>
            <p className="text-lg font-medium">{formattedDate}</p>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-medium mb-2">Life Path {lifePath}</h1>
          <h2 className="text-xl text-accent">{title}</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-foreground/80 leading-relaxed">{meaning}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LifePathCard;
