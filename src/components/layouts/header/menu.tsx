import { Link, useLocation } from 'react-router-dom';

export interface IMenu {
  name: string;
  path: string;
}
interface IProps {
  menuItems: IMenu[];
}

function Menu({ menuItems }: IProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
      {menuItems.map((menu) => (
        <Link
          className={isActive(menu.path.toString()) ? 'text-primary' : ''}
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
