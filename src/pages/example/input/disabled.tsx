import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';

export default function InputDisabled() {
  const { t } = useTranslation();
  return <Input disabled type="email" placeholder={t('example.input.disabled.placeholder')} />;
}
