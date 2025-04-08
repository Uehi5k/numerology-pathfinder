
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
