
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { calculateNameNumerology } from "@/utils/numerology";
import { NumerologyInsight } from "@/types/numerology";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNumerologyInsights } from "@/hooks/useNumerologyInsights";
import { useForecastCycles } from "@/hooks/useForecastCycles";
import ReadingHeader from "@/components/reading/ReadingHeader";
import ReadingFooter from "@/components/reading/ReadingFooter";
import ReadingTabs from "@/components/reading/ReadingTabs";
import ReadingLoader from "@/components/reading/ReadingLoader";
import NoReadingData from "@/components/reading/NoReadingData";
import ReadingNavigation from "@/components/reading/ReadingNavigation";

const ReadingContainer = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const birthdate = searchParams.get("birthdate") || "";
  const lifePath = searchParams.get("lifePath") || "";
  const { language } = useLanguage();
  const [nameInsights, setNameInsights] = useState<NumerologyInsight[]>([]);
  const [expressionNumber, setExpressionNumber] = useState<number | undefined>(undefined);
  const { insights: lifePathInsights } = useNumerologyInsights(lifePath, birthdate, expressionNumber);
  const { insights: forecastInsights, currentDate, updateDate } = useForecastCycles(birthdate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      setLoading(true);
      const getNameNumerology = async () => {
        try {
          const { insights, expression } = await calculateNameNumerology(name, language);
          setNameInsights(insights);
          setExpressionNumber(expression);
        } catch (error) {
          console.error("Error calculating name numerology:", error);
        } finally {
          setLoading(false);
        }
      };

      getNameNumerology();
    } else {
      setLoading(false);
    }
  }, [name, language]);

  if (loading) {
    return <ReadingLoader />;
  }

  if ((!name && !birthdate) || nameInsights.length === 0) {
    return <NoReadingData />;
  }

  // Find Maturity insight from lifePathInsights
  const maturityInsight = lifePathInsights.find((insight) => insight.type === "maturity");
  const lifePathNumber = lifePathInsights.find(insight => insight.type === "lifePath")?.number;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl">
          <ReadingNavigation />
          
          <ReadingHeader 
            name={name}
            birthdate={birthdate}
            lifePath={lifePath}
            nameInsights={nameInsights}
            maturityInsight={maturityInsight}
          />

          <div className="mt-6">
            <ReadingTabs
              lifePathInsights={lifePathInsights}
              nameInsights={nameInsights}
              maturityInsight={maturityInsight}
              forecastInsights={forecastInsights}
              currentDate={currentDate}
              updateDate={updateDate}
              birthdate={birthdate}
              name={name}
              lifePathNumber={lifePathNumber}
              expressionNumber={expressionNumber}
            />
          </div>

          <ReadingFooter 
            hasMaturity={!!maturityInsight} 
            hasForecast={forecastInsights.length > 0} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReadingContainer;
