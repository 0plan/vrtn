import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InputWithText() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">{t('example.input.withText.label')}</Label>
      <Input type="email" id="email-2" placeholder={t('example.input.withText.placeholder')} />
      <p className="text-sm text-muted-foreground">{t('example.input.withText.description')}</p>
    </div>
  );
}
