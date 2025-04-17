
import React from "react";

interface InsightFormulaProps {
  formula: string;
}

const InsightFormula: React.FC<InsightFormulaProps> = ({ formula }) => {
  return (
    <>
      <p className="text-sm text-foreground/60 mb-2">Calculation</p>
      <div className="p-2 bg-accent/5 rounded-md mb-4">
        <p className="text-sm">{formula}</p>
      </div>
    </>
  );
};

export default InsightFormula;
