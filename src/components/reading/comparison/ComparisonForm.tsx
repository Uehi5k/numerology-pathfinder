import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonFormProps {
  onSubmit: (profile: { name: string; birthdate: string; gender: string }) => void;
  loading: boolean;
}

const labels: Record<string, any> = {
  en: {
    title: "Comparative Analysis",
    subtitle: "Compare two numerology profiles to discover relationship dynamics",
    secondProfile: "Second Profile",
    name: "Full Name",
    birthdate: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    analyze: "Analyze Compatibility",
    namePlaceholder: "Enter full name",
  },
  es: {
    title: "Análisis Comparativo",
    subtitle: "Compara dos perfiles numerológicos para descubrir las dinámicas de relación",
    secondProfile: "Segundo Perfil",
    name: "Nombre Completo",
    birthdate: "Fecha de Nacimiento",
    gender: "Género",
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
    analyze: "Analizar Compatibilidad",
    namePlaceholder: "Ingrese nombre completo",
  },
};

const ComparisonForm: React.FC<ComparisonFormProps> = ({ onSubmit, loading }) => {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthdate && gender) {
      onSubmit({ name, birthdate, gender });
    }
  };

  return (
    <Card className="glass dark:glass-dark border-primary/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">{t.title}</CardTitle>
        <CardDescription>{t.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t.secondProfile}
          </h3>
          <div className="space-y-2">
            <Label htmlFor="comp-name">{t.name}</Label>
            <Input
              id="comp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comp-birthdate">{t.birthdate}</Label>
            <Input
              id="comp-birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comp-gender">{t.gender}</Label>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger>
                <SelectValue placeholder={t.gender} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t.male}</SelectItem>
                <SelectItem value="female">{t.female}</SelectItem>
                <SelectItem value="other">{t.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading || !name || !birthdate || !gender}>
            {loading ? '...' : t.analyze}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComparisonForm;
