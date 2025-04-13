
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import BackLink from "./BackLink";

const NoReadingData: React.FC = () => {
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
};

export default NoReadingData;
