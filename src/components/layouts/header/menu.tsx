import { Link, useLocation } from 'react-router-dom';

export interface IMenu {
  name: string;
  path: string;
}
interface IProps {
  menuItems: IMenu[];
}

const isActive = (path: string) => {
  const location = useLocation();
  return location.pathname.includes(path);
};

function Menu({ menuItems }: IProps) {
  return (
    <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
      {menuItems.map((menu) => (
        <Link
          className={isActive(menu.path.toString()) ? 'text-blue-500' : ''}
          key={menu.path}
          to={menu.path}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
}

export default Menu;
