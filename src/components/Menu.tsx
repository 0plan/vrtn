import {t} from "i18next"
import {Link, useLocation} from "react-router-dom"


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
            className={'text-black font-bold py-2 pr-4 pl-3 rounded border-b bg-primary-700 bg-transparent text-primary-700 p-0 dark:text-white'}
            to={item.path}>
            {item.name}
        </Link>
    )
}

const deActiveLink = (item: Item) => {
    return (
        <Link
            className={'className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 hover:bg-gray-50 hover:bg-transparent border-0 hover:text-primary-700 p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700"'}
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
        {path: '/examples', name: t('examples')},
        {path: '/todo', name: t('Todo')},
        {path: '/about', name: t('about')},
    ]
    return (
        <div className="justify-between items-center flex w-auto order-1" id="mobile-menu-2">
            <ul className="flex font-medium flex-row space-x-8 mt-0">
                {items.map((item) => {
                    return (<li key={item.path}>
                        <IsActiveLink item={item}/>
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Menu
