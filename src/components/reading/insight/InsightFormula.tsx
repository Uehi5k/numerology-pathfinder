
import React, { useState } from "react";
import CalculationBreakdown from "../insights/CalculationBreakdown";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InsightFormulaProps {
  formula: string;
  type?: string;
  birthdate?: string;
  name?: string;
  lifePathNumber?: number;
  expressionNumber?: number;
}

const InsightFormula: React.FC<InsightFormulaProps> = ({ 
  formula, 
  type, 
  birthdate, 
  name,
  lifePathNumber,
  expressionNumber
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-foreground/60">Calculation</p>
        {type && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={toggleDetails}
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show Details
              </>
            )}
          </Button>
        )}
      </div>
      <div className="p-2 bg-accent/5 rounded-md mb-4">
        <p className="text-sm">{formula}</p>
      </div>
      
      {showDetails && type && (
        <CalculationBreakdown 
          type={type as any}
          birthdate={birthdate}
          name={name}
          lifePathNumber={lifePathNumber}
          expressionNumber={expressionNumber}
        />
      )}
    </>
  );
};

export default InsightFormula;
