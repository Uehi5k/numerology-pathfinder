
import React from "react";
import { Info } from "lucide-react";

interface ReadingFooterProps {
  hasMaturity: boolean;
  hasForecast: boolean;
}

const ReadingFooter: React.FC<ReadingFooterProps> = ({ hasMaturity, hasForecast }) => {
  return (
    <div className="mt-6 glass dark:glass-dark rounded-xl p-4 text-foreground/70 text-sm flex items-start gap-3">
      <Info className="min-w-5 h-5 mt-0.5 text-accent" />
      <p>
        Your numerology chart combines your Life Path number from your birth date and your name numbers. The Life
        Path reveals your life's purpose and challenges. The Expression number shows your natural talents, the
        Soul Urge reflects your inner desires, and the Personality number indicates how others perceive you.
        {hasMaturity && " The Maturity number reveals what you're growing toward in the second half of life."}
        {hasForecast && " The Forecast section shows how numbers influence your daily, monthly, and yearly cycles."}
      </p>
    </div>
  );
};

export default ReadingFooter;
