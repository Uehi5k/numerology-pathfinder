
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NumerologyInsight } from '@/types/numerology';
import lifePathMeaningsJSON from '@/data/lifePathMeanings.json';

export const useNumerologyInsights = (lifePath: string, birthdate: string) => {
  const [insights, setInsights] = useState<NumerologyInsight[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    if (!lifePath || !birthdate) {
      setInsights([]);
      return;
    }

    try {
      // Import language-specific files
      const getLifePathData = async () => {
        try {
          const lifePathMeanings = (await import(`@/data/translations/${language}/lifePathMeanings.json`)).default;
          const strengths = (await import(`@/data/translations/${language}/strengths.json`)).default;
          const lifeLessons = (await import(`@/data/translations/${language}/lifeLessons.json`)).default;
          const attitudeMeanings = (await import(`@/data/translations/${language}/attitudeMeanings.json`)).default;
          const dayOfBirthMeanings = (await import(`@/data/translations/${language}/dayOfBirthMeanings.json`)).default;
          const generationMeanings = (await import(`@/data/translations/${language}/generationMeanings.json`)).default;

          // Calculate numbers and their meanings
          const lifePathNumber = parseInt(lifePath);
          const [month, day, year] = birthdate.split('-').map(part => parseInt(part));
          
          // Attitude number (sum of month and day)
          const attitudeNumber = (month + day) % 9 || 9;
          
          // Day of birth (just the day)
          const dayOfBirthNumber = day;
          
          // Generation number (sum of year digits)
          const generationNumber = Array.from(year.toString()).reduce((sum, digit) => sum + parseInt(digit), 0) % 9 || 9;

          const newInsights: NumerologyInsight[] = [
            {
              type: 'lifePath',
              number: lifePathNumber,
              title: `Life Path ${lifePathNumber}`,
              description: lifePathMeanings[lifePathNumber.toString()] || lifePathMeaningsJSON[lifePathNumber.toString()],
              formula: `${month}/${day}/${year} → ${lifePathNumber}`,
              strengths: strengths[lifePathNumber.toString()],
              lifeLessons: lifeLessons[lifePathNumber.toString()]
            },
            {
              type: 'attitude',
              number: attitudeNumber,
              title: `Attitude ${attitudeNumber}`,
              description: attitudeMeanings[attitudeNumber.toString()],
              formula: `${month} + ${day} = ${attitudeNumber}`
            },
            {
              type: 'dayOfBirth',
              number: dayOfBirthNumber,
              title: `Day of Birth ${dayOfBirthNumber}`,
              description: dayOfBirthMeanings[dayOfBirthNumber.toString()] || "This day number meaning is not available.",
              formula: `Day: ${dayOfBirthNumber}`
            },
            {
              type: 'generation',
              number: generationNumber,
              title: `Generation ${generationNumber}`,
              description: generationMeanings[generationNumber.toString()],
              formula: `${year} → ${generationNumber}`
            }
          ];

          setInsights(newInsights);
        } catch (error) {
          console.error("Error loading numerology data:", error);
          setInsights([]);
        }
      };

      getLifePathData();
    } catch (error) {
      console.error("Error calculating numerology insights:", error);
      setInsights([]);
    }
  }, [lifePath, birthdate, language]);

  return { insights };
};
