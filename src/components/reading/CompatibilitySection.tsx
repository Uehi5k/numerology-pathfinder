import React from "react";
import { CompatibilityData } from "@/types/numerology";

interface CompatibilitySectionProps {
  compatibility: CompatibilityData;
  className?: string;
}

const CompatibilitySection: React.FC<CompatibilitySectionProps> = ({ 
  compatibility, 
  className = "" 
}) => {
  const renderNumbers = (numbers: number[]) => 
    numbers.map((num, index) => (
      <span 
        key={num}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium"
      >
        {num}
      </span>
    ));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground/80">
          Compatibility Overview
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {compatibility.compatibility.overview}
        </p>
      </div>

      {/* Best Matches */}
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-green-600 dark:text-green-400">
              Best Matches
            </h4>
            <div className="flex gap-2">
              {renderNumbers(compatibility.bestMatches)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {compatibility.compatibility.bestMatchesDesc}
          </p>
        </div>

        {/* Good Matches */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Good Matches
            </h4>
            <div className="flex gap-2">
              {renderNumbers(compatibility.goodMatches)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {compatibility.compatibility.goodMatchesDesc}
          </p>
        </div>

        {/* Challenging Matches */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              Challenging Matches
            </h4>
            <div className="flex gap-2">
              {renderNumbers(compatibility.challengingMatches)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {compatibility.compatibility.challengingMatchesDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompatibilitySection;