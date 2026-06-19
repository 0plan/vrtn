import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';

export default function InputDemo() {
  const { t } = useTranslation();
  return <Input type="email" placeholder={t('example.input.placeholder')} />;
}
