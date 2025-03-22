
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLifePathMeaning } from '@/utils/numerologyCalculator';
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

// Helper functions for additional content
const getStrengths = (num: number): string[] => {
  const strengths: Record<number, string[]> = {
    1: ['Leadership', 'Independence', 'Originality', 'Innovation', 'Self-confidence', 'Ambition'],
    2: ['Diplomacy', 'Cooperation', 'Sensitivity', 'Harmony', 'Adaptability', 'Patience'],
    3: ['Creativity', 'Expression', 'Communication', 'Optimism', 'Inspiration', 'Joy'],
    4: ['Organization', 'Practicality', 'Reliability', 'Determination', 'Discipline', 'Honesty'],
    5: ['Adaptability', 'Freedom', 'Adventure', 'Curiosity', 'Versatility', 'Courage'],
    6: ['Responsibility', 'Compassion', 'Harmony', 'Nurturing', 'Balance', 'Service'],
    7: ['Analysis', 'Wisdom', 'Intuition', 'Spirituality', 'Perfectionism', 'Research'],
    8: ['Ambition', 'Authority', 'Management', 'Achievement', 'Vision', 'Realism'],
    9: ['Compassion', 'Idealism', 'Philanthropy', 'Universality', 'Wisdom', 'Tolerance'],
    11: ['Intuition', 'Idealism', 'Inspiration', 'Spirituality', 'Sensitivity', 'Vision'],
    22: ['Practicality', 'Mastery', 'Vision', 'Power', 'Achievement', 'Leadership'],
    33: ['Compassion', 'Teaching', 'Healing', 'Selflessness', 'Wisdom', 'Nurturing']
  };
  
  return strengths[num] || ['Unknown'];
};

const getLifeLessons = (num: number): string => {
  const lessons: Record<number, string> = {
    1: "Your primary life lesson is to develop independence and self-confidence while also learning when to collaborate with others. Finding balance between autonomy and teamwork is key to your growth.",
    2: "Your lessons revolve around developing patience and diplomacy. You need to learn to stand up for yourself while still maintaining harmony and peace in your relationships.",
    3: "You must learn to focus your creative energies and follow through on projects. Learning to express yourself authentically without seeking constant validation is essential for your development.",
    4: "Your challenge is to find freedom within structure and to develop flexibility. Learning that stability doesn't equal limitation will help you grow beyond perceived restrictions.",
    5: "You need to learn to use your freedom constructively and develop commitment. Finding stability amidst change and avoiding excess are important life lessons.",
    6: "Your lesson is to learn boundaries in your caretaking tendencies and to balance giving to others with self-care. Learning when not to fix everyone's problems is crucial.",
    7: "You must learn to balance intellect with emotion and spirituality with practicality. Sharing your wisdom rather than isolating yourself is an important part of your journey.",
    8: "Learning to use power ethically and to balance material and spiritual wealth are your key lessons. Understanding that true success includes more than financial achievement.",
    9: "Your challenge is to learn to let go and complete cycles in your life. Learning to balance giving to causes with taking care of your personal needs is essential.",
    11: "You must learn to ground your spiritual insights into practical application. Managing sensitivity while maintaining boundaries is a lifelong lesson.",
    22: "Your challenge is to realize your grand visions despite self-doubt. Learning to harness your power for the greater good without being overwhelmed by responsibility.",
    33: "You need to learn to balance your selfless service with personal needs. Finding ways to uplift humanity while maintaining your own well-being is your ongoing challenge."
  };
  
  return lessons[num] || "Your life lessons are unique to your personal journey.";
};

export default Reading;
