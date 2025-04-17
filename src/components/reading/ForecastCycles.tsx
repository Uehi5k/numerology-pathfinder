import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Palette, 
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
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NumerologyInsight } from '@/types/numerology';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ForecastCyclesProps {
  insights: NumerologyInsight[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

// Map of number to associated icons and keywords with Spanish translations
const numberIconsMap: Record<string, { icon: React.ReactNode, keyword: string, keywordEs?: string }[]> = {
  "1": [
    { icon: <Rocket size={24} className="text-primary" />, keyword: "Leadership", keywordEs: "Liderazgo" },
    { icon: <Star size={24} className="text-accent" />, keyword: "Independence", keywordEs: "Independencia" }
  ],
  "2": [
    { icon: <Link size={24} className="text-primary" />, keyword: "Cooperation", keywordEs: "Cooperación" },
    { icon: <Heart size={24} className="text-accent" />, keyword: "Harmony", keywordEs: "Armonía" }
  ],
  "3": [
    { icon: <PencilRuler size={24} className="text-primary" />, keyword: "Creativity", keywordEs: "Creatividad" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Expression", keywordEs: "Expresión" }
  ],
  "4": [
    { icon: <Target size={24} className="text-primary" />, keyword: "Structure", keywordEs: "Estructura" },
    { icon: <Mountain size={24} className="text-accent" />, keyword: "Reliability", keywordEs: "Confiabilidad" }
  ],
  "5": [
    { icon: <Compass size={24} className="text-primary" />, keyword: "Freedom", keywordEs: "Libertad" },
    { icon: <Zap size={24} className="text-accent" />, keyword: "Change", keywordEs: "Cambio" }
  ],
  "6": [
    { icon: <HandHeart size={24} className="text-primary" />, keyword: "Responsibility", keywordEs: "Responsabilidad" },
    { icon: <Scale size={24} className="text-accent" />, keyword: "Balance", keywordEs: "Equilibrio" }
  ],
  "7": [
    { icon: <Search size={24} className="text-primary" />, keyword: "Analysis", keywordEs: "Análisis" },
    { icon: <BookOpen size={24} className="text-accent" />, keyword: "Wisdom", keywordEs: "Sabiduría" }
  ],
  "8": [
    { icon: <Trophy size={24} className="text-primary" />, keyword: "Achievement", keywordEs: "Logro" },
    { icon: <Crown size={24} className="text-accent" />, keyword: "Authority", keywordEs: "Autoridad" }
  ],
  "9": [
    { icon: <HeartHandshake size={24} className="text-primary" />, keyword: "Compassion", keywordEs: "Compasión" },
    { icon: <Users size={24} className="text-accent" />, keyword: "Humanitarian", keywordEs: "Humanitario" }
  ],
  "11": [
    { icon: <Lightbulb size={24} className="text-primary" />, keyword: "Intuition", keywordEs: "Intuición" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Inspiration", keywordEs: "Inspiración" }
  ],
  "22": [
    { icon: <Brain size={24} className="text-primary" />, keyword: "Mastery", keywordEs: "Maestría" },
    { icon: <Gem size={24} className="text-accent" />, keyword: "Manifestation", keywordEs: "Manifestación" }
  ],
  "33": [
    { icon: <Medal size={24} className="text-primary" />, keyword: "Teaching", keywordEs: "Enseñanza" },
    { icon: <HandHeart size={24} className="text-accent" />, keyword: "Healing", keywordEs: "Sanación" }
  ]
};

const ForecastCycles: React.FC<ForecastCyclesProps> = ({ insights, currentDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  
  // Find insights by type
  const personalDayInsight = insights.find(insight => insight.type === 'personalDay');
  const personalMonthInsight = insights.find(insight => insight.type === 'personalMonth');
  const personalYearInsight = insights.find(insight => insight.type === 'personalYear');
  
  // Format the date display
  const formattedDate = format(currentDate, 'PPP');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Numerology Forecast</h2>
          <p className="text-foreground/70">See how numbers influence your days, months, and years</p>
        </div>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => {
                if (date) {
                  onDateChange(date);
                  setOpen(false);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
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
      
      <Tabs defaultValue="personalDay" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="personalDay">Day</TabsTrigger>
          <TabsTrigger value="personalMonth">Month</TabsTrigger>
          <TabsTrigger value="personalYear">Year</TabsTrigger>
        </TabsList>
        
        {insights.map((insight) => (
          <TabsContent key={insight.type} value={insight.type}>
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
                
                {/* Theme Icons Section - Now with click-to-show tooltips */}
                {numberIconsMap[insight.number.toString()] && (
                  <div className="mt-4 flex gap-4 p-4 rounded-lg border bg-background/50">
                    {numberIconsMap[insight.number.toString()].map((item, index) => (
                      <Popover key={index}>
                        <PopoverTrigger asChild>
                          <div className="p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
                            {item.icon}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <p>{language === 'es' && item.keywordEs ? item.keywordEs : item.keyword}</p>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                )}
                
                {insight.colorRecommendation && (
                  <div className="mt-4 p-4 rounded-lg border bg-background/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-5 w-5 text-accent" />
                      <h3 className="font-medium">Color Recommendation: {insight.colorRecommendation.color}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: insight.colorRecommendation.hex }}
                      ></div>
                      <div className="text-sm text-foreground/80">{insight.colorRecommendation.hex}</div>
                    </div>
                    <p className="text-sm text-foreground/80">
                      {insight.colorRecommendation.description}
                    </p>
                  </div>
                )}
                
                <div className="text-sm text-foreground/60 mt-4">
                  <strong>How is this calculated?</strong> {insight.formula}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ForecastCycles;
