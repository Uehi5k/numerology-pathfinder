
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ForecastHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const ForecastHeader: React.FC<ForecastHeaderProps> = ({ currentDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  
  // Format the date display
  const formattedDate = format(currentDate, 'PPP');
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-semibold">Numerology Forecast</h2>
        <p className="text-foreground/70">See how numbers influence your days, months, and years</p>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => {
              if (date) {
                onDateChange(date);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ForecastHeader;
