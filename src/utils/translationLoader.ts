
import { LanguageCode } from '@/types/numerology';

// Default language to fall back to
const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * Load a translation JSON file for the specified language
 * @param language The language code
 * @param path The path to the JSON file within the translations directory
 * @returns The loaded translation data
 */
export async function loadTranslation<T>(language: LanguageCode, path: string): Promise<T> {
  try {
    // Try to load the requested language
    const module = await import(`../data/translations/${language}/${path}`);
    return module.default;
  } catch (error) {
    // If the requested language is not available, fall back to default language
    if (language !== DEFAULT_LANGUAGE) {
      console.warn(`Translation not found for ${language}/${path}, falling back to ${DEFAULT_LANGUAGE}`);
      return loadTranslation(DEFAULT_LANGUAGE, path);
    }
    // If even the default language fails, throw an error
    throw new Error(`Failed to load translation: ${path}`);
  }
}

/**
 * Load life path meanings for the specified language
 * @param language The language code
 * @returns The life path meanings in the requested language
 */
export async function loadLifePathMeanings(language: LanguageCode) {
  return loadTranslation(language, 'lifePathMeanings.json');
}
