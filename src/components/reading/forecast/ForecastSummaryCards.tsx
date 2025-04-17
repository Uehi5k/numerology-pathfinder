
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NumerologyInsight } from '@/types/numerology';

interface ForecastSummaryCardsProps {
  personalDayInsight?: NumerologyInsight;
  personalMonthInsight?: NumerologyInsight;
  personalYearInsight?: NumerologyInsight;
}

const ForecastSummaryCards: React.FC<ForecastSummaryCardsProps> = ({ 
  personalDayInsight, 
  personalMonthInsight, 
  personalYearInsight 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {personalDayInsight && (
        <Card className="bg-primary/5 border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              <span className="text-4xl font-light text-primary">{personalDayInsight.number}</span>
            </CardTitle>
            <CardDescription className="text-center">Personal Day</CardDescription>
            {personalDayInsight.colorRecommendation && (
              <div className="flex justify-center items-center mt-2">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: personalDayInsight.colorRecommendation.hex }}
                ></div>
                <span className="text-sm">{personalDayInsight.colorRecommendation.color}</span>
              </div>
            )}
          </CardHeader>
        </Card>
      )}
      
      {personalMonthInsight && (
        <Card className="bg-accent/5 border-accent/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              <span className="text-4xl font-light text-accent">{personalMonthInsight.number}</span>
            </CardTitle>
            <CardDescription className="text-center">Personal Month</CardDescription>
          </CardHeader>
        </Card>
      )}
      
      {personalYearInsight && (
        <Card className="bg-green-500/5 border-green-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              <span className="text-4xl font-light text-green-500">{personalYearInsight.number}</span>
            </CardTitle>
            <CardDescription className="text-center">Personal Year</CardDescription>
            {personalYearInsight.colorRecommendation && (
              <div className="flex justify-center items-center mt-2">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: personalYearInsight.colorRecommendation.hex }}
                ></div>
                <span className="text-sm">{personalYearInsight.colorRecommendation.color}</span>
              </div>
            )}
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default ForecastSummaryCards;
