
import { LanguageCode } from "../../types/numerology";
import { reduceNumber } from "../numerologyCalculator";
import { letterMap, isVowel } from "./letterMap";

/**
 * Calculates the Personality number
 * The Personality number represents how others perceive you
 * @param name Full name as a string
 * @returns The Personality number
 */
export const calculatePersonality = (name: string): number => {
  if (!name) {
    throw new Error('Name is required');
  }
  
  // Remove spaces and special characters, then convert to lowercase
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  
  if (cleanName.length === 0) {
    throw new Error('Name must contain at least one letter');
  }
  
  // Extract only consonants
  const consonants = cleanName.split('').filter(letter => !isVowel(letter));
  
  if (consonants.length === 0) {
    throw new Error('Name must contain at least one consonant');
  }
  
  // Sum the numerical values of consonants
  const sum = consonants.reduce((acc, letter) => {
    return acc + (letterMap[letter] || 0);
  }, 0);
  
  // Reduce to a single digit or master number
  return reduceNumber(sum);
};

/**
 * Returns the meaning of a Personality number
 * @param num The Personality number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getPersonalityMeaning = async (num: number, language: LanguageCode = 'en'): Promise<string> => {
  try {
    // Try to load the language-specific meanings
    let personalityMeanings;
    try {
      personalityMeanings = (await import(`../../data/translations/${language}/personalityMeanings.json`)).default;
    } catch (error) {
      // Fallback to English if the translation isn't available
      personalityMeanings = (await import(`../../data/translations/en/personalityMeanings.json`)).default;
    }

    return personalityMeanings[num] || `No meaning available for Personality ${num}`;
  } catch (error) {
    console.error("Error loading personality meanings:", error);
    
    // Fallback to hardcoded English meanings
    const meanings: Record<number, string> = {
      1: "You appear confident, strong and independent. Others see you as a leader who is not afraid to forge your own path. You come across as self-assured and determined.",
      2: "You appear diplomatic, cooperative and sensitive. Others see you as a peacemaker who works well in partnerships. You come across as supportive and tactful.",
      3: "You appear expressive, creative and social. Others see you as outgoing and talented with words. You come across as charming and optimistic.",
      4: "You appear practical, reliable and organized. Others see you as someone they can depend on. You come across as stable and hard-working.",
      5: "You appear adaptable, energetic and adventurous. Others see you as someone who embraces change. You come across as versatile and progressive.",
      6: "You appear nurturing, responsible and harmonious. Others see you as someone who cares deeply about others. You come across as balanced and supportive.",
      7: "You appear analytical, thoughtful and reserved. Others see you as someone with depth and wisdom. You come across as introspective and intelligent.",
      8: "You appear authoritative, confident and capable. Others see you as someone who can achieve goals. You come across as ambitious and strong.",
      9: "You appear humanitarian, understanding and tolerant. Others see you as someone with broad perspectives. You come across as compassionate and worldly.",
      11: "You appear intuitive, sensitive and inspirational. Others see you as someone with spiritual depth. You come across as insightful and idealistic.",
      22: "You appear practical, accomplished and visionary. Others see you as someone who can manifest big ideas. You come across as a capable builder.",
      33: "You appear nurturing, selfless and wise. Others see you as someone dedicated to service. You come across as a compassionate teacher."
    };
    
    return meanings[num] || `No meaning available for Personality ${num}`;
  }
};
