
import React from 'react';
import { Palette } from 'lucide-react';
import { ColorRecommendation as ColorRecommendationType } from '@/types/numerology';

interface ColorRecommendationProps {
  colorRecommendation: ColorRecommendationType;
}

const ColorRecommendationSection: React.FC<ColorRecommendationProps> = ({ colorRecommendation }) => {
  if (!colorRecommendation) {
    return null;
  }
  
  return (
    <div className="mt-4 p-4 rounded-lg border bg-background/50">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="h-5 w-5 text-accent" />
        <h3 className="font-medium">Color Recommendation: {colorRecommendation.color}</h3>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-10 h-10 rounded-md border"
          style={{ backgroundColor: colorRecommendation.hex }}
        ></div>
        <div className="text-sm text-foreground/80">{colorRecommendation.hex}</div>
      </div>
      <p className="text-sm text-foreground/80">
        {colorRecommendation.description}
      </p>
    </div>
  );
};

export default ColorRecommendationSection;
