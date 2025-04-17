
import React from "react";

interface InsightDescriptionProps {
  description: string;
}

const InsightDescription: React.FC<InsightDescriptionProps> = ({ description }) => {
  return (
    <div className="mt-4">
      <p className="text-foreground/80">{description}</p>
    </div>
  );
};

export default InsightDescription;
