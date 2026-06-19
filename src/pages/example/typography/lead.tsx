import { useTranslation } from 'react-i18next';

export default function TypographyLead() {
  const { t } = useTranslation();
  return (
    <p className="text-xl text-muted-foreground">
      {t('example.typography.lead.lead')}
    </p>
  );
}
