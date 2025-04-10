
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CombinedCalculatorForm from "@/components/CombinedCalculatorForm";
import { getLetterMapExplanation } from "@/utils/nameNumerologyCalculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const NameNumerology = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl px-4"
        >
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Numerology Calculator
          </h1>
          <p className="text-lg leading-8 text-foreground/70">
            Discover your Life Path number and the hidden meanings in your name through numerology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl px-4"
        >
          <CombinedCalculatorForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl px-4"
        >
          <Accordion type="single" collapsible className="w-full glass rounded-xl p-4">
            <AccordionItem value="explanation">
              <AccordionTrigger>How Do Numerology Numbers Work?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Life Path Number</h3>
                    <p>Your Life Path number is calculated from your birth date. It reveals your life's purpose, destiny, and the challenges you'll face.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Expression Number (Destiny Number)</h3>
                    <p>Calculated from all the letters in your full birth name. It reveals your natural abilities, talents, and the traits you'll develop throughout life.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Soul Urge Number (Heart's Desire)</h3>
                    <p>Calculated from the vowels in your full birth name. It reveals your inner desires, motivations, and what truly fulfills you.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Personality Number</h3>
                    <p>Calculated from the consonants in your full birth name. It reveals how others perceive you and the impression you make on the world.</p>
                  </div>
                  
                  <div className="bg-background/60 p-4 rounded-lg text-sm font-mono whitespace-pre-line">
                    {getLetterMapExplanation()}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NameNumerology;
