
import { LanguageCode } from "../../types/numerology";
import { reduceNumber } from "../numerologyCalculator";
import { letterMap, isVowel } from "./letterMap";

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
