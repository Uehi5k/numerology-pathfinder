
import React from "react";
import BackLink from "@/components/reading/BackLink";
import LanguageSelector from "@/components/LanguageSelector";

const ReadingNavigation = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <BackLink to="/numerology" label="Back to Calculator" />
      <LanguageSelector />
    </div>
  );
};

export default ReadingNavigation;
