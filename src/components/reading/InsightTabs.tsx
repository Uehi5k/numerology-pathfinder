
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NumerologyInsight } from '@/types/numerology';
import LifePathDetails from './LifePathDetails';
import NumerologyInsightCard from './NumerologyInsightCard';
import LifePathRelationships from './LifePathRelationships';
import { useLanguage } from '@/contexts/LanguageContext';

interface InsightTabsProps {
  insights: NumerologyInsight[];
  birthdate?: string;
  lifePathNumber?: number;
}

const InsightTabs: React.FC<InsightTabsProps> = ({ 
  insights,
  birthdate,
  lifePathNumber
}) => {
  const { language } = useLanguage();
  // Find the Life Path insight
  const lifePathInsight = insights.find(insight => insight.type === 'lifePath');
  
  // Get all non-lifePath insights
  const otherInsights = insights.filter(insight => insight.type !== 'lifePath' && insight.type !== 'maturity');
  
  // Load relationship compatibility data based on language
  const [compatibilityData, setCompatibilityData] = React.useState<any>(null);
  
  React.useEffect(() => {
    const loadCompatibilityData = async () => {
      try {
        const data = await import(`@/data/translations/${language}/lifePathCompatibility.json`);
        setCompatibilityData(data.default);
      } catch (error) {
        console.error("Error loading compatibility data:", error);
      }
    };
    
    loadCompatibilityData();
  }, [language]);
  
  return (
    <Tabs defaultValue="lifePath" className="w-full">
      <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))` }}>
        <TabsTrigger value="lifePath">Life Path</TabsTrigger>
        <TabsTrigger value="attitude">Attitude</TabsTrigger>
        <TabsTrigger value="generation">Generation</TabsTrigger>
        <TabsTrigger value="dayOfBirth">Day of Birth</TabsTrigger>
        <TabsTrigger value="relationships">Relationships</TabsTrigger>
      </TabsList>
      
      <TabsContent value="lifePath">
        {lifePathInsight && (
          <>
            <NumerologyInsightCard 
              insight={lifePathInsight} 
              birthdate={birthdate}
            />
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
      
      {otherInsights.map(insight => (
        <TabsContent key={insight.type} value={insight.type}>
          <NumerologyInsightCard 
            insight={insight} 
            birthdate={birthdate}
          />
        </TabsContent>
      ))}
      
      <TabsContent value="relationships">
        {lifePathInsight && compatibilityData && (
          <div>
            <NumerologyInsightCard 
              insight={lifePathInsight} 
              birthdate={birthdate}
            />
            <LifePathRelationships 
              lifePathNumber={lifePathInsight.number} 
              relationshipData={compatibilityData[lifePathInsight.number.toString()]} 
            />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default InsightTabs;
