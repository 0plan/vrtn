import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Search, Smartphone, Layers } from 'lucide-react';

export default function Index() {
  const { t } = useTranslation();
  
  const features = [
    {
      title: 'Modern Sidebar',
      description: 'Collapsible navigation with nested groups and icons.',
      icon: Layout
    },
    {
      title: 'Quick Search',
      description: 'Instantly find components with real-time filtering.',
      icon: Search
    },
    {
      title: 'Responsive Design',
      description: 'Fully optimized for mobile, tablet, and desktop screens.',
      icon: Smartphone
    },
    {
      title: 'Clean Architecture',
      description: 'Built with shadcn/ui and Radix UI primitives.',
      icon: Layers
    }
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('menu.example')}</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of modern UI components and layouts.
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
                 Every component is designed to be accessible, performant, and easy to customize.
               </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Select a component from the sidebar to view its interactive demo and documentation.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
