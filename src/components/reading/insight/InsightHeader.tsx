
import React from "react";

interface InsightHeaderProps {
  title: string;
  number: number;
}

const InsightHeader: React.FC<InsightHeaderProps> = ({ title, number }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
        <span className="text-xl font-light text-accent">{number}</span>
      </div>
    </div>
  );
};

export default InsightHeader;
