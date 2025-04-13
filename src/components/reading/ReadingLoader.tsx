
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const ReadingLoader: React.FC = () => {
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
};

export default ReadingLoader;
