import { Link, useLocation } from 'react-router-dom'
import { Item, menuItems } from '@components/layouts/header/menuItems.tsx'

interface IProps {
  item: Item
}

const activeLink = (item: Item) => {
  return (
    <Link
      className={'font-medium text-blue-500'}
      to={item.path}>
      {item.name}
    </Link>
  )
}
const deActiveLink = (item: Item) => {
  return (
    <Link
      className={'font-medium'}
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
  return (
    <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
      {menuItems.map((item) => {
        return (
          <IsActiveLink key={item.path} item={item} />
        )
      })}
    </div>
  )
}

export default Menu
