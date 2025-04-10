
import { LanguageCode } from "../../types/numerology";
import { reduceNumber } from "../numerologyCalculator";
import { letterMap } from "./letterMap";

/**
 * Calculates the Expression number (also known as Destiny number)
 * The Expression number represents your potential and natural abilities
 * @param name Full name as a string
 * @returns The Expression number
 */
export const calculateExpression = (name: string): number => {
  if (!name) {
    throw new Error('Name is required');
  }
  
  // Remove spaces and special characters, then convert to lowercase
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  
  if (cleanName.length === 0) {
    throw new Error('Name must contain at least one letter');
  }
  
  // Sum the numerical values of all letters
  const sum = cleanName.split('').reduce((acc, letter) => {
    return acc + (letterMap[letter] || 0);
  }, 0);
  
  // Reduce to a single digit or master number
  return reduceNumber(sum);
};

/**
 * Returns the meaning of an Expression number
 * @param num The Expression number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getExpressionMeaning = async (num: number, language: LanguageCode = 'en'): Promise<string> => {
  try {
    // Try to load the language-specific meanings
    let expressionMeanings;
    try {
      expressionMeanings = (await import(`../../data/translations/${language}/expressionMeanings.json`)).default;
    } catch (error) {
      // Fallback to English if the translation isn't available
      expressionMeanings = (await import(`../../data/translations/en/expressionMeanings.json`)).default;
    }

    return expressionMeanings[num] || `No meaning available for Expression ${num}`;
  } catch (error) {
    console.error("Error loading expression meanings:", error);
    
    // Fallback to hardcoded English meanings
    const meanings: Record<number, string> = {
      1: "You are independent, individual and a pioneer. You have leadership qualities and are not afraid to take initiative. You are self-reliant and prefer to work alone.",
      2: "You are diplomatic, cooperative and sensitive. You work well with others and are a team player. You are intuitive and have good listening skills.",
      3: "You are creative, expressive and social. You have a natural talent for communication and artistic pursuits. You enjoy sharing your ideas with others.",
      4: "You are practical, disciplined and hardworking. You value stability and are dedicated to building solid foundations. You are organized and reliable.",
      5: "You are adventurous, versatile and freedom-loving. You adapt easily to change and seek variety in life. You are curious and resourceful.",
      6: "You are responsible, nurturing and service-oriented. You care deeply about others and create harmony in your environment. You are compassionate.",
      7: "You are analytical, introspective and philosophical. You have a deep mind and natural wisdom. You seek knowledge and understanding.",
      8: "You are ambitious, authoritative and goal-oriented. You have strong business acumen and executive abilities. You are practical and results-driven.",
      9: "You are humanitarian, compassionate and idealistic. You have a universal outlook and broad perspective. You seek to make the world a better place.",
      11: "You are intuitive, inspirational and idealistic. You have heightened spiritual awareness and can inspire others. You are a visionary.",
      22: "You are practical, visionary and capable of large-scale achievements. You can manifest big ideas into reality. You have the potential to transform society.",
      33: "You are compassionate, nurturing and dedicated to service. You care deeply about humanity and have a selfless approach to life. You are a master teacher."
    };
    
    return meanings[num] || `No meaning available for Expression ${num}`;
  }
};
