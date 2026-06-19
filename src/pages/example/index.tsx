import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Search, Smartphone, Layers } from 'lucide-react';

export default function Index() {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('example.overview.feature1Title'),
      description: t('example.overview.feature1Desc'),
      icon: Layout
    },
    {
      title: t('example.overview.feature2Title'),
      description: t('example.overview.feature2Desc'),
      icon: Search
    },
    {
      title: t('example.overview.feature3Title'),
      description: t('example.overview.feature3Desc'),
      icon: Smartphone
    },
    {
      title: t('example.overview.feature4Title'),
      description: t('example.overview.feature4Desc'),
      icon: Layers
    }
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('menu.example')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('example.overview.subtitle')}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-all hover:shadow-md border-muted">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <div className="grid gap-1">
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                 {t('example.overview.cardNote')}
               </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>{t('example.overview.gettingStartedTitle')}</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            {t('example.overview.gettingStartedDesc')}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
