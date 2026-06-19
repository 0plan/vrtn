import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/ui/textarea';

export default function TextareaDemo() {
  const { t } = useTranslation();
  return <Textarea placeholder={t('example.textarea.placeholder')} />;
}
