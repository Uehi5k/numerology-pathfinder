
import React from "react";
import { NumerologyInsight } from "@/types/numerology";
import { Card } from "@/components/ui/card";
import ThemeIconsSection from "./forecast/ThemeIconsSection";
import ColorRecommendationsSection from "./ColorRecommendationsSection";
import CompatibilitySection from "./CompatibilitySection";
import InsightHeader from "./insight/InsightHeader";
import InsightDescription from "./insight/InsightDescription";
import InsightFormula from "./insight/InsightFormula";
import InsightStrengths from "./insight/InsightStrengths";
import InsightLifeLessons from "./insight/InsightLifeLessons";

interface NumerologyInsightCardProps {
  insight: NumerologyInsight;
  birthdate?: string;
  name?: string;
  lifePathNumber?: number;
  expressionNumber?: number;
}

const NumerologyInsightCard: React.FC<NumerologyInsightCardProps> = ({ 
  insight,
  birthdate,
  name,
  lifePathNumber,
  expressionNumber
}) => {
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

        <InsightFormula 
          formula={insight.formula} 
          type={insight.type}
          birthdate={birthdate}
          name={name}
          lifePathNumber={lifePathNumber}
          expressionNumber={expressionNumber}
        />

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

        {/* Compatibility Section */}
        {insight.compatibility && (
          <CompatibilitySection 
            compatibility={insight.compatibility} 
            className="mt-6"
          />
        )}
      </div>
    </Card>
  );
};

export default NumerologyInsightCard;
