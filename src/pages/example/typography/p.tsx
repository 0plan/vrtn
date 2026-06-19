import { useTranslation } from 'react-i18next';

export default function TypographyP() {
  const { t } = useTranslation();
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {t('example.typography.p.paragraph')}
    </p>
  );
}
