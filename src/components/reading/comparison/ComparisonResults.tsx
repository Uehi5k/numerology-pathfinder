import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Heart, Users, MessageCircle, Target, TrendingUp, Lightbulb, CheckCircle, AlertTriangle, RotateCcw, Compass } from 'lucide-react';
import { ComparisonResult } from '@/utils/numerology/comparativeAnalysis';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonResultsProps {
  result: ComparisonResult;
  onReset: () => void;
}

const labels: Record<string, any> = {
  en: {
    results: "Compatibility Results",
    profile1: "Profile 1",
    profile2: "Profile 2",
    lifePath: "Life Path",
    expression: "Expression",
    soulUrge: "Soul Urge",
    personality: "Personality",
    overallCompatibility: "Overall Compatibility",
    strengthsTogether: "Strengths Together",
    challengesTogether: "Challenges Together",
    communication: "Communication Style",
    emotionalConnection: "Emotional Connection",
    sharedGoals: "Shared Goals & Values",
    growthAreas: "Growth Areas",
    advice: "Relationship Advice",
    reset: "New Comparison",
    noData: "No compatibility data available for this combination.",
    lifePathDescription: "Life Path Description",
    relationshipLifePath: "Relationship's Life Path",
  },
  es: {
    results: "Resultados de Compatibilidad",
    profile1: "Perfil 1",
    profile2: "Perfil 2",
    lifePath: "Camino de Vida",
    expression: "Expresión",
    soulUrge: "Impulso del Alma",
    personality: "Personalidad",
    overallCompatibility: "Compatibilidad General",
    strengthsTogether: "Fortalezas Juntos",
    challengesTogether: "Desafíos Juntos",
    communication: "Estilo de Comunicación",
    emotionalConnection: "Conexión Emocional",
    sharedGoals: "Metas y Valores Compartidos",
    growthAreas: "Áreas de Crecimiento",
    advice: "Consejos para la Relación",
    reset: "Nueva Comparación",
    noData: "No hay datos de compatibilidad disponibles para esta combinación.",
    lifePathDescription: "Descripción del Camino de Vida",
    relationshipLifePath: "Camino de Vida de la Relación",
  },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600 dark:text-green-400';
  if (score >= 65) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-orange-600 dark:text-orange-400';
};

const getScoreLabel = (score: number, lang: string) => {
  if (lang === 'es') {
    if (score >= 85) return 'Excelente';
    if (score >= 75) return 'Muy Buena';
    if (score >= 65) return 'Buena';
    if (score >= 55) return 'Moderada';
    return 'Desafiante';
  }
  if (score >= 85) return 'Excellent';
  if (score >= 75) return 'Very Good';
  if (score >= 65) return 'Good';
  if (score >= 55) return 'Moderate';
  return 'Challenging';
};

const ProfileCard: React.FC<{ label: string; profile: ComparisonResult['profile1']; t: any }> = ({ label, profile, t }) => (
  <Card className="glass dark:glass-dark">
    <CardContent className="pt-4 pb-4">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="font-bold text-lg mb-2">{profile.name}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="secondary">{t.lifePath}: {profile.lifePath}</Badge>
        {profile.expression && <Badge variant="outline">{t.expression}: {profile.expression}</Badge>}
        {profile.soulUrge && <Badge variant="outline">{t.soulUrge}: {profile.soulUrge}</Badge>}
        {profile.personality && <Badge variant="outline">{t.personality}: {profile.personality}</Badge>}
      </div>
      {profile.lifePathInfo && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-sm font-semibold text-primary mb-1">
            {t.lifePath} {profile.lifePath}: {profile.lifePathInfo.title}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {profile.lifePathInfo.meaning}
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="space-y-2">
    <h4 className="font-semibold flex items-center gap-2">{icon}{title}</h4>
    <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
  </div>
);

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ result, onReset }) => {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const { compatibility } = result;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileCard label={t.profile1} profile={result.profile1} t={t} />
        <ProfileCard label={t.profile2} profile={result.profile2} t={t} />
      </div>

      {compatibility ? (
        <Card className="glass dark:glass-dark border-primary/20">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">{t.overallCompatibility}</CardTitle>
            <div className="flex justify-center items-center gap-3 mt-2">
              <span className={`text-5xl font-bold ${getScoreColor(compatibility.score)}`}>
                {compatibility.score}%
              </span>
              <Badge className={getScoreColor(compatibility.score)} variant="outline">
                {getScoreLabel(compatibility.score, language)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Relationship's Life Path Section */}
            <Section icon={<Compass className="h-5 w-5 text-primary" />} title={t.relationshipLifePath}>
              <p className="leading-relaxed">{compatibility.overview}</p>
              {result.profile1.lifePathInfo && result.profile2.lifePathInfo && (
                <p className="mt-2 leading-relaxed">
                  {language === 'es'
                    ? `Cuando el ${result.profile1.lifePathInfo.title} (Camino de Vida ${result.profile1.lifePath}) se une con el ${result.profile2.lifePathInfo.title} (Camino de Vida ${result.profile2.lifePath}), la relación adquiere una dinámica única. Las cualidades de liderazgo e independencia del ${result.profile1.lifePathInfo.title} se entrelazan con las características del ${result.profile2.lifePathInfo.title}, creando un vínculo que tiene el potencial de crecimiento mutuo y transformación profunda. Juntos, estos caminos de vida pueden complementarse de maneras que individualmente no serían posibles, aportando equilibrio y nuevas perspectivas a la relación.`
                    : `When ${result.profile1.lifePathInfo.title} (Life Path ${result.profile1.lifePath}) joins with ${result.profile2.lifePathInfo.title} (Life Path ${result.profile2.lifePath}), the relationship takes on a unique dynamic. The leadership and independence qualities of ${result.profile1.lifePathInfo.title} interweave with the characteristics of ${result.profile2.lifePathInfo.title}, creating a bond that holds the potential for mutual growth and deep transformation. Together, these life paths can complement each other in ways that wouldn't be possible individually, bringing balance and new perspectives to the relationship.`
                  }
                </p>
              )}
            </Section>
            
            <Separator />

            <Section icon={<CheckCircle className="h-5 w-5 text-green-500" />} title={t.strengthsTogether}>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Section>

            <Section icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />} title={t.challengesTogether}>
              <ul className="list-disc list-inside space-y-1">
                {compatibility.challenges.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </Section>

            <Separator />

            <Section icon={<MessageCircle className="h-5 w-5 text-blue-500" />} title={t.communication}>
              {compatibility.communication}
            </Section>

            <Section icon={<Heart className="h-5 w-5 text-red-500" />} title={t.emotionalConnection}>
              {compatibility.emotionalConnection}
            </Section>

            <Section icon={<Target className="h-5 w-5 text-purple-500" />} title={t.sharedGoals}>
              {compatibility.sharedGoals}
            </Section>

            <Section icon={<TrendingUp className="h-5 w-5 text-orange-500" />} title={t.growthAreas}>
              {compatibility.growthAreas}
            </Section>

            <Separator />

            <Section icon={<Lightbulb className="h-5 w-5 text-primary" />} title={t.advice}>
              <p className="font-medium text-foreground">{compatibility.advice}</p>
            </Section>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass dark:glass-dark">
          <CardContent className="py-8 text-center text-muted-foreground">
            {t.noData}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          {t.reset}
        </Button>
      </div>
    </div>
  );
};

export default ComparisonResults;
