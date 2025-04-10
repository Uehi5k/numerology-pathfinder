
// This file provides backward compatibility with existing imports
// It re-exports all functions from the new modular structure

import { letterMap, getLetterMapExplanation, isVowel } from './numerology/letterMap';
import { calculateExpression, getExpressionMeaning } from './numerology/expressionNumber';
import { calculateSoulUrge, getSoulUrgeMeaning } from './numerology/soulUrgeNumber';
import { calculatePersonality, getPersonalityMeaning } from './numerology/personalityNumber';
import { calculateNameNumerology } from './numerology/nameNumerology';

// Re-export everything to maintain backward compatibility
export {
  letterMap,
  getLetterMapExplanation,
  calculateExpression,
  getExpressionMeaning,
  calculateSoulUrge,
  getSoulUrgeMeaning,
  calculatePersonality,
  getPersonalityMeaning,
  calculateNameNumerology
};
