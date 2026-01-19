import { reduceNumber } from '../numerologyCalculator';

export interface Milestone {
  number: number;
  startAge: number;
  endAge: number | null; // null for the last milestone
  pinnacleNumber: number;
  challengeNumber: number;
}

/**
 * Calculate the 5 life milestones based on birthdate and life path number
 * Milestones are based on the Pinnacle cycles in numerology
 */
export const calculateMilestones = (birthdate: string, lifePathNumber: number): Milestone[] => {
  if (!birthdate) return [];
  
  const [birthYear, birthMonth, birthDay] = birthdate.split('-').map(Number);
  
  // Calculate the base age for first pinnacle: 36 - Life Path Number
  // For master numbers, use their reduced form for this calculation
  const reducedLifePath = lifePathNumber === 11 ? 2 : lifePathNumber === 22 ? 4 : lifePathNumber === 33 ? 6 : lifePathNumber;
  const firstPinnacleEndAge = 36 - reducedLifePath;
  
  // Reduce birth components
  const reducedMonth = reduceNumber(birthMonth);
  const reducedDay = reduceNumber(birthDay);
  const reducedYear = reduceNumber(birthYear);
  
  // Calculate Pinnacle numbers (what you achieve)
  const pinnacle1 = reduceNumber(reducedMonth + reducedDay); // Month + Day
  const pinnacle2 = reduceNumber(reducedDay + reducedYear);  // Day + Year
  const pinnacle3 = reduceNumber(pinnacle1 + pinnacle2);     // Pinnacle1 + Pinnacle2
  const pinnacle4 = reduceNumber(reducedMonth + reducedYear); // Month + Year
  
  // Calculate Challenge numbers (what you overcome)
  const challenge1 = Math.abs(reducedMonth - reducedDay);
  const challenge2 = Math.abs(reducedDay - reducedYear);
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(reducedMonth - reducedYear);
  
  // 5 Milestones with overlapping periods
  const milestones: Milestone[] = [
    {
      number: 1,
      startAge: 0,
      endAge: firstPinnacleEndAge,
      pinnacleNumber: pinnacle1,
      challengeNumber: challenge1
    },
    {
      number: 2,
      startAge: firstPinnacleEndAge + 1,
      endAge: firstPinnacleEndAge + 9,
      pinnacleNumber: pinnacle2,
      challengeNumber: challenge2
    },
    {
      number: 3,
      startAge: firstPinnacleEndAge + 10,
      endAge: firstPinnacleEndAge + 18,
      pinnacleNumber: pinnacle3,
      challengeNumber: challenge3
    },
    {
      number: 4,
      startAge: firstPinnacleEndAge + 19,
      endAge: firstPinnacleEndAge + 27,
      pinnacleNumber: pinnacle4,
      challengeNumber: challenge4
    },
    {
      number: 5,
      startAge: firstPinnacleEndAge + 28,
      endAge: null, // Continues for the rest of life
      pinnacleNumber: pinnacle1, // Returns to first pinnacle energy with wisdom
      challengeNumber: reduceNumber(challenge1 + challenge4) // Combined wisdom challenge
    }
  ];
  
  return milestones;
};

/**
 * Get the current milestone based on current age
 */
export const getCurrentMilestone = (milestones: Milestone[], currentAge: number): Milestone | null => {
  return milestones.find(m => 
    currentAge >= m.startAge && (m.endAge === null || currentAge <= m.endAge)
  ) || null;
};

/**
 * Calculate age from birthdate
 */
export const calculateAge = (birthdate: string): number => {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};
