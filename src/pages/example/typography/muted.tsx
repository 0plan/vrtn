import { useTranslation } from 'react-i18next';

export default function TypographyMuted() {
  const { t } = useTranslation();
  return (
    <p className="text-sm text-muted-foreground">
      {t('example.typography.muted.text')}
    </p>
  );
}
