import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MilestoneData } from "@/hooks/useMilestones";
import { useLanguage } from "@/contexts/LanguageContext";
import { Milestone, Target, Lightbulb, Star } from "lucide-react";

interface MilestoneSectionProps {
  milestones: MilestoneData[];
  currentAge: number;
  currentMilestoneIndex: number;
}

const MilestoneSection: React.FC<MilestoneSectionProps> = ({
  milestones,
  currentAge,
  currentMilestoneIndex
}) => {
  const { language } = useLanguage();
  
  const labels = {
    en: {
      currentAge: "Current Age",
      pinnacle: "Pinnacle",
      challenge: "Challenge",
      ages: "Ages",
      onwards: "onwards",
      current: "Current",
      guidance: "Guidance"
    },
    es: {
      currentAge: "Edad Actual",
      pinnacle: "Pináculo",
      challenge: "Desafío",
      ages: "Edades",
      onwards: "en adelante",
      current: "Actual",
      guidance: "Guía"
    }
  };
  
  const t = labels[language as keyof typeof labels] || labels.en;

  if (milestones.length === 0) {
    return (
      <div className="p-6 glass dark:glass-dark rounded-xl">
        <p>{language === 'es' ? 'Información de hitos no disponible.' : 'Milestone information not available.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Age Badge */}
      <div className="flex justify-center">
        <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/10">
          {t.currentAge}: {currentAge}
        </Badge>
      </div>

      {/* Timeline View */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const isCurrent = index === currentMilestoneIndex;
            const isPast = index < currentMilestoneIndex;
            
            return (
              <div 
                key={milestone.number}
                className={`relative flex items-start gap-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCurrent 
                      ? 'bg-primary border-primary text-primary-foreground scale-125' 
                      : isPast 
                        ? 'bg-muted border-muted-foreground/50 text-muted-foreground' 
                        : 'bg-background border-border text-foreground'
                  }`}>
                    {milestone.number}
                  </div>
                </div>
                
                {/* Content Card */}
                <Card className={`w-[calc(50%-2rem)] ${
                  isCurrent 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : isPast 
                      ? 'opacity-75' 
                      : 'opacity-90'
                } ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Milestone className="h-4 w-4" />
                        {milestone.content.title}
                      </CardTitle>
                      {isCurrent && (
                        <Badge variant="default" className="animate-pulse">
                          {t.current}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {t.ages}: {milestone.startAge} - {milestone.endAge ?? t.onwards}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Pinnacle */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Star className="h-4 w-4" />
                        {t.pinnacle} {milestone.pinnacleNumber}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.content.pinnacleDescription}
                      </p>
                    </div>
                    
                    {/* Challenge */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-accent">
                        <Target className="h-4 w-4" />
                        {t.challenge} {milestone.challengeNumber}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.content.challengeDescription}
                      </p>
                    </div>
                    
                    {/* Guidance */}
                    {milestone.content.guidance && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm font-medium mb-1">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          {t.guidance}
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          {milestone.content.guidance}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MilestoneSection;
