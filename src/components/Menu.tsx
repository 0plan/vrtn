import {Link, useLocation} from "react-router-dom"


const items = [
    {path: '/examples', name: 'Examples'},
    {path: '/about', name: 'About'},
]
const activeLink = (name) => {
    return <a
        className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
        {name}
    </a>
}

const deActiveLink = (name) => {
    return (
        <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
            {name}
        </a>
    )
}
const IsActiveLink = (props) => {
    const location = useLocation()
    return location.pathname.includes(props.item.path) ? activeLink(props.item.name) : deActiveLink(props.item.name)
}

const Menu = () => {
    return (
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
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
