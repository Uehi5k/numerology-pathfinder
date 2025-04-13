
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NumerologyInsight, ForecastCyclesResult, ColorRecommendation } from '@/types/numerology';
import { calculateForecastCycles } from '@/utils/numerology/forecastCycles';
import { format } from 'date-fns';

export const useForecastCycles = (birthdate: string) => {
  const [insights, setInsights] = useState<NumerologyInsight[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [cycles, setCycles] = useState<ForecastCyclesResult>({ personalDay: 0, personalMonth: 0, personalYear: 0 });
  const { language } = useLanguage();

  useEffect(() => {
    if (!birthdate) {
      setInsights([]);
      setCycles({ personalDay: 0, personalMonth: 0, personalYear: 0 });
      return;
    }

    // Calculate forecast cycles
    const forecastCycles = calculateForecastCycles(birthdate, currentDate);
    setCycles(forecastCycles);
    
    // Load meaning translations and color recommendations
    const loadMeanings = async () => {
      try {
        let personalDayMeanings, personalMonthMeanings, personalYearMeanings;
        let personalDayColors, personalYearColors;
        
        try {
          personalDayMeanings = (await import(`@/data/translations/${language}/personalDayMeanings.json`)).default;
          personalMonthMeanings = (await import(`@/data/translations/${language}/personalMonthMeanings.json`)).default;
          personalYearMeanings = (await import(`@/data/translations/${language}/personalYearMeanings.json`)).default;
          personalDayColors = (await import(`@/data/translations/${language}/personalDayColors.json`)).default;
          personalYearColors = (await import(`@/data/translations/${language}/personalYearColors.json`)).default;
        } catch (error) {
          // Fallback to English if translations not available
          personalDayMeanings = (await import('@/data/translations/en/personalDayMeanings.json')).default;
          personalMonthMeanings = (await import('@/data/translations/en/personalMonthMeanings.json')).default;
          personalYearMeanings = (await import('@/data/translations/en/personalYearMeanings.json')).default;
          personalDayColors = (await import('@/data/translations/en/personalDayColors.json')).default;
          personalYearColors = (await import('@/data/translations/en/personalYearColors.json')).default;
        }
        
        // Format the current date for display
        const formattedDate = format(currentDate, 'MMMM d, yyyy');
        const [birthYear, birthMonth, birthDay] = birthdate.split('-');
        
        // Get color recommendations
        const personalDayColor: ColorRecommendation = personalDayColors[forecastCycles.personalDay.toString()];
        const personalYearColor: ColorRecommendation = personalYearColors[forecastCycles.personalYear.toString()];
        
        // Create insights array with formulas, meanings, and color recommendations
        const newInsights: NumerologyInsight[] = [
          {
            type: 'personalDay',
            number: forecastCycles.personalDay,
            title: `Personal Day ${forecastCycles.personalDay}`,
            description: personalDayMeanings[forecastCycles.personalDay.toString()] || 
                        "No meaning available for this Personal Day number.",
            formula: `Birth Day ${birthDay} + Current Day ${currentDate.getDate()} + Current Month ${currentDate.getMonth() + 1} + Current Year ${currentDate.getFullYear()} = ${forecastCycles.personalDay}`,
            date: new Date(currentDate),
            colorRecommendation: personalDayColor
          },
          {
            type: 'personalMonth',
            number: forecastCycles.personalMonth,
            title: `Personal Month ${forecastCycles.personalMonth}`,
            description: personalMonthMeanings[forecastCycles.personalMonth.toString()] || 
                        "No meaning available for this Personal Month number.",
            formula: `Birth Month ${birthMonth} + Current Month ${currentDate.getMonth() + 1} + Current Year ${currentDate.getFullYear()} = ${forecastCycles.personalMonth}`,
            date: new Date(currentDate)
          },
          {
            type: 'personalYear',
            number: forecastCycles.personalYear,
            title: `Personal Year ${forecastCycles.personalYear}`,
            description: personalYearMeanings[forecastCycles.personalYear.toString()] || 
                        "No meaning available for this Personal Year number.",
            formula: `Birth Day ${birthDay} + Birth Month ${birthMonth} + Current Year ${currentDate.getFullYear()} = ${forecastCycles.personalYear}`,
            date: new Date(currentDate),
            colorRecommendation: personalYearColor
          }
        ];
        
        setInsights(newInsights);
      } catch (error) {
        console.error("Error loading forecast cycle data:", error);
        setInsights([]);
      }
    };
    
    loadMeanings();
  }, [birthdate, currentDate, language]);

  // Function to update the date for calculations
  const updateDate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return { insights, cycles, currentDate, updateDate };
};
