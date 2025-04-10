
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
export const calculateNameNumerology = (name: string, language: LanguageCode = 'en'): NameNumerologyResult => {
  try {
    const expression = calculateExpression(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    
    const insights: NumerologyInsight[] = [
      {
        type: 'expression',
        number: expression,
        title: `Expression Number ${expression}`,
        description: getExpressionMeaning(expression, language),
        formula: "Sum of all letters in your name = Expression Number"
      },
      {
        type: 'soulUrge',
        number: soulUrge,
        title: `Soul Urge Number ${soulUrge}`,
        description: getSoulUrgeMeaning(soulUrge, language),
        formula: "Sum of vowels in your name = Soul Urge Number"
      },
      {
        type: 'personality',
        number: personality,
        title: `Personality Number ${personality}`,
        description: getPersonalityMeaning(personality, language),
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
