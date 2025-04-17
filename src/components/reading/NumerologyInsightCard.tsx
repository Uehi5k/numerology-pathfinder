
import React, { useState } from "react";
import { NumerologyInsight } from "@/types/numerology";
import { 
  Rocket, 
  Crown, 
  Heart, 
  Lightbulb, 
  Compass, 
  HandHeart, 
  Star, 
  Target, 
  BookOpen,
  Search,
  Mountain,
  Zap,
  Users,
  PencilRuler,
  Scale,
  Link,
  Medal,
  Trophy,
  Brain,
  Gem,
  HeartHandshake,
  Sparkles
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NumerologyInsightCardProps {
  insight: NumerologyInsight;
}

// Map of number to associated icons and keywords
const numberIconsMap: Record<string, { icon: React.ReactNode, keyword: string }[]> = {
  "1": [
    { icon: <Rocket size={24} className="text-primary" />, keyword: "Leadership" },
    { icon: <Star size={24} className="text-accent" />, keyword: "Independence" }
  ],
  "2": [
    { icon: <Link size={24} className="text-primary" />, keyword: "Cooperation" },
    { icon: <Heart size={24} className="text-accent" />, keyword: "Harmony" }
  ],
  "3": [
    { icon: <PencilRuler size={24} className="text-primary" />, keyword: "Creativity" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Expression" }
  ],
  "4": [
    { icon: <Target size={24} className="text-primary" />, keyword: "Structure" },
    { icon: <Mountain size={24} className="text-accent" />, keyword: "Reliability" }
  ],
  "5": [
    { icon: <Compass size={24} className="text-primary" />, keyword: "Freedom" },
    { icon: <Zap size={24} className="text-accent" />, keyword: "Change" }
  ],
  "6": [
    { icon: <HandHeart size={24} className="text-primary" />, keyword: "Responsibility" },
    { icon: <Scale size={24} className="text-accent" />, keyword: "Balance" }
  ],
  "7": [
    { icon: <Search size={24} className="text-primary" />, keyword: "Analysis" },
    { icon: <BookOpen size={24} className="text-accent" />, keyword: "Wisdom" }
  ],
  "8": [
    { icon: <Trophy size={24} className="text-primary" />, keyword: "Achievement" },
    { icon: <Crown size={24} className="text-accent" />, keyword: "Authority" }
  ],
  "9": [
    { icon: <HeartHandshake size={24} className="text-primary" />, keyword: "Compassion" },
    { icon: <Users size={24} className="text-accent" />, keyword: "Humanitarian" }
  ],
  "11": [
    { icon: <Lightbulb size={24} className="text-primary" />, keyword: "Intuition" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Inspiration" }
  ],
  "22": [
    { icon: <Brain size={24} className="text-primary" />, keyword: "Mastery" },
    { icon: <Gem size={24} className="text-accent" />, keyword: "Manifestation" }
  ],
  "33": [
    { icon: <Medal size={24} className="text-primary" />, keyword: "Teaching" },
    { icon: <HandHeart size={24} className="text-accent" />, keyword: "Healing" }
  ]
};

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

        {/* Theme Icons Section */}
        {(insight.type === 'personalDay' || insight.type === 'personalMonth' || insight.type === 'personalYear') && 
          numberIconsMap[insight.number.toString()] && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Key Themes</h3>
              <div className="flex gap-6 mb-2">
                <TooltipProvider>
                  {numberIconsMap[insight.number.toString()].map((item, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
                          {item.icon}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.keyword}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          )
        }

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

        {insight.colorRecommendations && insight.colorRecommendations.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Color Recommendations</h3>
            <div className="space-y-3">
              {insight.colorRecommendations.map((color, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${color.hex}20` }}
                >
                  <div className="flex items-center mb-2">
                    <div 
                      className="w-6 h-6 rounded-full mr-2" 
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h4 className="font-medium">{color.color}</h4>
                  </div>
                  <p className="text-sm text-foreground/80">{color.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : insight.colorRecommendation ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default NumerologyInsightCard;
