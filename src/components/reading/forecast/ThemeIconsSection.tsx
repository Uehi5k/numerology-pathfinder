
import React from 'react';
import { 
  Rocket, Crown, Heart, Lightbulb, Compass, HandHeart, Star, Target, BookOpen,
  Search, Mountain, Zap, Users, PencilRuler, Scale, Link, Medal, Trophy,
  Brain, Gem, HeartHandshake, Sparkles
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';

// Map of number to associated icons and keywords with Spanish translations
const numberIconsMap: Record<string, { icon: React.ReactNode, keyword: string, keywordEs?: string }[]> = {
  "1": [
    { icon: <Rocket size={24} className="text-primary" />, keyword: "Leadership", keywordEs: "Liderazgo" },
    { icon: <Star size={24} className="text-accent" />, keyword: "Independence", keywordEs: "Independencia" }
  ],
  "2": [
    { icon: <Link size={24} className="text-primary" />, keyword: "Cooperation", keywordEs: "Cooperación" },
    { icon: <Heart size={24} className="text-accent" />, keyword: "Harmony", keywordEs: "Armonía" }
  ],
  "3": [
    { icon: <PencilRuler size={24} className="text-primary" />, keyword: "Creativity", keywordEs: "Creatividad" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Expression", keywordEs: "Expresión" }
  ],
  "4": [
    { icon: <Target size={24} className="text-primary" />, keyword: "Structure", keywordEs: "Estructura" },
    { icon: <Mountain size={24} className="text-accent" />, keyword: "Reliability", keywordEs: "Confiabilidad" }
  ],
  "5": [
    { icon: <Compass size={24} className="text-primary" />, keyword: "Freedom", keywordEs: "Libertad" },
    { icon: <Zap size={24} className="text-accent" />, keyword: "Change", keywordEs: "Cambio" }
  ],
  "6": [
    { icon: <HandHeart size={24} className="text-primary" />, keyword: "Responsibility", keywordEs: "Responsabilidad" },
    { icon: <Scale size={24} className="text-accent" />, keyword: "Balance", keywordEs: "Equilibrio" }
  ],
  "7": [
    { icon: <Search size={24} className="text-primary" />, keyword: "Analysis", keywordEs: "Análisis" },
    { icon: <BookOpen size={24} className="text-accent" />, keyword: "Wisdom", keywordEs: "Sabiduría" }
  ],
  "8": [
    { icon: <Trophy size={24} className="text-primary" />, keyword: "Achievement", keywordEs: "Logro" },
    { icon: <Crown size={24} className="text-accent" />, keyword: "Authority", keywordEs: "Autoridad" }
  ],
  "9": [
    { icon: <HeartHandshake size={24} className="text-primary" />, keyword: "Compassion", keywordEs: "Compasión" },
    { icon: <Users size={24} className="text-accent" />, keyword: "Humanitarian", keywordEs: "Humanitario" }
  ],
  "11": [
    { icon: <Lightbulb size={24} className="text-primary" />, keyword: "Intuition", keywordEs: "Intuición" },
    { icon: <Sparkles size={24} className="text-accent" />, keyword: "Inspiration", keywordEs: "Inspiración" }
  ],
  "22": [
    { icon: <Brain size={24} className="text-primary" />, keyword: "Mastery", keywordEs: "Maestría" },
    { icon: <Gem size={24} className="text-accent" />, keyword: "Manifestation", keywordEs: "Manifestación" }
  ],
  "33": [
    { icon: <Medal size={24} className="text-primary" />, keyword: "Teaching", keywordEs: "Enseñanza" },
    { icon: <HandHeart size={24} className="text-accent" />, keyword: "Healing", keywordEs: "Sanación" }
  ]
};

interface ThemeIconsSectionProps {
  number: number;
  className?: string;
}

const ThemeIconsSection: React.FC<ThemeIconsSectionProps> = ({ number, className }) => {
  const { language } = useLanguage();
  const numberIcons = numberIconsMap[number.toString()];
  
  if (!numberIcons) {
    return null;
  }
  
  return (
    <div className={className || "mt-4 flex gap-4 p-4 rounded-lg border bg-background/50"}>
      {numberIcons.map((item, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <div className="p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
              {item.icon}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <p>{language === 'es' && item.keywordEs ? item.keywordEs : item.keyword}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default ThemeIconsSection;
