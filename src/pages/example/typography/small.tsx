import { useTranslation } from 'react-i18next';

export default function TypographySmall() {
  const { t } = useTranslation();
  return (
    <small className="text-sm font-medium leading-none">
      {t('example.typography.small.text')}
    </small>
  );
}
