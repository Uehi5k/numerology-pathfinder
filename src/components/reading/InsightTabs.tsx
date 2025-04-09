
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NumerologyInsight } from '@/types/numerology';
import LifePathDetails from './LifePathDetails';
import NumerologyInsightCard from './NumerologyInsightCard';

interface InsightTabsProps {
  insights: NumerologyInsight[];
}

const InsightTabs: React.FC<InsightTabsProps> = ({ insights }) => {
  // Find the Life Path insight
  const lifePathInsight = insights.find(insight => insight.type === 'lifePath');
  
  return (
    <Tabs defaultValue="lifePath" className="w-full">
      <TabsList className="w-full grid grid-cols-4 mb-6">
        <TabsTrigger value="lifePath">Life Path</TabsTrigger>
        <TabsTrigger value="attitude">Attitude</TabsTrigger>
        <TabsTrigger value="generation">Generation</TabsTrigger>
        <TabsTrigger value="dayOfBirth">Day of Birth</TabsTrigger>
      </TabsList>
      
      <TabsContent value="lifePath">
        {lifePathInsight && (
          <>
            <NumerologyInsightCard insight={lifePathInsight} />
            <div className="mt-6">
              <LifePathDetails 
                meaning={lifePathInsight.description} 
                strengths={lifePathInsight.strengths || []} 
                lifeLessons={lifePathInsight.lifeLessons || ''} 
              />
            </div>
          </>
        )}
      </TabsContent>
      
      {insights
        .filter(insight => insight.type !== 'lifePath')
        .map(insight => (
          <TabsContent key={insight.type} value={insight.type}>
            <NumerologyInsightCard insight={insight} />
          </TabsContent>
        ))
      }
    </Tabs>
  );
};

export default InsightTabs;
