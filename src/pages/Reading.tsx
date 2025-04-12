import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import BackLink from "@/components/reading/BackLink";
import { calculateNameNumerology } from "@/utils/numerology";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumerologyInsight } from "@/types/numerology";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumerologyInsightCard from "@/components/reading/NumerologyInsightCard";
import { Info } from "lucide-react";
import InsightTabs from "@/components/reading/InsightTabs";
import { useNumerologyInsights } from "@/hooks/useNumerologyInsights";

const NameReading = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const birthdate = searchParams.get("birthdate") || "";
  const lifePath = searchParams.get("lifePath") || "";
  const { language } = useLanguage();
  const [nameInsights, setNameInsights] = useState<NumerologyInsight[]>([]);
  const [expressionNumber, setExpressionNumber] = useState<number | undefined>(undefined);
  const { insights: lifePathInsights } = useNumerologyInsights(lifePath, birthdate, expressionNumber);
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
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md glass dark:glass-dark text-center">
            <CardContent className="pt-6">
              <p>Loading your numerology reading...</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if ((!name && !birthdate) || nameInsights.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md glass dark:glass-dark text-center">
            <CardHeader>
              <CardTitle>No Information Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Please use the calculator to generate your numerology reading.</p>
              <BackLink to="/numerology" label="Go to Calculator" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Find Maturity insight from lifePathInsights
  const maturityInsight = lifePathInsights.find((insight) => insight.type === "maturity");

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <BackLink to="/numerology" label="Back to Calculator" />
            <LanguageSelector />
          </div>

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

          <div className="mt-6">
            <Tabs defaultValue="lifePath" className="w-full">
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="lifePath">Life Path</TabsTrigger>
                <TabsTrigger value="expression">Expression</TabsTrigger>
                <TabsTrigger value="soulUrge">Soul Urge</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                {maturityInsight && <TabsTrigger value="maturity">Maturity</TabsTrigger>}
              </TabsList>

              <TabsContent value="lifePath">
                {lifePathInsights.length > 0 ? (
                  <InsightTabs insights={lifePathInsights} />
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p>Life Path information not available.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {nameInsights.map((insight) => (
                <TabsContent key={insight.type} value={insight.type}>
                  <NumerologyInsightCard insight={insight} />
                </TabsContent>
              ))}

              {maturityInsight && (
                <TabsContent value="maturity">
                  <NumerologyInsightCard insight={maturityInsight} />
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="mt-6 glass dark:glass-dark rounded-xl p-4 text-foreground/70 text-sm flex items-start gap-3">
            <Info className="min-w-5 h-5 mt-0.5 text-accent" />
            <p>
              Your numerology chart combines your Life Path number from your birth date and your name numbers. The Life
              Path reveals your life's purpose and challenges. The Expression number shows your natural talents, the
              Soul Urge reflects your inner desires, and the Personality number indicates how others perceive you.
              {maturityInsight && " The Maturity number reveals what you're growing toward in the second half of life."}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NameReading;
