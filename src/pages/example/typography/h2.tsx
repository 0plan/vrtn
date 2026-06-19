import { useTranslation } from 'react-i18next';

export default function TypographyH2() {
  const { t } = useTranslation();
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {t('example.typography.h2.heading')}
    </h2>
  );
}
