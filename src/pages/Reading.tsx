
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLifePathMeaning, getStrengths, getLifeLessons } from '@/utils/numerologyCalculator';
import BackLink from '@/components/reading/BackLink';
import LifePathCard from '@/components/reading/LifePathCard';
import LifePathDetails from '@/components/reading/LifePathDetails';
import NoLifePathMessage from '@/components/reading/NoLifePathMessage';
import { LifePathMeaning } from '@/types/numerology';

const Reading = () => {
  const [searchParams] = useSearchParams();
  const lifePath = parseInt(searchParams.get('lifePath') || '0');
  const birthdate = searchParams.get('birthdate');
  
  const [meaning, setMeaning] = useState<LifePathMeaning | null>(null);
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
  
  if (!lifePath || !meaning) {
    return (
      <Layout>
        <NoLifePathMessage />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-4xl">
          <BackLink 
            to={birthdate ? "/life-path" : "/numbers"}
            label={birthdate ? "Back to Calculator" : "Back to Numbers"}
          />
          
          <LifePathCard
            lifePath={lifePath}
            title={meaning.title}
            meaning={meaning.meaning}
            formattedDate={formattedDate}
          />
          
          <div className="mt-6">
            <LifePathDetails
              meaning={meaning.meaning}
              strengths={getStrengths(lifePath)}
              lifeLessons={getLifeLessons(lifePath)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reading;
