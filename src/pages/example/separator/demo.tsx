import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';

export default function SeparatorDemo() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          {t('example.separator.description')}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>{t('example.separator.blog')}</div>
        <Separator orientation="vertical" />
        <div>{t('example.separator.docs')}</div>
        <Separator orientation="vertical" />
        <div>{t('example.separator.source')}</div>
      </div>
    </div>
  );
}
