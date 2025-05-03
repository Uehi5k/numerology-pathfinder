
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumerologyInsight } from "@/types/numerology";
import InsightTabs from "./InsightTabs";
import NumerologyInsightCard from "./NumerologyInsightCard";
import ForecastCycles from "./forecast/ForecastCycles";

interface ReadingTabsProps {
  lifePathInsights: NumerologyInsight[];
  nameInsights: NumerologyInsight[];
  maturityInsight: NumerologyInsight | undefined;
  forecastInsights: NumerologyInsight[];
  currentDate: Date;
  updateDate: (date: Date) => void;
  birthdate?: string;
  name?: string;
  lifePathNumber?: number;
  expressionNumber?: number;
}

const ReadingTabs: React.FC<ReadingTabsProps> = ({
  lifePathInsights,
  nameInsights,
  maturityInsight,
  forecastInsights,
  currentDate,
  updateDate,
  birthdate,
  name,
  lifePathNumber,
  expressionNumber
}) => {
  return (
    <Tabs defaultValue="lifePath" className="w-full">
      <TabsList className="w-full grid grid-cols-6">
        <TabsTrigger value="lifePath">Life Path</TabsTrigger>
        <TabsTrigger value="expression">Expression</TabsTrigger>
        <TabsTrigger value="soulUrge">Soul Urge</TabsTrigger>
        <TabsTrigger value="personality">Personality</TabsTrigger>
        {maturityInsight && <TabsTrigger value="maturity">Maturity</TabsTrigger>}
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
      </TabsList>

      <TabsContent value="lifePath">
        {lifePathInsights.length > 0 ? (
          <InsightTabs 
            insights={lifePathInsights}
            birthdate={birthdate}
            lifePathNumber={lifePathNumber}
          />
        ) : (
          <div className="p-6 glass dark:glass-dark rounded-xl">
            <p>Life Path information not available.</p>
          </div>
        )}
      </TabsContent>

      {nameInsights.map((insight) => (
        <TabsContent key={insight.type} value={insight.type}>
          <NumerologyInsightCard 
            insight={insight}
            name={name}
          />
        </TabsContent>
      ))}

      {maturityInsight && (
        <TabsContent value="maturity">
          <NumerologyInsightCard 
            insight={maturityInsight}
            birthdate={birthdate}
            lifePathNumber={lifePathNumber}
            expressionNumber={expressionNumber}
          />
        </TabsContent>
      )}

      <TabsContent value="forecast">
        {forecastInsights.length > 0 ? (
          <ForecastCycles 
            insights={forecastInsights}
            currentDate={currentDate}
            onDateChange={updateDate}
          />
        ) : (
          <div className="p-6 glass dark:glass-dark rounded-xl">
            <p>Forecast information not available without a birthdate.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ReadingTabs;
