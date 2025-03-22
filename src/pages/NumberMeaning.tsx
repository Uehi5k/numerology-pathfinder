
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import NumberCard from '@/components/NumberCard';
import { getAllNumberMeanings } from '@/utils/numerologyCalculator';
import { useNavigate } from 'react-router-dom';

const NumberMeaning = () => {
  const numberMeanings = getAllNumberMeanings();
  const navigate = useNavigate();
  
  const handleCardClick = (number: number) => {
    navigate(`/reading?lifePath=${number}`);
  };
  
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
            Numerology Number Meanings
          </h1>
          <p className="mt-4 text-lg leading-8 text-foreground/70">
            Explore the unique qualities and influences associated with each Life Path number.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {numberMeanings.map((meaning, index) => (
            <motion.div
              key={meaning.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <NumberCard
                number={meaning.number}
                title={meaning.title}
                description={meaning.meaning}
                onClick={() => handleCardClick(meaning.number)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default NumberMeaning;
