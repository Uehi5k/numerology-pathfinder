
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
import { calculateLifePath } from "@/utils/numerologyCalculator";
import { CalendarIcon } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  birthdate: z.string().min(1, "Birthdate is required"),
});

const CombinedCalculatorForm = () => {
  const navigate = useNavigate();
  const [isCalculating, setIsCalculating] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthdate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    
    try {
      // Calculate life path number
      const lifePath = calculateLifePath(values.birthdate);
            
      // Navigate to reading page with query params
      navigate(`/reading?name=${encodeURIComponent(values.fullName)}&birthdate=${values.birthdate}&lifePath=${lifePath}`);
    } catch (error) {
      console.error("Error calculating numerology values:", error);
      toast.error("Unable to calculate numerology values. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto glass shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Numerology Calculator</CardTitle>
        <CardDescription>
          Discover your Life Path, Expression, Soul Urge, and Personality numbers based on your birth information.
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
            
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CalendarIcon className="w-5 h-5 text-foreground/50" />
                      </div>
                      <Input 
                        type="date" 
                        placeholder="MM/DD/YYYY" 
                        {...field} 
                        className="pl-10 bg-background/60"
                      />
                    </div>
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
              {isCalculating ? "Calculating..." : "Calculate My Numbers"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CombinedCalculatorForm;
