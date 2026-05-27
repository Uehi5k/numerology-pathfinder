import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Users, Sparkles, Heart, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RelationshipType } from '@/utils/numerology/comparativeAnalysis';

interface ComparisonFormProps {
  onSubmit: (profile: { name: string; birthdate: string; gender: string }, relationshipType: RelationshipType) => void;
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
    relationshipType: "Relationship Type",
    romantic: "Romantic",
    working: "Working",
    romanticDesc: "Personal & love connection",
    workingDesc: "Professional collaboration",
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
    relationshipType: "Tipo de Relación",
    romantic: "Romántica",
    working: "Laboral",
    romanticDesc: "Conexión personal y amorosa",
    workingDesc: "Colaboración profesional",
  },
};

const ComparisonForm: React.FC<ComparisonFormProps> = ({ onSubmit, loading }) => {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [relationshipType, setRelationshipType] = useState<RelationshipType>('romantic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && birthdate && gender) {
      onSubmit({ name, birthdate, gender }, relationshipType);
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
          <div className="space-y-2">
            <Label>{t.relationshipType}</Label>
            <RadioGroup
              value={relationshipType}
              onValueChange={(v) => setRelationshipType(v as RelationshipType)}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="rt-romantic"
                className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  relationshipType === 'romantic' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <RadioGroupItem value="romantic" id="rt-romantic" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    <Heart className="h-4 w-4 text-red-500" />
                    {t.romantic}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t.romanticDesc}</p>
                </div>
              </Label>
              <Label
                htmlFor="rt-working"
                className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                  relationshipType === 'working' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <RadioGroupItem value="working" id="rt-working" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium">
                    <Briefcase className="h-4 w-4 text-blue-500" />
                    {t.working}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t.workingDesc}</p>
                </div>
              </Label>
            </RadioGroup>
          </div>
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
