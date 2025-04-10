
import { LanguageCode, LetterNumberMap, NameNumerologyResult, NumerologyInsight } from "../types/numerology";
import { reduceNumber } from "./numerologyCalculator";

/**
 * Pythagorean number system for letter-to-number mapping
 * 1: A, J, S
 * 2: B, K, T
 * 3: C, L, U
 * 4: D, M, V
 * 5: E, N, W
 * 6: F, O, X
 * 7: G, P, Y
 * 8: H, Q, Z
 * 9: I, R
 */
export const letterMap: LetterNumberMap = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

/**
 * Checks if a letter is a vowel
 * @param letter The letter to check
 * @returns boolean indicating if the letter is a vowel
 */
const isVowel = (letter: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
};

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
 * Calculates the Soul Urge number (also known as Heart's Desire number)
 * The Soul Urge number represents your inner desires and what motivates you
 * @param name Full name as a string
 * @returns The Soul Urge number
 */
export const calculateSoulUrge = (name: string): number => {
  if (!name) {
    throw new Error('Name is required');
  }
  
  // Remove spaces and special characters, then convert to lowercase
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  
  if (cleanName.length === 0) {
    throw new Error('Name must contain at least one letter');
  }
  
  // Extract only vowels
  const vowels = cleanName.split('').filter(letter => isVowel(letter));
  
  if (vowels.length === 0) {
    throw new Error('Name must contain at least one vowel');
  }
  
  // Sum the numerical values of vowels
  const sum = vowels.reduce((acc, letter) => {
    return acc + (letterMap[letter] || 0);
  }, 0);
  
  // Reduce to a single digit or master number
  return reduceNumber(sum);
};

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
 * Creates an explanation of the letter-to-number mapping
 * @returns String with the Pythagorean number system explanation
 */
export const getLetterMapExplanation = (): string => {
  return `
    The Pythagorean number system maps each letter to a number:
    1: A, J, S
    2: B, K, T
    3: C, L, U
    4: D, M, V
    5: E, N, W
    6: F, O, X
    7: G, P, Y
    8: H, Q, Z
    9: I, R
  `;
};

/**
 * Returns the meaning of an Expression number
 * @param num The Expression number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getExpressionMeaning = (num: number, language: LanguageCode = 'en'): string => {
  // For now, we'll provide default meanings in English
  // In a future version, this could be expanded to include translations
  
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
  
  return meanings[num] || "This number doesn't have a standard Expression interpretation.";
};

/**
 * Returns the meaning of a Soul Urge number
 * @param num The Soul Urge number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getSoulUrgeMeaning = (num: number, language: LanguageCode = 'en'): string => {
  // Default meanings in English
  
  const meanings: Record<number, string> = {
    1: "You desire independence and leadership. You are driven by a need to be original and stand out from the crowd. You seek recognition for your individuality.",
    2: "You desire peace and harmony. You are driven by a need for connection and cooperation. You seek emotional security and balanced relationships.",
    3: "You desire self-expression and joy. You are driven by a need to communicate and create. You seek opportunities to share your enthusiasm with others.",
    4: "You desire order and stability. You are driven by a need for security and establishing solid foundations. You seek practical results and reliability.",
    5: "You desire freedom and adventure. You are driven by a need for change and new experiences. You seek variety and resist limitations.",
    6: "You desire to nurture and protect. You are driven by a need to create harmony and be of service. You seek to care for others and create beauty.",
    7: "You desire wisdom and understanding. You are driven by a need to find truth and meaning. You seek knowledge and spiritual insight.",
    8: "You desire power and accomplishment. You are driven by a need for material success and recognition. You seek to achieve tangible results.",
    9: "You desire to make a difference. You are driven by a need to contribute to humanity. You seek universal understanding and compassion.",
    11: "You desire spiritual insight and illumination. You are driven by a need to find higher truths. You seek to inspire others with your vision.",
    22: "You desire to build structures that benefit society. You are driven by a need to transform systems on a large scale. You seek to leave a lasting legacy.",
    33: "You desire to elevate humanity through compassion. You are driven by a need to nurture and teach others. You seek to create positive transformation."
  };
  
  return meanings[num] || "This number doesn't have a standard Soul Urge interpretation.";
};

/**
 * Returns the meaning of a Personality number
 * @param num The Personality number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getPersonalityMeaning = (num: number, language: LanguageCode = 'en'): string => {
  // Default meanings in English
  
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
  
  return meanings[num] || "This number doesn't have a standard Personality interpretation.";
};

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
