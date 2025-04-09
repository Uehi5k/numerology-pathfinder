
import React from 'react';
import { motion } from 'framer-motion';
import { NumerologyInsight } from '@/types/numerology';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface NumerologyInsightCardProps {
  insight: NumerologyInsight;
}

const NumerologyInsightCard: React.FC<NumerologyInsightCardProps> = ({ insight }) => {
  // Determine background gradient based on insight type
  const getBgGradient = (type: string) => {
    switch (type) {
      case 'lifePath':
        return 'from-accent/20 to-accent/5';
      case 'attitude':
        return 'from-purple-500/20 to-purple-500/5';
      case 'generation':
        return 'from-green-500/20 to-green-500/5';
      case 'dayOfBirth':
        return 'from-blue-500/20 to-blue-500/5';
      default:
        return 'from-gray-500/20 to-gray-500/5';
    }
  };
  
  // Determine accent color based on insight type
  const getAccentColor = (type: string) => {
    switch (type) {
      case 'lifePath':
        return 'text-accent';
      case 'attitude':
        return 'text-purple-500';
      case 'generation':
        return 'text-green-500';
      case 'dayOfBirth':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl overflow-hidden"
    >
      <div className={`relative h-40 bg-gradient-to-r ${getBgGradient(insight.type)} flex items-center justify-center`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`absolute h-32 w-32 rounded-full bg-accent/10 backdrop-blur-md flex items-center justify-center border border-accent/20`}
        >
          <span className={`text-6xl font-light ${getAccentColor(insight.type)}`}>{insight.number}</span>
        </motion.div>
      </div>
      
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-medium mb-2">
            {insight.title}
          </h2>
        </motion.div>
        
        <p className="text-foreground/80 leading-relaxed mb-6">{insight.description}</p>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="formula">
            <AccordionTrigger>How is this calculated?</AccordionTrigger>
            <AccordionContent>
              <p className="text-foreground/70">{insight.formula}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default NumerologyInsightCard;
