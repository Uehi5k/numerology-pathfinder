
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLifePathMeaning, getStrengths, getLifeLessons } from '@/utils/numerologyCalculator';
import { ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const Reading = () => {
  const [searchParams] = useSearchParams();
  const lifePath = parseInt(searchParams.get('lifePath') || '0');
  const birthdate = searchParams.get('birthdate');
  
  const [meaning, setMeaning] = useState<{ title: string; meaning: string } | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  
  useEffect(() => {
    if (lifePath) {
      setMeaning(getLifePathMeaning(lifePath));
    }
    
    if (birthdate) {
      const date = new Date(birthdate);
      setFormattedDate(new Intl.DateTimeFormat('en-US', {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric'
      }).format(date));
    }
  }, [lifePath, birthdate]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Life Path Number is ${lifePath}: ${meaning?.title}`,
        text: `I discovered my Life Path number is ${lifePath}. ${meaning?.title}: ${meaning?.meaning?.slice(0, 100)}...`,
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
  
  if (!lifePath || !meaning) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-medium mb-4">No Life Path Number Selected</h1>
          <p className="text-foreground/70 mb-6">Please calculate your Life Path number first.</p>
          <Link 
            to="/life-path"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Go to Calculator
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-4xl">
          <Link 
            to={birthdate ? "/life-path" : "/numbers"}
            className="inline-flex items-center mb-8 text-foreground/70 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{birthdate ? "Back to Calculator" : "Back to Numbers"}</span>
          </Link>
          
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
              {birthdate && formattedDate && (
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
                <h2 className="text-xl text-accent">{meaning.title}</h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="glass-dark p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Life Path Overview</h3>
                  <p className="text-foreground/80 leading-relaxed">{meaning.meaning}</p>
                </div>
                
                <div className="glass-dark p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Strengths</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getStrengths(lifePath).map((strength, index) => (
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
                  <p className="text-foreground/80 leading-relaxed">{getLifeLessons(lifePath)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Reading;
