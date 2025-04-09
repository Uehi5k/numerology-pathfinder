
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { calculateAllInsights, loadTranslations } from '@/utils/numerologyCalculator';
import BackLink from '@/components/reading/BackLink';
import LifePathCard from '@/components/reading/LifePathCard';
import NoLifePathMessage from '@/components/reading/NoLifePathMessage';
import { NumerologyInsight } from '@/types/numerology';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import InsightTabs from '@/components/reading/InsightTabs';

const Reading = () => {
  const [searchParams] = useSearchParams();
  const lifePath = parseInt(searchParams.get('lifePath') || '0');
  const birthdate = searchParams.get('birthdate');
  
  const { language } = useLanguage();
  const [insights, setInsights] = useState<NumerologyInsight[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>('');
  
  useEffect(() => {
    // Load translations for the current language
    loadTranslations(language).then(() => {
      if (birthdate) {
        setInsights(calculateAllInsights(birthdate, language));
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
  }, [birthdate, language]);
  
  if (!lifePath || insights.length === 0) {
    return (
      <Layout>
        <NoLifePathMessage />
      </Layout>
    );
  }
  
  // Find the Life Path insight for the title card
  const lifePathInsight = insights.find(insight => insight.type === 'lifePath');
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <BackLink 
              to="/life-path"
              label="Back to Calculator"
            />
            <LanguageSelector />
          </div>
          
          {lifePathInsight && (
            <LifePathCard
              lifePath={lifePath}
              title={lifePathInsight.title}
              meaning={lifePathInsight.description}
              formattedDate={formattedDate}
            />
          )}
          
          <div className="mt-6">
            <InsightTabs insights={insights} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reading;
