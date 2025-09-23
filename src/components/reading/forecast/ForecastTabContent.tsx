
import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { NumerologyInsight } from '@/types/numerology';
import ThemeIconsSection from './ThemeIconsSection';
import ColorRecommendationSection from './ColorRecommendation';
import CompatibilitySection from '../CompatibilitySection';

interface ForecastTabContentProps {
  insight: NumerologyInsight;
  currentDate: Date;
}

const ForecastTabContent: React.FC<ForecastTabContentProps> = ({ insight, currentDate }) => {
  const formattedDate = format(currentDate, 'PPP');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{insight.title}</CardTitle>
        <CardDescription>
          For {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-foreground/80 leading-relaxed">
          {insight.description}
        </div>
        
        {/* Theme Icons Section */}
        <ThemeIconsSection number={insight.number} />
        
        {/* Color Recommendation */}
        {insight.colorRecommendation && (
          <ColorRecommendationSection colorRecommendation={insight.colorRecommendation} />
        )}
        
        {/* Compatibility Section */}
        {insight.compatibility && (
          <CompatibilitySection compatibility={insight.compatibility} className="mt-4" />
        )}
        
        <div className="text-sm text-foreground/60 mt-4">
          <strong>How is this calculated?</strong> {insight.formula}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastTabContent;
