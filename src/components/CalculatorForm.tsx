
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { calculateLifePath } from '@/utils/numerologyCalculator';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

const CalculatorForm = () => {
  const [birthdate, setBirthdate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthdate) {
      toast.error('Please enter your birthdate');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        const lifePath = calculateLifePath(birthdate);
        navigate(`/reading?lifePath=${lifePath}&birthdate=${birthdate}`);
      } catch (error) {
        toast.error('There was an error calculating your Life Path number');
        console.error(error);
      } finally {
        setIsCalculating(false);
      }
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="birthdate" className="block text-sm font-medium">
            Enter your birthdate
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="w-5 h-5 text-foreground/50" />
            </div>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="block w-full pl-10 px-4 py-3 glass rounded-lg border-0 text-foreground/90 shadow-sm ring-0 input-ring"
              placeholder="MM/DD/YYYY"
            />
          </div>
          <p className="text-xs text-foreground/60 mt-1">
            Your birthdate is used to calculate your Life Path number
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isCalculating}
          className={`w-full px-4 py-3 flex items-center justify-center rounded-lg font-medium transition-all ${
            isCalculating
              ? 'bg-accent/80 text-white/90'
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </>
          ) : (
            'Calculate My Life Path Number'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CalculatorForm;
