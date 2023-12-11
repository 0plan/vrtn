import { t } from 'i18next'

export interface Item {
  name: string
  path: string
}

export const menuItems = [
  { path: '/examples', name: t('examples') },
  { path: '/todo', name: t('Todo') },
  { path: '/about', name: t('about') }
]
