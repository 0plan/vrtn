import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/ui/textarea';

export default function TextareaDisabled() {
  const { t } = useTranslation();
  return <Textarea placeholder={t('example.textarea.disabled.placeholder')} disabled />;
}
