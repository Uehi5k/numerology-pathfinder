
import React from "react";
import { motion } from "framer-motion";
import { NumerologyInsight } from "@/types/numerology";

interface ReadingHeaderProps {
  name: string;
  birthdate: string;
  lifePath: string;
  nameInsights: NumerologyInsight[];
  maturityInsight: NumerologyInsight | undefined;
}

const ReadingHeader: React.FC<ReadingHeaderProps> = ({
  name,
  birthdate,
  lifePath,
  nameInsights,
  maturityInsight,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass dark:glass-dark rounded-xl overflow-hidden mb-6"
    >
      <div className="p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium mb-1">{name}</h1>
            <p className="text-foreground/70">Born: {birthdate}</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <div className="text-sm text-foreground/70 mb-1">Life Path</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-light text-primary">{lifePath}</span>
              </div>
            </div>
            {nameInsights.map((insight) => (
              <div key={insight.type} className="flex flex-col items-center">
                <div className="text-sm text-foreground/70 mb-1">
                  {insight.type
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-light text-accent">{insight.number}</span>
                </div>
              </div>
            ))}
            {maturityInsight && (
              <div className="flex flex-col items-center">
                <div className="text-sm text-foreground/70 mb-1">Maturity</div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-xl font-light text-green-500">{maturityInsight.number}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReadingHeader;
