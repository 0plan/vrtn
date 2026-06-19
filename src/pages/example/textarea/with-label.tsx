import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TextareaWithLabel() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">{t('example.textarea.withLabel.label')}</Label>
      <Textarea placeholder={t('example.textarea.withLabel.placeholder')} id="message" />
    </div>
  );
}
