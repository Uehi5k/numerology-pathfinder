import React, { useState } from 'react';
import ComparisonForm from './ComparisonForm';
import ComparisonResults from './ComparisonResults';
import { ComparisonResult, calculateComparison } from '@/utils/numerology/comparativeAnalysis';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonSectionProps {
  name: string;
  birthdate: string;
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ name, birthdate }) => {
  const { language } = useLanguage();
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (profile2: { name: string; birthdate: string; gender: string }) => {
    setLoading(true);
    try {
      const comparison = await calculateComparison(
        { name, birthdate, gender: '' },
        profile2,
        language
      );
      setResult(comparison);
    } catch (error) {
      console.error('Error calculating comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => setResult(null);

  if (result) {
    return <ComparisonResults result={result} onReset={handleReset} />;
  }

  return <ComparisonForm onSubmit={handleSubmit} loading={loading} />;
};

export default ComparisonSection;
