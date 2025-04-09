
/**
 * Interface for Life Path meaning data structure
 */
export interface LifePathMeaning {
  title: string;
  meaning: string;
}

/**
 * Supported language codes
 */
export type LanguageCode = 'en' | 'es' | 'fr' | 'de';

/**
 * User preferences interface
 */
export interface UserPreferences {
  language: LanguageCode;
}

/**
 * Numerology insight types
 */
export type NumerologyType = 'lifePath' | 'attitude' | 'generation' | 'dayOfBirth';

/**
 * Numerology insight interface
 */
export interface NumerologyInsight {
  type: NumerologyType;
  number: number;
  title: string;
  description: string;
  formula: string;
  strengths?: string[];
  lifeLessons?: string;
}
