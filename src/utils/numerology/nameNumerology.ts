
import { LanguageCode, NameNumerologyResult, NumerologyInsight } from "../../types/numerology";
import { calculateExpression, getExpressionMeaning } from "./expressionNumber";
import { calculateSoulUrge, getSoulUrgeMeaning } from "./soulUrgeNumber";
import { calculatePersonality, getPersonalityMeaning } from "./personalityNumber";

/**
 * Calculates all name numerology numbers and creates insights
 * @param name Full name as a string
 * @param language The language code (defaults to 'en')
 * @returns Object with numerology calculations and insights
 */
export const calculateNameNumerology = async (name: string, language: LanguageCode = 'en'): Promise<NameNumerologyResult> => {
  try {
    const expression = calculateExpression(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    
    // Get meanings with language support
    const expressionMeaning = await getExpressionMeaning(expression, language);
    const soulUrgeMeaning = await getSoulUrgeMeaning(soulUrge, language);
    const personalityMeaning = await getPersonalityMeaning(personality, language);
    
    const insights: NumerologyInsight[] = [
      {
        type: 'expression',
        number: expression,
        title: `Expression Number ${expression}`,
        description: expressionMeaning,
        formula: "Sum of all letters in your name = Expression Number"
      },
      {
        type: 'soulUrge',
        number: soulUrge,
        title: `Soul Urge Number ${soulUrge}`,
        description: soulUrgeMeaning,
        formula: "Sum of vowels in your name = Soul Urge Number"
      },
      {
        type: 'personality',
        number: personality,
        title: `Personality Number ${personality}`,
        description: personalityMeaning,
        formula: "Sum of consonants in your name = Personality Number"
      }
    ];
    
    return {
      expression,
      soulUrge,
      personality,
      insights
    };
  } catch (error) {
    console.error("Error calculating name numerology:", error);
    throw error;
  }
};
