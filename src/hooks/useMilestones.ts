import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculateMilestones, calculateAge, Milestone } from '@/utils/numerology/milestones';

export interface MilestoneContent {
  title: string;
  pinnacleDescription: string;
  challengeDescription: string;
  guidance: string;
}

export interface MilestoneData extends Milestone {
  content: MilestoneContent;
}

export const useMilestones = (birthdate: string, lifePathNumber: number) => {
  const [milestones, setMilestones] = useState<MilestoneData[]>([]);
  const [currentAge, setCurrentAge] = useState<number>(0);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState<number>(0);
  const { language } = useLanguage();

  useEffect(() => {
    if (!birthdate || !lifePathNumber) {
      setMilestones([]);
      return;
    }

    const loadMilestones = async () => {
      try {
        const calculatedMilestones = calculateMilestones(birthdate, lifePathNumber);
        const age = calculateAge(birthdate);
        setCurrentAge(age);
        
        // Load milestone meanings
        let milestoneMeanings;
        try {
          milestoneMeanings = (await import(`@/data/translations/${language}/milestoneMeanings.json`)).default;
        } catch {
          milestoneMeanings = (await import('@/data/translations/en/milestoneMeanings.json')).default;
        }
        
        // Combine calculations with content
        const milestonesWithContent: MilestoneData[] = calculatedMilestones.map((milestone, index) => {
          const pinnacleKey = milestone.pinnacleNumber.toString();
          const challengeKey = milestone.challengeNumber.toString();
          
          return {
            ...milestone,
            content: {
              title: milestoneMeanings.milestones[milestone.number]?.title || `Milestone ${milestone.number}`,
              pinnacleDescription: milestoneMeanings.pinnacles[pinnacleKey]?.description || '',
              challengeDescription: milestoneMeanings.challenges[challengeKey]?.description || '',
              guidance: milestoneMeanings.milestones[milestone.number]?.guidance || ''
            }
          };
        });
        
        setMilestones(milestonesWithContent);
        
        // Find current milestone index
        const currentIndex = calculatedMilestones.findIndex(m => 
          age >= m.startAge && (m.endAge === null || age <= m.endAge)
        );
        setCurrentMilestoneIndex(currentIndex >= 0 ? currentIndex : 0);
        
      } catch (error) {
        console.error("Error loading milestone data:", error);
        setMilestones([]);
      }
    };

    loadMilestones();
  }, [birthdate, lifePathNumber, language]);

  return { milestones, currentAge, currentMilestoneIndex };
};
