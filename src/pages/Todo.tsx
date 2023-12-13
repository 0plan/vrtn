import { useTranslation } from 'react-i18next'

export default function Todo() {
  const { t } = useTranslation()

  return (
    <main>
      <p className={'text-3xl'}>{t('menu.todo')}</p>
    </main>
  )
}
