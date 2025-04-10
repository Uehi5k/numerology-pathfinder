
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NumerologyInsight } from '@/types/numerology';

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
          // Load the meaning data
          let lifePathMeanings;
          try {
            lifePathMeanings = (await import(`@/data/translations/${language}/lifePathMeanings.json`)).default;
          } catch (error) {
            // Fallback to default English meanings
            lifePathMeanings = (await import('@/data/lifePathMeanings.json')).default;
          }

          // Ensure we have a valid meaning string, not an object
          const getMeaningString = (number: string) => {
            const data = lifePathMeanings[number];
            return typeof data === 'string' ? data : 
                   (data && typeof data === 'object' && 'meaning' in data) ? data.meaning : 
                   `No meaning available for Life Path ${number}`;
          };

          const getTitleString = (number: string) => {
            const data = lifePathMeanings[number];
            return (data && typeof data === 'object' && 'title' in data) ? data.title : 
                   `Life Path ${number}`;
          };

          // Load other data
          let strengths, lifeLessons, attitudeMeanings, dayOfBirthMeanings, generationMeanings;
          
          try {
            strengths = (await import(`@/data/translations/${language}/strengths.json`)).default;
            lifeLessons = (await import(`@/data/translations/${language}/lifeLessons.json`)).default;
            attitudeMeanings = (await import(`@/data/translations/${language}/attitudeMeanings.json`)).default;
            dayOfBirthMeanings = (await import(`@/data/translations/${language}/dayOfBirthMeanings.json`)).default;
            generationMeanings = (await import(`@/data/translations/${language}/generationMeanings.json`)).default;
          } catch (error) {
            console.error("Error loading some translations:", error);
            // We'll continue with what we have, missing values will be handled later
          }

          // Calculate numbers and their meanings
          const lifePathNumber = parseInt(lifePath);
          const [year, month, day] = birthdate.split('-').map(part => parseInt(part));
          
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
              title: getTitleString(lifePathNumber.toString()),
              description: getMeaningString(lifePathNumber.toString()),
              formula: `${month}/${day}/${year} → ${lifePathNumber}`,
              strengths: strengths?.[lifePathNumber.toString()] || [],
              lifeLessons: lifeLessons?.[lifePathNumber.toString()] || ""
            },
            {
              type: 'attitude',
              number: attitudeNumber,
              title: `Attitude ${attitudeNumber}`,
              description: attitudeMeanings?.[attitudeNumber.toString()] || `No meaning available for Attitude ${attitudeNumber}`,
              formula: `${month} + ${day} = ${attitudeNumber}`
            },
            {
              type: 'dayOfBirth',
              number: dayOfBirthNumber,
              title: `Day of Birth ${dayOfBirthNumber}`,
              description: dayOfBirthMeanings?.[dayOfBirthNumber.toString()] || "This day number meaning is not available.",
              formula: `Day: ${dayOfBirthNumber}`
            },
            {
              type: 'generation',
              number: generationNumber,
              title: `Generation ${generationNumber}`,
              description: generationMeanings?.[generationNumber.toString()] || `No meaning available for Generation ${generationNumber}`,
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
