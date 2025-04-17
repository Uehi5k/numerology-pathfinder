
import React from "react";

interface InsightLifeLessonsProps {
  lifeLessons: string;
}

const InsightLifeLessons: React.FC<InsightLifeLessonsProps> = ({ lifeLessons }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Life Lessons</h3>
      <p className="text-foreground/80">{lifeLessons}</p>
    </div>
  );
};

export default InsightLifeLessons;
