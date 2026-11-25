import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/icons/github';

export default function Index() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
        <Sparkles className="size-3.5 text-primary" />
        Vite · React · Tailwind · shadcn/ui
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {t('home.title')} {t('home.subtitle')}
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {t('home.content')}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/example">
            {t('home.cta')}
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a
            href="https://github.com/0plan/vrtn"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
