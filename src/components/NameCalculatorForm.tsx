import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { calculateNameNumerology } from "@/utils/numerology";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

const NameCalculatorForm = () => {
  const navigate = useNavigate();
  const [isCalculating, setIsCalculating] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    
    try {
      // Calculate name numerology
      const nameNumerology = calculateNameNumerology(values.fullName);
      
      // Navigate to reading page with query params
      navigate(`/name-reading?name=${encodeURIComponent(values.fullName)}`);
    } catch (error) {
      console.error("Error calculating name numerology:", error);
      toast.error("Unable to calculate numerology values. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto glass shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Name Numerology Calculator</CardTitle>
        <CardDescription>
          Discover your Expression, Soul Urge, and Personality numbers based on your full birth name.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Birth Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full birth name" 
                      {...field} 
                      className="bg-background/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isCalculating}
            >
              {isCalculating ? "Calculating..." : "Calculate Name Numbers"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NameCalculatorForm;
