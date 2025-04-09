
/**
 * Numerology calculator utility functions
 */
import { LanguageCode, LifePathMeaning } from '../types/numerology';
import enLifePathMeanings from '../data/translations/en/lifePathMeanings.json';
import enStrengths from '../data/translations/en/strengths.json';
import enLifeLessons from '../data/translations/en/lifeLessons.json';

// Cache for loaded translations
const translationsCache: Record<string, any> = {
  en: { 
    lifePathMeanings: enLifePathMeanings,
    strengths: enStrengths,
    lifeLessons: enLifeLessons
  }
};

/**
 * Reduces a number to a single digit (1-9) or master number (11, 22, 33)
 * @param num The number to reduce
 * @returns The reduced number
 */
export const reduceNumber = (num: number): number => {
  // Check for master numbers
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  
  // If single digit, return as is
  if (num < 10) {
    return num;
  }
  
  // Reduce to a single digit
  const sum = num
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);
  
  return reduceNumber(sum);
};

/**
 * Calculates Life Path number from a birthdate
 * @param dateString Birthdate in YYYY-MM-DD format
 * @returns The Life Path number
 */
export const calculateLifePath = (dateString: string): number => {
  if (!dateString) {
    throw new Error('Birthdate is required');
  }
  
  const [year, month, day] = dateString.split('-').map(Number);
  
  if (!year || !month || !day) {
    throw new Error('Invalid date format');
  }
  
  // Reduce each part of the date
  const reducedMonth = reduceNumber(month);
  const reducedDay = reduceNumber(day);
  
  // For year, first calculate the sum of its digits
  const yearSum = year
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);
  
  const reducedYear = reduceNumber(yearSum);
  
  // Calculate the sum of all reduced parts
  const sum = reducedMonth + reducedDay + reducedYear;
  
  // Reduce the final sum to get the Life Path number
  return reduceNumber(sum);
};

/**
 * Returns the meaning of a Life Path number in the specified language
 * @param num The Life Path number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a LifePathMeaning object
 */
export const getLifePathMeaning = (num: number, language: LanguageCode = 'en'): LifePathMeaning => {
  // Convert number to string for JSON lookup
  const numKey = num.toString();
  
  try {
    // Use cached translations if available
    if (translationsCache[language]?.lifePathMeanings?.[numKey]) {
      return translationsCache[language].lifePathMeanings[numKey] as LifePathMeaning;
    }
    
    // If requested language is not English and not in cache, fall back to English
    if (language !== 'en' && translationsCache.en?.lifePathMeanings?.[numKey]) {
      console.warn(`Translation not found for ${language}, falling back to en`);
      return translationsCache.en.lifePathMeanings[numKey] as LifePathMeaning;
    }
    
    // Default fallback
    return { 
      title: "Unknown", 
      meaning: "This number does not have a standard Life Path interpretation."
    };
  } catch (error) {
    console.error("Error retrieving life path meaning:", error);
    return { 
      title: "Error", 
      meaning: "There was an error retrieving the meaning for this Life Path number."
    };
  }
};

/**
 * Load translations for a specific language
 * @param language The language code
 */
export const loadTranslations = async (language: LanguageCode): Promise<void> => {
  // Skip if already loaded
  if (translationsCache[language]) return;
  
  try {
    // Dynamic import of translations
    const lifePathMeaningsModule = await import(`../data/translations/${language}/lifePathMeanings.json`);
    const strengthsModule = await import(`../data/translations/${language}/strengths.json`);
    const lifeLessonsModule = await import(`../data/translations/${language}/lifeLessons.json`);
    
    // Store in cache
    translationsCache[language] = {
      lifePathMeanings: lifePathMeaningsModule.default,
      strengths: strengthsModule.default,
      lifeLessons: lifeLessonsModule.default
    };
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
  }
};

/**
 * Get strengths for a specific Life Path number
 * @param num The Life Path number
 * @param language The language code (defaults to 'en')
 * @returns Array of strengths
 */
export const getStrengths = (num: number, language: LanguageCode = 'en'): string[] => {
  const numKey = num.toString();
  
  try {
    // Use cached translations if available
    if (translationsCache[language]?.strengths?.[numKey]) {
      return translationsCache[language].strengths[numKey];
    }
    
    // If requested language is not English and not in cache, fall back to English
    if (language !== 'en' && translationsCache.en?.strengths?.[numKey]) {
      console.warn(`Strengths translation not found for ${language}, falling back to en`);
      return translationsCache.en.strengths[numKey];
    }
    
    // Default fallback
    return ['Unknown'];
  } catch (error) {
    console.error("Error retrieving strengths:", error);
    return ['Error'];
  }
};

/**
 * Get life lessons for a specific Life Path number
 * @param num The Life Path number
 * @param language The language code (defaults to 'en')
 * @returns Life lessons as a string
 */
export const getLifeLessons = (num: number, language: LanguageCode = 'en'): string => {
  const numKey = num.toString();
  
  try {
    // Use cached translations if available
    if (translationsCache[language]?.lifeLessons?.[numKey]) {
      return translationsCache[language].lifeLessons[numKey];
    }
    
    // If requested language is not English and not in cache, fall back to English
    if (language !== 'en' && translationsCache.en?.lifeLessons?.[numKey]) {
      console.warn(`Life lessons translation not found for ${language}, falling back to en`);
      return translationsCache.en.lifeLessons[numKey];
    }
    
    // Default fallback
    return "Your life lessons are unique to your personal journey.";
  } catch (error) {
    console.error("Error retrieving life lessons:", error);
    return "There was an error retrieving the life lessons for this Life Path number.";
  }
};

/**
 * Get all number meanings for display
 */
export const getAllNumberMeanings = (language: LanguageCode = 'en') => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map(num => ({
    number: num,
    ...getLifePathMeaning(num, language)
  }));
};
