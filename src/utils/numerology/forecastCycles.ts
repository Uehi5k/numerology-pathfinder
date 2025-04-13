import { reduceNumber } from '../numerologyCalculator';

/**
 * Calculates Personal Day number
 * @param birthDay Birth day (1-31)
 * @param targetDate Date to calculate for
 * @returns Personal Day number
 */
export const calculatePersonalDay = (birthDay: number, targetDate: Date = new Date()): number => {
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1; // JavaScript months are 0-indexed
  const year = targetDate.getFullYear();
  
  // Calculate the sum of the day, month, and year
  const sum = birthDay + day + month + year;
  
  // Reduce to a single digit (or keep master numbers)
  return reduceNumber(sum);
};

/**
 * Calculates Personal Month number
 * @param birthDay Birth day (1-31)
 * @param birthMonth Birth month (1-12)
 * @param targetDate Date to calculate for
 * @returns Personal Month number
 */
export const calculatePersonalMonth = (birthDay: number, birthMonth: number, targetDate: Date = new Date()): number => {
  const month = targetDate.getMonth() + 1; // JavaScript months are 0-indexed
  const year = targetDate.getFullYear();
  
  // Calculate the sum of the birth month, current month, and current year
  const sum = birthMonth + month + year;
  
  // Reduce to a single digit (or keep master numbers)
  return reduceNumber(sum);
};

/**
 * Calculates Personal Year number
 * @param birthDay Birth day (1-31)
 * @param birthMonth Birth month (1-12)
 * @param targetDate Date to calculate for
 * @returns Personal Year number
 */
export const calculatePersonalYear = (birthDay: number, birthMonth: number, targetDate: Date = new Date()): number => {
  const year = targetDate.getFullYear();
  
  // Calculate the sum of the birth day, birth month, and current year
  const sum = birthDay + birthMonth + year;
  
  // Reduce to a single digit (or keep master numbers)
  return reduceNumber(sum);
};

/**
 * Calculates all forecast cycles (personal day, month, year)
 * @param birthdate Birthdate in YYYY-MM-DD format
 * @param targetDate Date to calculate for
 * @returns Object with personal day, month, and year numbers
 */
export const calculateForecastCycles = (birthdate: string, targetDate: Date = new Date()) => {
  if (!birthdate) {
    return { personalDay: 0, personalMonth: 0, personalYear: 0 };
  }
  
  const [, birthMonthStr, birthDayStr] = birthdate.split('-');
  const birthDay = parseInt(birthDayStr, 10);
  const birthMonth = parseInt(birthMonthStr, 10);
  
  return {
    personalDay: calculatePersonalDay(birthDay, targetDate),
    personalMonth: calculatePersonalMonth(birthDay, birthMonth, targetDate),
    personalYear: calculatePersonalYear(birthDay, birthMonth, targetDate)
  };
};
