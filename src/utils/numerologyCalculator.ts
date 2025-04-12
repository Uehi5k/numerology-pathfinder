/**
 * Numerology calculator utility functions
 */
import { LanguageCode, LifePathMeaning, NumerologyInsight } from '../types/numerology';
import enLifePathMeanings from '../data/translations/en/lifePathMeanings.json';
import enStrengths from '../data/translations/en/strengths.json';
import enLifeLessons from '../data/translations/en/lifeLessons.json';
import enAttitudeMeanings from '../data/translations/en/attitudeMeanings.json';
import enGenerationMeanings from '../data/translations/en/generationMeanings.json';
import enDayOfBirthMeanings from '../data/translations/en/dayOfBirthMeanings.json';
import enMaturityMeanings from '../data/translations/en/maturityMeanings.json';

// Cache for loaded translations
const translationsCache: Record<string, any> = {
  en: { 
    lifePathMeanings: enLifePathMeanings,
    strengths: enStrengths,
    lifeLessons: enLifeLessons,
    attitudeMeanings: enAttitudeMeanings,
    generationMeanings: enGenerationMeanings,
    dayOfBirthMeanings: enDayOfBirthMeanings,
    maturityMeanings: enMaturityMeanings
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
 * Calculates Attitude Number from a birthdate
 * @param dateString Birthdate in YYYY-MM-DD format
 * @returns The Attitude number
 */
export const calculateAttitude = (dateString: string): number => {
  if (!dateString) {
    throw new Error('Birthdate is required');
  }
  
  const [, month, day] = dateString.split('-').map(Number);
  
  if (!month || !day) {
    throw new Error('Invalid date format');
  }
  
  // Add the day and month
  const sum = reduceNumber(month) + reduceNumber(day);
  
  // Reduce the sum to get the Attitude number
  return reduceNumber(sum);
};

/**
 * Calculates Generation Number from a birthdate
 * @param dateString Birthdate in YYYY-MM-DD format
 * @returns The Generation number
 */
export const calculateGeneration = (dateString: string): number => {
  if (!dateString) {
    throw new Error('Birthdate is required');
  }
  
  const [year] = dateString.split('-').map(Number);
  
  if (!year) {
    throw new Error('Invalid date format');
  }
  
  // Reduce the year to a single digit or master number
  const yearSum = year
    .toString()
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);
  
  return reduceNumber(yearSum);
};

/**
 * Gets the Day of Birth number (not reduced)
 * @param dateString Birthdate in YYYY-MM-DD format
 * @returns The Day of Birth number
 */
export const getDayOfBirth = (dateString: string): number => {
  if (!dateString) {
    throw new Error('Birthdate is required');
  }
  
  const [, , day] = dateString.split('-').map(Number);
  
  if (!day || day < 1 || day > 31) {
    throw new Error('Invalid date format');
  }
  
  return day;
};

/**
 * Calculates Maturity Number from Life Path and Expression numbers
 * @param lifePath The Life Path number
 * @param expression The Expression number
 * @returns The Maturity number
 */
export const calculateMaturity = (lifePath: number, expression: number): number => {
  if (!lifePath || !expression) {
    throw new Error('Both Life Path and Expression numbers are required');
  }
  
  // Add the Life Path and Expression numbers
  const sum = lifePath + expression;
  
  // Reduce the sum to get the Maturity number
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
 * Returns the meaning of an Attitude number in the specified language
 * @param num The Attitude number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getAttitudeMeaning = (num: number, language: LanguageCode = 'en'): string => {
  const numKey = num.toString();
  
  try {
    if (translationsCache[language]?.attitudeMeanings?.[numKey]) {
      return translationsCache[language].attitudeMeanings[numKey];
    }
    
    if (language !== 'en' && translationsCache.en?.attitudeMeanings?.[numKey]) {
      console.warn(`Attitude translation not found for ${language}, falling back to en`);
      return translationsCache.en.attitudeMeanings[numKey];
    }
    
    return "This number does not have a standard Attitude interpretation.";
  } catch (error) {
    console.error("Error retrieving attitude meaning:", error);
    return "There was an error retrieving the meaning for this Attitude number.";
  }
};

/**
 * Returns the meaning of a Generation number in the specified language
 * @param num The Generation number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getGenerationMeaning = (num: number, language: LanguageCode = 'en'): string => {
  const numKey = num.toString();
  
  try {
    if (translationsCache[language]?.generationMeanings?.[numKey]) {
      return translationsCache[language].generationMeanings[numKey];
    }
    
    if (language !== 'en' && translationsCache.en?.generationMeanings?.[numKey]) {
      console.warn(`Generation translation not found for ${language}, falling back to en`);
      return translationsCache.en.generationMeanings[numKey];
    }
    
    return "This number does not have a standard Generation interpretation.";
  } catch (error) {
    console.error("Error retrieving generation meaning:", error);
    return "There was an error retrieving the meaning for this Generation number.";
  }
};

/**
 * Returns the meaning of a Day of Birth number in the specified language
 * @param num The Day of Birth number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getDayOfBirthMeaning = (num: number, language: LanguageCode = 'en'): string => {
  const numKey = num.toString();
  
  try {
    if (translationsCache[language]?.dayOfBirthMeanings?.[numKey]) {
      return translationsCache[language].dayOfBirthMeanings[numKey];
    }
    
    if (language !== 'en' && translationsCache.en?.dayOfBirthMeanings?.[numKey]) {
      console.warn(`Day of Birth translation not found for ${language}, falling back to en`);
      return translationsCache.en.dayOfBirthMeanings[numKey];
    }
    
    return "This day does not have a standard Day of Birth interpretation.";
  } catch (error) {
    console.error("Error retrieving day of birth meaning:", error);
    return "There was an error retrieving the meaning for this Day of Birth.";
  }
};

/**
 * Returns the meaning of a Maturity number in the specified language
 * @param num The Maturity number
 * @param language The language code (defaults to 'en')
 * @returns The meaning as a string
 */
export const getMaturityMeaning = (num: number, language: LanguageCode = 'en'): string => {
  const numKey = num.toString();
  
  try {
    if (translationsCache[language]?.maturityMeanings?.[numKey]) {
      return translationsCache[language].maturityMeanings[numKey];
    }
    
    if (language !== 'en' && translationsCache.en?.maturityMeanings?.[numKey]) {
      console.warn(`Maturity translation not found for ${language}, falling back to en`);
      return translationsCache.en.maturityMeanings[numKey];
    }
    
    return "This number does not have a standard Maturity interpretation.";
  } catch (error) {
    console.error("Error retrieving maturity meaning:", error);
    return "There was an error retrieving the meaning for this Maturity number.";
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
    
    // Try to load optional translation files
    let attitudeMeaningsModule, generationMeaningsModule, dayOfBirthMeaningsModule, maturityMeaningsModule;
    
    try {
      attitudeMeaningsModule = await import(`../data/translations/${language}/attitudeMeanings.json`);
    } catch (e) {
      console.warn(`No attitude meanings found for ${language}`);
    }
    
    try {
      generationMeaningsModule = await import(`../data/translations/${language}/generationMeanings.json`);
    } catch (e) {
      console.warn(`No generation meanings found for ${language}`);
    }
    
    try {
      dayOfBirthMeaningsModule = await import(`../data/translations/${language}/dayOfBirthMeanings.json`);
    } catch (e) {
      console.warn(`No day of birth meanings found for ${language}`);
    }
    
    try {
      maturityMeaningsModule = await import(`../data/translations/${language}/maturityMeanings.json`);
    } catch (e) {
      console.warn(`No maturity meanings found for ${language}`);
    }
    
    // Store in cache
    translationsCache[language] = {
      lifePathMeanings: lifePathMeaningsModule.default,
      strengths: strengthsModule.default,
      lifeLessons: lifeLessonsModule.default,
      ...(attitudeMeaningsModule && { attitudeMeanings: attitudeMeaningsModule.default }),
      ...(generationMeaningsModule && { generationMeanings: generationMeaningsModule.default }),
      ...(dayOfBirthMeaningsModule && { dayOfBirthMeanings: dayOfBirthMeaningsModule.default }),
      ...(maturityMeaningsModule && { maturityMeanings: maturityMeaningsModule.default })
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

/**
 * Calculate all numerology insights from a birthdate
 * @param dateString Birthdate in YYYY-MM-DD format
 * @param language The language code (defaults to 'en')
 * @returns Object with all numerology insights
 */
export const calculateAllInsights = (dateString: string, language: LanguageCode = 'en'): NumerologyInsight[] => {
  if (!dateString) {
    return [];
  }
  
  try {
    const lifePath = calculateLifePath(dateString);
    const attitude = calculateAttitude(dateString);
    const generation = calculateGeneration(dateString);
    const dayOfBirth = getDayOfBirth(dateString);
    
    return [
      {
        type: 'lifePath',
        number: lifePath,
        title: getLifePathMeaning(lifePath, language).title,
        description: getLifePathMeaning(lifePath, language).meaning,
        formula: "Month (reduced) + Day (reduced) + Year (reduced) = Life Path Number",
        strengths: getStrengths(lifePath, language),
        lifeLessons: getLifeLessons(lifePath, language)
      },
      {
        type: 'attitude',
        number: attitude,
        title: `Attitude Number ${attitude}`,
        description: getAttitudeMeaning(attitude, language),
        formula: "Month (reduced) + Day (reduced) = Attitude Number"
      },
      {
        type: 'generation',
        number: generation,
        title: `Generation Number ${generation}`,
        description: getGenerationMeaning(generation, language),
        formula: "Sum of all digits in birth year (reduced) = Generation Number"
      },
      {
        type: 'dayOfBirth',
        number: dayOfBirth,
        title: `Day of Birth: ${dayOfBirth}`,
        description: getDayOfBirthMeaning(dayOfBirth, language),
        formula: "The day of the month you were born (not reduced)"
      }
    ];
  } catch (error) {
    console.error("Error calculating insights:", error);
    return [];
  }
};
