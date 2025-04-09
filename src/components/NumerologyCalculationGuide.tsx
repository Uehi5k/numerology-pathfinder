import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const NumerologyCalculationGuide = () => {
  return (
    <motion.div
      className="w-full glass rounded-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-xl font-medium mb-6">How Numerology Calculations Work</h2>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="lifePath" className="glass-dark border-none rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4">Life Path Number</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="border-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Formula: Month + Day + Year</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="mb-4">
                  Your Life Path number is the sum of the month, day, and year digits of your birth date, each reduced
                  to a single digit or master number.
                </p>

                <div className="glass-dark p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Example:</strong> October 15, 1990
                  </p>
                  <p className="mb-2">
                    <strong>Month:</strong> October = 10 → 1 + 0 = 1
                  </p>
                  <p className="mb-2">
                    <strong>Day:</strong> 15 → 1 + 5 = 6
                  </p>
                  <p className="mb-2">
                    <strong>Year:</strong> 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1
                  </p>
                  <Separator className="my-3" />
                  <p className="font-medium">Life Path Number: 1 + 6 + 1 = 8</p>
                </div>

                <p className="mt-4">
                  The Life Path number reveals your life's purpose and the path you'll take to fulfill it.
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="attitude" className="glass-dark border-none rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4">Attitude Number</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="border-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Formula: Month + Day</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="mb-4">
                  Your Attitude Number is calculated by adding the month and day of your birth, each reduced to a single
                  digit.
                </p>

                <div className="glass-dark p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Example:</strong> October 15
                  </p>
                  <p className="mb-2">
                    <strong>Month:</strong> October = 10 → 1 + 0 = 1
                  </p>
                  <p className="mb-2">
                    <strong>Day:</strong> 15 → 1 + 5 = 6
                  </p>
                  <Separator className="my-3" />
                  <p className="font-medium">Attitude Number: 1 + 6 = 7</p>
                </div>

                <p className="mt-4">The Attitude Number reveals how others perceive you and your outward demeanor.</p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="generation" className="glass-dark border-none rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4">Generation Number</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="border-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Formula: Sum of Birth Year Digits</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="mb-4">
                  Your Generation Number is derived from the year of your birth, reduced to a single digit or master
                  number.
                </p>

                <div className="glass-dark p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Example:</strong> 1990
                  </p>
                  <p className="mb-2">
                    <strong>Year:</strong> 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1
                  </p>
                  <Separator className="my-3" />
                  <p className="font-medium">Generation Number: 1</p>
                </div>

                <p className="mt-4">
                  The Generation Number reveals traits shared by people born in similar time periods.
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dayOfBirth" className="glass-dark border-none rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4">Day of Birth Number</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="border-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Formula: Day of Month</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="mb-4">
                  Your Day of Birth Number is simply the day of the month you were born (1-31), not reduced.
                </p>

                <div className="glass-dark p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Example:</strong> Born on the 15th day of any month
                  </p>
                  <Separator className="my-3" />
                  <p className="font-medium">Day of Birth Number: 15</p>
                </div>

                <p className="mt-4">
                  The Day of Birth Number provides insight into specific talents and traits you were born with.
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="masterNumbers" className="glass-dark border-none rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4">Master Numbers</AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <Card className="border-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Special Significance: 11, 22, 33</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="mb-4">
                  In numerology, the numbers 11, 22, and 33 are considered "master numbers" and are not reduced further.
                </p>

                <div className="glass-dark p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Master Number 11:</strong> The Intuitive
                  </p>
                  <p className="mb-2">
                    <strong>Master Number 22:</strong> The Master Builder
                  </p>
                  <p className="mb-2">
                    <strong>Master Number 33:</strong> The Master Teacher
                  </p>
                </div>

                <p className="mt-4">
                  These numbers carry higher spiritual vibrations and greater potential for achievement, but also come
                  with more challenges.
                </p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default NumerologyCalculationGuide;
