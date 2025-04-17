
import React from "react";
import { ColorRecommendation } from "@/types/numerology";

interface ColorRecommendationsSectionProps {
  colorRecommendations: ColorRecommendation[];
}

const ColorRecommendationsSection: React.FC<ColorRecommendationsSectionProps> = ({ 
  colorRecommendations 
}) => {
  if (!colorRecommendations || colorRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">
        {colorRecommendations.length > 1 ? "Color Recommendations" : "Your Color"}
      </h3>
      <div className="space-y-3">
        {colorRecommendations.map((color, index) => (
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
              <h4 className="font-medium">
                {colorRecommendations.length > 1 ? color.color : `Your Color: ${color.color}`}
              </h4>
            </div>
            <p className="text-sm text-foreground/80">{color.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorRecommendationsSection;
