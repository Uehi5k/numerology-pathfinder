
import React from "react";
import { NumerologyInsight } from "@/types/numerology";
import { Card } from "@/components/ui/card";
import ThemeIconsSection from "./forecast/ThemeIconsSection";
import ColorRecommendationsSection from "./ColorRecommendationsSection";
import InsightHeader from "./insight/InsightHeader";
import InsightDescription from "./insight/InsightDescription";
import InsightFormula from "./insight/InsightFormula";
import InsightStrengths from "./insight/InsightStrengths";
import InsightLifeLessons from "./insight/InsightLifeLessons";

interface NumerologyInsightCardProps {
  insight: NumerologyInsight;
}

const NumerologyInsightCard: React.FC<NumerologyInsightCardProps> = ({ insight }) => {
  const showThemeIcons = insight.type === 'personalDay' || 
                         insight.type === 'personalMonth' || 
                         insight.type === 'personalYear';
  
  return (
    <Card className="glass dark:glass-dark rounded-xl overflow-hidden">
      <div className="p-6">
        <InsightHeader 
          title={insight.title} 
          number={insight.number} 
        />

        <InsightFormula formula={insight.formula} />

        <InsightDescription description={insight.description} />

        {/* Theme Icons Section */}
        {showThemeIcons && (
          <ThemeIconsSection 
            number={insight.number} 
            className="mt-6"
          />
        )}

        {/* Strengths Section */}
        {insight.strengths && insight.strengths.length > 0 && (
          <InsightStrengths strengths={insight.strengths} />
        )}

        {/* Life Lessons Section */}
        {insight.lifeLessons && (
          <InsightLifeLessons lifeLessons={insight.lifeLessons} />
        )}

        {/* Color Recommendations Section */}
        {insight.colorRecommendations && insight.colorRecommendations.length > 0 ? (
          <ColorRecommendationsSection colorRecommendations={insight.colorRecommendations} />
        ) : insight.colorRecommendation ? (
          <ColorRecommendationsSection colorRecommendations={[insight.colorRecommendation]} />
        ) : null}
      </div>
    </Card>
  );
};

export default NumerologyInsightCard;
