import { LanguageCode } from '@/types/numerology';
import { calculateLifePath } from '@/utils/numerologyCalculator';
import { calculateNameNumerology } from './nameNumerology';

export interface ComparisonProfile {
  name: string;
  birthdate: string;
  gender: string;
}

export interface LifePathInfo {
  number: number;
  title: string;
  meaning: string;
}

export interface ComparisonResult {
  profile1: { name: string; lifePath: number; expression?: number; soulUrge?: number; personality?: number; lifePathInfo?: LifePathInfo };
  profile2: { name: string; lifePath: number; expression?: number; soulUrge?: number; personality?: number; lifePathInfo?: LifePathInfo };
  compatibility: {
    score: number;
    overview: string;
    strengths: string[];
    challenges: string[];
    communication: string;
    emotionalConnection: string;
    sharedGoals: string;
    growthAreas: string;
    advice: string;
    relationshipLifePath?: string;
  } | null;
}

// Cache for loaded translations
const analysisCache: Record<string, any> = {};
const lifePathCache: Record<string, any> = {};

const loadAnalysisData = async (language: LanguageCode) => {
  if (analysisCache[language]) return analysisCache[language];
  try {
    const module = await import(`@/data/translations/${language}/comparativeAnalysis.json`);
    analysisCache[language] = module.default;
    return analysisCache[language];
  } catch {
    if (language !== 'en') {
      const enModule = await import(`@/data/translations/en/comparativeAnalysis.json`);
      analysisCache['en'] = enModule.default;
      return analysisCache['en'];
    }
    return null;
  }
};

const loadLifePathMeanings = async (language: LanguageCode) => {
  if (lifePathCache[language]) return lifePathCache[language];
  try {
    const module = await import(`@/data/translations/${language}/lifePathMeanings.json`);
    lifePathCache[language] = module.default;
    return lifePathCache[language];
  } catch {
    if (language !== 'en') {
      const enModule = await import(`@/data/translations/en/lifePathMeanings.json`);
      lifePathCache['en'] = enModule.default;
      return lifePathCache['en'];
    }
    return null;
  }
};

const getCompatibilityKey = (lp1: number, lp2: number): string => {
  const sorted = [lp1, lp2].sort((a, b) => a - b);
  return `${sorted[0]}-${sorted[1]}`;
};

export const calculateComparison = async (
  profile1: ComparisonProfile,
  profile2: ComparisonProfile,
  language: LanguageCode
): Promise<ComparisonResult> => {
  const lp1 = calculateLifePath(profile1.birthdate);
  const lp2 = calculateLifePath(profile2.birthdate);

  const [name1Result, name2Result, data, lifePathMeanings] = await Promise.all([
    calculateNameNumerology(profile1.name, language),
    calculateNameNumerology(profile2.name, language),
    loadAnalysisData(language),
    loadLifePathMeanings(language),
  ]);

  const key = getCompatibilityKey(lp1, lp2);
  const compatData = data?.compatibility?.[key] || null;

  const getLifePathInfo = (lp: number): LifePathInfo | undefined => {
    const lpData = lifePathMeanings?.[String(lp)];
    if (lpData) {
      return { number: lp, title: lpData.title, meaning: lpData.meaning };
    }
    return undefined;
  };

  return {
    profile1: {
      name: profile1.name,
      lifePath: lp1,
      expression: name1Result.expression,
      soulUrge: name1Result.soulUrge,
      personality: name1Result.personality,
      lifePathInfo: getLifePathInfo(lp1),
    },
    profile2: {
      name: profile2.name,
      lifePath: lp2,
      expression: name2Result.expression,
      soulUrge: name2Result.soulUrge,
      personality: name2Result.personality,
      lifePathInfo: getLifePathInfo(lp2),
    },
    compatibility: compatData,
  };
};
