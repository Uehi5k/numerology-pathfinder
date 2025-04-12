
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
      case 'expression':
        return 'from-orange-500/20 to-orange-500/5';
      case 'soulUrge':
        return 'from-pink-500/20 to-pink-500/5';
      case 'personality':
        return 'from-yellow-500/20 to-yellow-500/5';
      case 'maturity':
        return 'from-teal-500/20 to-teal-500/5';
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
      case 'expression':
        return 'text-orange-500';
      case 'soulUrge':
        return 'text-pink-500';
      case 'personality':
        return 'text-yellow-500';
      case 'maturity':
        return 'text-teal-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get calculation example based on insight type
  const getCalculationExample = (type: string) => {
    switch (type) {
      case 'lifePath':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> October 15, 1990</p>
            <p className="mb-1"><strong>Month:</strong> October = 10 → 1 + 0 = 1</p>
            <p className="mb-1"><strong>Day:</strong> 15 → 1 + 5 = 6</p>
            <p className="mb-1"><strong>Year:</strong> 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1</p>
            <p className="mt-2 font-medium">Life Path Number: 1 + 6 + 1 = 8</p>
          </div>
        );
      case 'attitude':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> October 15</p>
            <p className="mb-1"><strong>Month:</strong> October = 10 → 1 + 0 = 1</p>
            <p className="mb-1"><strong>Day:</strong> 15 → 1 + 5 = 6</p>
            <p className="mt-2 font-medium">Attitude Number: 1 + 6 = 7</p>
          </div>
        );
      case 'generation':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> Born in 1990</p>
            <p className="mb-1"><strong>Year:</strong> 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1</p>
            <p className="mt-2 font-medium">Generation Number: 1</p>
          </div>
        );
      case 'dayOfBirth':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> Born on October 15</p>
            <p className="mt-2 font-medium">Day of Birth Number: 15</p>
            <p className="mt-1 text-xs text-foreground/70">(This number is not reduced to a single digit)</p>
          </div>
        );
      case 'expression':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> John Smith</p>
            <p className="mb-1"><strong>Letters:</strong> J(1) + O(6) + H(8) + N(5) + S(1) + M(4) + I(9) + T(2) + H(8)</p>
            <p className="mb-1"><strong>Sum:</strong> 1 + 6 + 8 + 5 + 1 + 4 + 9 + 2 + 8 = 44</p>
            <p className="mb-1"><strong>Reduced:</strong> 4 + 4 = 8</p>
            <p className="mt-2 font-medium">Expression Number: 8</p>
          </div>
        );
      case 'soulUrge':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> John Smith</p>
            <p className="mb-1"><strong>Vowels:</strong> O(6) + I(9)</p>
            <p className="mb-1"><strong>Sum:</strong> 6 + 9 = 15</p>
            <p className="mb-1"><strong>Reduced:</strong> 1 + 5 = 6</p>
            <p className="mt-2 font-medium">Soul Urge Number: 6</p>
          </div>
        );
      case 'personality':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> John Smith</p>
            <p className="mb-1"><strong>Consonants:</strong> J(1) + H(8) + N(5) + S(1) + M(4) + T(2) + H(8)</p>
            <p className="mb-1"><strong>Sum:</strong> 1 + 8 + 5 + 1 + 4 + 2 + 8 = 29</p>
            <p className="mb-1"><strong>Reduced:</strong> 2 + 9 = 11 (master number, not reduced further)</p>
            <p className="mt-2 font-medium">Personality Number: 11</p>
          </div>
        );
      case 'maturity':
        return (
          <div className="mt-3 p-3 bg-background/40 rounded-lg text-sm">
            <p className="mb-2"><strong>Example:</strong> Life Path 8, Expression 6</p>
            <p className="mb-1"><strong>Sum:</strong> 8 + 6 = 14</p>
            <p className="mb-1"><strong>Reduced:</strong> 1 + 4 = 5</p>
            <p className="mt-2 font-medium">Maturity Number: 5</p>
          </div>
        );
      default:
        return null;
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
              {getCalculationExample(insight.type)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default NumerologyInsightCard;
