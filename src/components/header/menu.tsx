import { t } from 'i18next'
import { Link, useLocation } from 'react-router-dom'

interface IProps {
  item: Item
}

interface Item {
  name: string
  path: string
}

const activeLink = (item: Item) => {
  return (
    <Link
      className={'font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'}
      to={item.path}>
      {item.name}
    </Link>
  )
}
const deActiveLink = (item: Item) => {
  return (
    <Link
      className={'font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'}
      to={item.path}>
      {item.name}
    </Link>
  )
}

const IsActiveLink = (props: IProps) => {
  const location = useLocation()
  return location.pathname.includes(props.item.path) ? activeLink(props.item) : deActiveLink(props.item)
}
const Menu = () => {
  const items = [
    { path: '/examples', name: t('examples') },
    { path: '/todo', name: t('Todo') },
    { path: '/about', name: t('about') }
  ]

  return (
    <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
      {items.map((item) => {
        return (
          <IsActiveLink key={item.path} item={item} />
        )
      })}
    </div>
  )
}

export default Menu
