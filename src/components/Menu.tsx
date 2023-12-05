import {Link, useLocation} from "react-router-dom"

interface Items extends Array<Item> {}
interface Item {
    path: string
    name: string
}

const items = [
    {path: '/examples', name: 'Examples'},
    {path: '/about', name: 'About'},
]
const activeLink = (name: string) => {
    return <a
        className="text-black font-bold underline block py-2 pr-4 pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-0 dark:text-white">
        {name}
    </a>
}

const deActiveLink = (name: string) => {
    return (
        <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:bg-transparent border-0 hover:text-primary-700 p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700">
            {name}
        </a>
    )
}
const IsActiveLink = (props: Items) => {
    const location = useLocation()
    return location.pathname.includes(props.item.path) ? activeLink(props.item.name) : deActiveLink(props.item.name)
}

const Menu = () => {
    return (
        <div className="justify-between items-center flex w-auto order-1" id="mobile-menu-2">
            <ul className="flex font-medium flex-row space-x-8 mt-0">
                {items.map((item, index) => {
                    return (<li key={index}>
                        <Link to={item.path}>
                            <IsActiveLink item={item}/>
                        </Link>
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Menu
