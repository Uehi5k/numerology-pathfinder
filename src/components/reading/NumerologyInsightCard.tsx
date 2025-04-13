
import React from "react";
import { NumerologyInsight } from "@/types/numerology";

interface NumerologyInsightCardProps {
  insight: NumerologyInsight;
}

const NumerologyInsightCard: React.FC<NumerologyInsightCardProps> = ({ insight }) => {
  return (
    <div className="glass dark:glass-dark rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">{insight.title}</h2>
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-xl font-light text-accent">{insight.number}</span>
          </div>
        </div>

        <p className="text-sm text-foreground/60 mb-2">Calculation</p>
        <div className="p-2 bg-accent/5 rounded-md mb-4">
          <p className="text-sm">{insight.formula}</p>
        </div>

        <div className="mt-4">
          <p className="text-foreground/80">{insight.description}</p>
        </div>

        {insight.strengths && insight.strengths.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              {insight.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {insight.lifeLessons && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Life Lessons</h3>
            <p className="text-foreground/80">{insight.lifeLessons}</p>
          </div>
        )}

        {insight.colorRecommendation && (
          <div 
            className="mt-6 p-4 rounded-lg"
            style={{ backgroundColor: `${insight.colorRecommendation.hex}20` }}
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-6 h-6 rounded-full mr-2" 
                style={{ backgroundColor: insight.colorRecommendation.hex }}
              ></div>
              <h3 className="font-medium">Your Color: {insight.colorRecommendation.color}</h3>
            </div>
            <p className="text-sm text-foreground/80">{insight.colorRecommendation.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumerologyInsightCard;
