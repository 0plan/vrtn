import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TextareaWithText() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">{t('example.textarea.withText.label')}</Label>
      <Textarea placeholder={t('example.textarea.withText.placeholder')} id="message-2" />
      <p className="text-sm text-muted-foreground">
        {t('example.textarea.withText.description')}
      </p>
    </div>
  );
}
