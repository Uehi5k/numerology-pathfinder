
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Palette } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NumerologyInsight } from '@/types/numerology';
import { cn } from '@/lib/utils';

interface ForecastCyclesProps {
  insights: NumerologyInsight[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const ForecastCycles: React.FC<ForecastCyclesProps> = ({ insights, currentDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  
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
