
import { LetterNumberMap } from "../../types/numerology";

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
 * Checks if a letter is a vowel
 * @param letter The letter to check
 * @returns boolean indicating if the letter is a vowel
 */
export const isVowel = (letter: string): boolean => {
  return ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase());
};
