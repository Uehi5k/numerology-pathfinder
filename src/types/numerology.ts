
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
export type NumerologyType = 
  | 'lifePath' 
  | 'attitude' 
  | 'generation' 
  | 'dayOfBirth' 
  | 'expression' 
  | 'soulUrge' 
  | 'personality' 
  | 'maturity'
  | 'personalDay'
  | 'personalMonth'
  | 'personalYear';

/**
 * Color recommendation interface
 */
export interface ColorRecommendation {
  color: string;
  hex: string;
  description: string;
}

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
  date?: Date; // For personal day/month/year calculations
  colorRecommendation?: ColorRecommendation;
  colorRecommendations?: ColorRecommendation[];
}

/**
 * Name numerology letter-to-number mapping
 */
export interface LetterNumberMap {
  [key: string]: number;
}

/**
 * Name numerology calculation result
 */
export interface NameNumerologyResult {
  expression: number;
  soulUrge: number;
  personality: number;
  insights: NumerologyInsight[];
}

/**
 * Forecast cycles result
 */
export interface ForecastCyclesResult {
  personalDay: number;
  personalMonth: number;
  personalYear: number;
}
