
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import BackLink from "@/components/reading/BackLink";
import { calculateNameNumerology } from "@/utils/nameNumerologyCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumerologyInsight } from "@/types/numerology";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumerologyInsightCard from "@/components/reading/NumerologyInsightCard";
import { Info } from "lucide-react";

const NameReading = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const { language } = useLanguage();
  const [insights, setInsights] = useState<NumerologyInsight[]>([]);

  useEffect(() => {
    if (name) {
      try {
        const { insights } = calculateNameNumerology(name, language);
        setInsights(insights);
      } catch (error) {
        console.error("Error calculating name numerology:", error);
      }
    }
  }, [name, language]);

  if (!name || insights.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md glass text-center">
            <CardHeader>
              <CardTitle>No Name Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Please use the calculator to generate your name numerology reading.
              </p>
              <BackLink to="/name-numerology" label="Go to Name Calculator" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Find the Expression insight for the title
  const expressionInsight = insights.find(
    (insight) => insight.type === "expression"
  );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <BackLink to="/name-numerology" label="Back to Calculator" />
            <LanguageSelector />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl overflow-hidden mb-6"
          >
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-medium mb-1">{name}</h1>
                  <p className="text-foreground/70">Name Numerology Reading</p>
                </div>
                <div className="flex gap-3">
                  {insights.map((insight) => (
                    <div
                      key={insight.type}
                      className="flex flex-col items-center"
                    >
                      <div className="text-sm text-foreground/70 mb-1">
                        {insight.type
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-xl font-light text-accent">
                          {insight.number}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-6">
            <Tabs defaultValue="expression" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="expression">Expression</TabsTrigger>
                <TabsTrigger value="soulUrge">Soul Urge</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
              </TabsList>

              {insights.map((insight) => (
                <TabsContent key={insight.type} value={insight.type}>
                  <NumerologyInsightCard insight={insight} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-6 glass rounded-xl p-4 text-foreground/70 text-sm flex items-start gap-3">
            <Info className="min-w-5 h-5 mt-0.5 text-accent" />
            <p>
              Name numerology provides insights into different aspects of your
              personality based on the vibrations of the letters in your name.
              The Expression number reveals your natural talents, the Soul Urge
              number reflects your inner desires, and the Personality number
              shows how others perceive you.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NameReading;
