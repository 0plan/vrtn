import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function TextareaWithButton() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder={t('example.textarea.withButton.placeholder')} />
      <Button>{t('example.textarea.withButton.button')}</Button>
    </div>
  );
}
