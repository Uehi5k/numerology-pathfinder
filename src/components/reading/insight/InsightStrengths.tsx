
import React from "react";

interface InsightStrengthsProps {
  strengths: string[];
}

const InsightStrengths: React.FC<InsightStrengthsProps> = ({ strengths }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
      <ul className="list-disc list-inside space-y-1 text-foreground/80">
        {strengths.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightStrengths;
