
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NumerologyInsight } from '@/types/numerology';
import ForecastHeader from './ForecastHeader';
import ForecastSummaryCards from './ForecastSummaryCards';
import ForecastTabContent from './ForecastTabContent';

interface ForecastCyclesProps {
  insights: NumerologyInsight[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const ForecastCycles: React.FC<ForecastCyclesProps> = ({ insights, currentDate, onDateChange }) => {
  // Find insights by type
  const personalDayInsight = insights.find(insight => insight.type === 'personalDay');
  const personalMonthInsight = insights.find(insight => insight.type === 'personalMonth');
  const personalYearInsight = insights.find(insight => insight.type === 'personalYear');
  
  return (
    <div className="space-y-6">
      <ForecastHeader currentDate={currentDate} onDateChange={onDateChange} />
      
      <ForecastSummaryCards 
        personalDayInsight={personalDayInsight}
        personalMonthInsight={personalMonthInsight}
        personalYearInsight={personalYearInsight}
      />
      
      <Tabs defaultValue="personalDay" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="personalDay">Day</TabsTrigger>
          <TabsTrigger value="personalMonth">Month</TabsTrigger>
          <TabsTrigger value="personalYear">Year</TabsTrigger>
        </TabsList>
        
        {insights.map((insight) => (
          <TabsContent key={insight.type} value={insight.type}>
            <ForecastTabContent insight={insight} currentDate={currentDate} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ForecastCycles;
