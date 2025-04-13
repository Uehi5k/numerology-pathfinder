
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NumerologyInsight, ColorRecommendation } from '@/types/numerology';

export const useNumerologyInsights = (lifePath: string, birthdate: string, expressionNumber?: number) => {
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
          let strengths, lifeLessons, attitudeMeanings, dayOfBirthMeanings, generationMeanings, maturityMeanings, lifePathColors;
          
          try {
            strengths = (await import(`@/data/translations/${language}/strengths.json`)).default;
            lifeLessons = (await import(`@/data/translations/${language}/lifeLessons.json`)).default;
            attitudeMeanings = (await import(`@/data/translations/${language}/attitudeMeanings.json`)).default;
            dayOfBirthMeanings = (await import(`@/data/translations/${language}/dayOfBirthMeanings.json`)).default;
            generationMeanings = (await import(`@/data/translations/${language}/generationMeanings.json`)).default;
            maturityMeanings = (await import(`@/data/translations/${language}/maturityMeanings.json`)).default;
            lifePathColors = (await import(`@/data/translations/${language}/lifePathColors.json`)).default;
          } catch (error) {
            // Try to load English versions if language-specific files are not available
            try {
              if (!strengths) strengths = (await import(`@/data/translations/en/strengths.json`)).default;
              if (!lifeLessons) lifeLessons = (await import(`@/data/translations/en/lifeLessons.json`)).default;
              if (!attitudeMeanings) attitudeMeanings = (await import(`@/data/translations/en/attitudeMeanings.json`)).default;
              if (!dayOfBirthMeanings) dayOfBirthMeanings = (await import(`@/data/translations/en/dayOfBirthMeanings.json`)).default;
              if (!generationMeanings) generationMeanings = (await import(`@/data/translations/en/generationMeanings.json`)).default;
              if (!maturityMeanings) maturityMeanings = (await import(`@/data/translations/en/maturityMeanings.json`)).default;
              if (!lifePathColors) lifePathColors = (await import(`@/data/translations/en/lifePathColors.json`)).default;
            } catch (fallbackError) {
              console.error("Error loading fallback translations:", fallbackError);
            }
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

          // Get color recommendations for Life Path
          let colorRecommendation: ColorRecommendation | undefined;
          let colorRecommendations: ColorRecommendation[] | undefined;
          
          if (lifePathColors && lifePathColors[lifePathNumber.toString()]) {
            // Handle both single color and array of colors formats
            const colors = lifePathColors[lifePathNumber.toString()];
            if (Array.isArray(colors)) {
              colorRecommendations = colors;
              colorRecommendation = colors[0]; // First color as default for backward compatibility
            } else {
              colorRecommendation = colors;
              colorRecommendations = [colors]; // Convert single color to array for new format
            }
          }

          const newInsights: NumerologyInsight[] = [
            {
              type: 'lifePath',
              number: lifePathNumber,
              title: getTitleString(lifePathNumber.toString()),
              description: getMeaningString(lifePathNumber.toString()),
              formula: `${month}/${day}/${year} → ${lifePathNumber}`,
              strengths: strengths?.[lifePathNumber.toString()] || [],
              lifeLessons: lifeLessons?.[lifePathNumber.toString()] || "",
              colorRecommendation,
              colorRecommendations
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

          // Add Maturity Number if Expression Number is available
          if (expressionNumber) {
            const maturityNumber = (lifePathNumber + expressionNumber) % 9 || 9;
            if (maturityNumber === 11 || maturityNumber === 22 || maturityNumber === 33) {
              // Keep master numbers
            }
            
            newInsights.push({
              type: 'maturity',
              number: maturityNumber,
              title: `Maturity ${maturityNumber}`,
              description: maturityMeanings?.[maturityNumber.toString()] || `No meaning available for Maturity ${maturityNumber}`,
              formula: `Life Path ${lifePathNumber} + Expression ${expressionNumber} = ${maturityNumber}`
            });
          }

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
  }, [lifePath, birthdate, expressionNumber, language]);

  return { insights };
};
