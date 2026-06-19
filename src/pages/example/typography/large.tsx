import { useTranslation } from 'react-i18next';

export default function TypographyLarge() {
  const { t } = useTranslation();
  return (
    <div className="text-lg font-semibold">
      {t('example.typography.large.text')}
    </div>
  );
}
