import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <main>
      <p className={'text-3xl'}>{t('menu.about')}</p>
    </main>
  )
}
