import { useTranslation } from 'react-i18next';

export default function TypographyBlockquote() {
  const { t } = useTranslation();
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {t('example.typography.blockquote.quote')}
    </blockquote>
  );
}
