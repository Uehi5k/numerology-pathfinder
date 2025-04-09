
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLifePathMeaning, getStrengths, getLifeLessons, loadTranslations } from '@/utils/numerologyCalculator';
import BackLink from '@/components/reading/BackLink';
import LifePathCard from '@/components/reading/LifePathCard';
import LifePathDetails from '@/components/reading/LifePathDetails';
import NoLifePathMessage from '@/components/reading/NoLifePathMessage';
import { LifePathMeaning } from '@/types/numerology';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Reading = () => {
  const [searchParams] = useSearchParams();
  const lifePath = parseInt(searchParams.get('lifePath') || '0');
  const birthdate = searchParams.get('birthdate');
  
  const { language } = useLanguage();
  const [meaning, setMeaning] = useState<LifePathMeaning | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>('');
  
  useEffect(() => {
    // Load translations for the current language
    loadTranslations(language).then(() => {
      if (lifePath) {
        setMeaning(getLifePathMeaning(lifePath, language));
      }
    });
    
    if (birthdate) {
      const date = new Date(birthdate);
      setFormattedDate(new Intl.DateTimeFormat('en-US', {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric'
      }).format(date));
    }
  }, [lifePath, birthdate, language]);
  
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
          <div className="flex justify-between items-center mb-4">
            <BackLink 
              to={birthdate ? "/life-path" : "/numbers"}
              label={birthdate ? "Back to Calculator" : "Back to Numbers"}
            />
            <LanguageSelector />
          </div>
          
          <LifePathCard
            lifePath={lifePath}
            title={meaning.title}
            meaning={meaning.meaning}
            formattedDate={formattedDate}
          />
          
          <div className="mt-6">
            <LifePathDetails
              meaning={meaning.meaning}
              strengths={getStrengths(lifePath, language)}
              lifeLessons={getLifeLessons(lifePath, language)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reading;
