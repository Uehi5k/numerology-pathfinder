
/**
 * Numerology calculator utility functions
 */

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
 * Returns the meaning of a Life Path number
 * @param num The Life Path number
 * @returns The meaning as a string
 */
export const getLifePathMeaning = (num: number): { title: string, meaning: string } => {
  const meanings: Record<number, { title: string, meaning: string }> = {
    1: {
      title: "The Leader",
      meaning: "Individuals with Life Path 1 are natural born leaders. They are independent, determined, and ambitious. They have strong willpower and are very self-sufficient. They are innovative and not afraid to pioneer new ways of doing things."
    },
    2: {
      title: "The Mediator",
      meaning: "Life Path 2 individuals are peace-loving and diplomatic. They are cooperative, considerate, and sensitive to others' needs. They excel in partnerships and function best in harmonious environments. They are great mediators who can bring opposing sides together."
    },
    3: {
      title: "The Creator",
      meaning: "Those with Life Path 3 are creative, expressive, and sociable. They have a natural artistic talent and a gift for communication. They bring joy and optimism to others and are often the life of the party. They are imaginative and have a deep appreciation for beauty."
    },
    4: {
      title: "The Builder",
      meaning: "Life Path 4 individuals are practical, reliable, and hardworking. They are methodical, systematic, and great problem-solvers. They value stability and security and are dedicated to creating a solid foundation for themselves and others. They are disciplined and trustworthy."
    },
    5: {
      title: "The Freedom Seeker",
      meaning: "Those with Life Path 5 are adventurous, versatile, and freedom-loving. They embrace change and are adaptable to new situations. They have a natural curiosity and a desire to explore the world around them. They are energetic, dynamic, and resist routine."
    },
    6: {
      title: "The Nurturer",
      meaning: "Life Path 6 individuals are compassionate, nurturing, and responsible. They have a strong sense of duty towards family and community. They are natural counselors who like to take care of others. They value harmony, balance, and beauty in their surroundings."
    },
    7: {
      title: "The Seeker",
      meaning: "Those with Life Path 7 are analytical, intuitive, and spiritually oriented. They have a deep need to understand the underlying truths of life. They are natural researchers who seek knowledge and wisdom. They value their privacy and time for introspection."
    },
    8: {
      title: "The Achiever",
      meaning: "Life Path 8 individuals are ambitious, practical, and goal-oriented. They have a natural ability for business and financial matters. They are determined to achieve material success and recognition. They are authoritative, confident, and have good judgment."
    },
    9: {
      title: "The Humanitarian",
      meaning: "Those with Life Path 9 are compassionate, selfless, and idealistic. They have a strong sense of justice and a desire to make the world a better place. They are naturally drawn to humanitarian causes and helping others. They are tolerant, generous, and forgiving."
    },
    11: {
      title: "The Intuitive",
      meaning: "Life Path 11 is a Master Number representing high spiritual awareness and intuitive abilities. These individuals are idealistic, inspirational, and visionary. They are natural healers who can bridge the gap between the material and spiritual worlds."
    },
    22: {
      title: "The Master Builder",
      meaning: "Life Path 22 is known as the 'Master Builder'. These individuals have the potential to achieve great things on a large scale. They are practical visionaries who can manifest their ideas into reality. They are highly ambitious and disciplined."
    },
    33: {
      title: "The Master Teacher",
      meaning: "Life Path 33 is the 'Master Teacher'. These individuals have a high spiritual awareness and a deep compassion for humanity. They are selfless nurturers who inspire and uplift others through their wisdom and love. They are destined to create significant positive change."
    }
  };
  
  return meanings[num] || { 
    title: "Unknown", 
    meaning: "This number does not have a standard Life Path interpretation."
  };
};

/**
 * Get all number meanings for display
 */
export const getAllNumberMeanings = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map(num => ({
    number: num,
    ...getLifePathMeaning(num)
  }));
};
