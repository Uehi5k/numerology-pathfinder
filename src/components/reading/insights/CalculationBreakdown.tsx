
import React from "react";
import { reduceNumber } from "@/utils/numerologyCalculator";

interface CalculationBreakdownProps {
  type: 'lifePath' | 'attitude' | 'generation' | 'dayOfBirth' | 'expression' | 'soulUrge' | 'personality' | 'maturity';
  birthdate?: string;
  name?: string;
  lifePathNumber?: number;
  expressionNumber?: number;
}

const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({ 
  type, 
  birthdate, 
  name,
  lifePathNumber,
  expressionNumber
}) => {
  // Helper function to reduce number and show the process
  const showReduction = (num: number): string => {
    if (num < 10 || num === 11 || num === 22 || num === 33) {
      return num.toString();
    }
    
    const digits = num.toString().split('').map(Number);
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    
    return `${num} → ${digits.join(' + ')} = ${sum} ${sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? '→ ' + showReduction(sum) : ''}`;
  };
  
  const renderBirthdateBreakdown = () => {
    if (!birthdate) return null;
    
    const [year, month, day] = birthdate.split('-').map(Number);
    
    // For Life Path
    if (type === 'lifePath') {
      const monthReduction = showReduction(month);
      const dayReduction = showReduction(day);
      
      // Calculate year sum step by step
      const yearDigits = year.toString().split('').map(Number);
      const yearSum = yearDigits.reduce((acc, digit) => acc + digit, 0);
      const yearReduction = showReduction(yearSum);
      
      // Calculate final sum
      const reducedMonth = reduceNumber(month);
      const reducedDay = reduceNumber(day);
      const reducedYear = reduceNumber(yearSum);
      const totalSum = reducedMonth + reducedDay + reducedYear;
      
      return (
        <div className="space-y-2 text-sm">
          <div className="flex flex-col space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <span>Month:</span>
              <span>{month} {month >= 10 ? `→ ${monthReduction}` : ''}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Day:</span>
              <span>{day} {day >= 10 ? `→ ${dayReduction}` : ''}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Year:</span>
              <span>{year} → {yearDigits.join(' + ')} = {yearSum} {yearSum >= 10 && yearSum !== 11 && yearSum !== 22 && yearSum !== 33 ? `→ ${yearReduction}` : ''}</span>
            </div>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Final Calculation:</span>
              <span>{reducedMonth} + {reducedDay} + {reduceNumber(yearSum)} = {totalSum} {totalSum >= 10 && totalSum !== 11 && totalSum !== 22 && totalSum !== 33 ? `→ ${showReduction(totalSum)}` : ''}</span>
            </div>
          </div>
        </div>
      );
    }
    
    // For Attitude number
    if (type === 'attitude') {
      const monthReduction = showReduction(month);
      const dayReduction = showReduction(day);
      const sum = reduceNumber(month) + reduceNumber(day);
      
      return (
        <div className="space-y-2 text-sm">
          <div className="flex flex-col space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <span>Month:</span>
              <span>{month} {month >= 10 ? `→ ${monthReduction}` : ''}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Day:</span>
              <span>{day} {day >= 10 ? `→ ${dayReduction}` : ''}</span>
            </div>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Final Calculation:</span>
              <span>{reduceNumber(month)} + {reduceNumber(day)} = {sum} {sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `→ ${showReduction(sum)}` : ''}</span>
            </div>
          </div>
        </div>
      );
    }
    
    // For Generation number
    if (type === 'generation') {
      const yearDigits = year.toString().split('').map(Number);
      const sum = yearDigits.reduce((acc, digit) => acc + digit, 0);
      
      return (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span>Year:</span>
            <span>{year}</span>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Digits:</span>
              <span>{yearDigits.join(' + ')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Sum:</span>
              <span>{sum} {sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `→ ${showReduction(sum)}` : ''}</span>
            </div>
          </div>
        </div>
      );
    }
    
    // For Day of Birth
    if (type === 'dayOfBirth') {
      return (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span>Day of Birth:</span>
            <span>The day of the month you were born: {day}</span>
          </div>
          <div className="text-xs text-foreground/60 mt-1">
            <p>Note: The Day of Birth is not reduced to a single digit like other numbers.</p>
          </div>
        </div>
      );
    }
    
    // For Maturity
    if (type === 'maturity' && lifePathNumber !== undefined && expressionNumber !== undefined) {
      const sum = lifePathNumber + expressionNumber;
      
      return (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span>Life Path:</span>
            <span>{lifePathNumber}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span>Expression:</span>
            <span>{expressionNumber}</span>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Final Calculation:</span>
              <span>{lifePathNumber} + {expressionNumber} = {sum} {sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `→ ${showReduction(sum)}` : ''}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  const renderNameBreakdown = () => {
    if (!name) return null;
    
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const letterValues: Record<string, number> = {
      a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
      j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
      s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    };
    
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    
    if (type === 'expression') {
      // Calculate letter by letter
      const letterCalculations = cleanName.split('').map((letter) => ({
        letter,
        value: letterValues[letter] || 0
      }));
      
      // Calculate sum
      const sum = letterCalculations.reduce((acc, { value }) => acc + value, 0);
      
      return (
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Name: </span>
            <span>{name}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1">Letter</th>
                  <th className="text-left p-1">Value</th>
                </tr>
              </thead>
              <tbody>
                {letterCalculations.map((calc, idx) => (
                  <tr key={idx} className="border-b border-foreground/5">
                    <td className="p-1">{calc.letter.toUpperCase()}</td>
                    <td className="p-1">{calc.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Sum of all letters:</span>
              <span>{sum}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Final Expression Number:</span>
              <span>{sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `${sum} → ${showReduction(sum)}` : sum}</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (type === 'soulUrge') {
      // Calculate only using vowels
      const letterCalculations = cleanName.split('').map((letter) => ({
        letter,
        value: vowels.includes(letter) ? letterValues[letter] || 0 : 0,
        isVowel: vowels.includes(letter)
      }));
      
      // Calculate sum of vowels
      const vowelCalculations = letterCalculations.filter(calc => calc.isVowel);
      const sum = vowelCalculations.reduce((acc, { value }) => acc + value, 0);
      
      return (
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Name: </span>
            <span>{name}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1">Letter</th>
                  <th className="text-left p-1">Value</th>
                  <th className="text-left p-1">Type</th>
                </tr>
              </thead>
              <tbody>
                {letterCalculations.map((calc, idx) => (
                  <tr key={idx} className={`border-b border-foreground/5 ${calc.isVowel ? 'bg-primary/10' : ''}`}>
                    <td className="p-1">{calc.letter.toUpperCase()}</td>
                    <td className="p-1">{calc.isVowel ? calc.value : '-'}</td>
                    <td className="p-1">{calc.isVowel ? 'Vowel' : 'Consonant'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Sum of vowels:</span>
              <span>{sum}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Final Soul Urge Number:</span>
              <span>{sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `${sum} → ${showReduction(sum)}` : sum}</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (type === 'personality') {
      // Calculate only using consonants
      const letterCalculations = cleanName.split('').map((letter) => ({
        letter,
        value: !vowels.includes(letter) ? letterValues[letter] || 0 : 0,
        isConsonant: !vowels.includes(letter)
      }));
      
      // Calculate sum of consonants
      const consonantCalculations = letterCalculations.filter(calc => calc.isConsonant);
      const sum = consonantCalculations.reduce((acc, { value }) => acc + value, 0);
      
      return (
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Name: </span>
            <span>{name}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1">Letter</th>
                  <th className="text-left p-1">Value</th>
                  <th className="text-left p-1">Type</th>
                </tr>
              </thead>
              <tbody>
                {letterCalculations.map((calc, idx) => (
                  <tr key={idx} className={`border-b border-foreground/5 ${calc.isConsonant ? 'bg-primary/10' : ''}`}>
                    <td className="p-1">{calc.letter.toUpperCase()}</td>
                    <td className="p-1">{calc.isConsonant ? calc.value : '-'}</td>
                    <td className="p-1">{calc.isConsonant ? 'Consonant' : 'Vowel'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-2">
            <div className="grid grid-cols-2 gap-2">
              <span>Sum of consonants:</span>
              <span>{sum}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Final Personality Number:</span>
              <span>{sum >= 10 && sum !== 11 && sum !== 22 && sum !== 33 ? `${sum} → ${showReduction(sum)}` : sum}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="mt-4 border border-foreground/10 rounded-lg p-3 bg-muted/30">
      <h4 className="font-medium mb-2">Detailed Calculation</h4>
      {type === 'lifePath' || type === 'attitude' || type === 'generation' || type === 'dayOfBirth' || type === 'maturity' 
        ? renderBirthdateBreakdown() 
        : renderNameBreakdown()}
    </div>
  );
};

export default CalculationBreakdown;
