import { Link, useLocation } from 'react-router-dom'

interface IProps {
  item: Item
}

export interface Item {
  name: string
  path: string
}

const activeLink = (item: Item) => {
  return (
    <Link className={'font-medium text-blue-500'} to={item.path}>
      {item.name}
    </Link>
  )
}
const deActiveLink = (item: Item) => {
  return (
    <Link className={'font-medium'} to={item.path}>
      {item.name}
    </Link>
  )
}

const IsActiveLink = (props: IProps) => {
  const location = useLocation()
  return location.pathname.includes(props.item.path)
    ? activeLink(props.item)
    : deActiveLink(props.item)
}

const Menu = ({ menuItems }) => {
  return (
    <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
      {menuItems.map((item) => {
        return <IsActiveLink key={item.path} item={item} />
      })}
    </div>
  )
}

export default Menu
