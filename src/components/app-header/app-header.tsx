import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../app-header/app-header.module.css";
import { NavLink, Link } from "react-router-dom";

const leftMenu = [
  {
    title: "Конструктор",
    url: "/",
    icon: <BurgerIcon type="primary" />,
  },
  {
    title: "Лента заказов",
    url: "/orders",
    icon: <ListIcon type="primary" />,
  },
];

const rightMenu = [
  {
    title: "Личный кабинет",
    url: "/profile",
    icon: <ProfileIcon type="primary" />,
  },
];

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <nav className={styles.navigation}>
          <ul
            className={`${styles.menu_list} ${styles.left_menu} ${styles.header_element}`}
          >
            {leftMenu.map((item, index) => (
              <NavLink
                exact
                to={{ pathname: item.url }}
                key={index}
                className={`${styles.menu_list_item} text text_type_main-default text_color_inactive`}
                activeStyle={{ color: "white" }}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </NavLink>
            ))}
          </ul>

          <Link to={{ pathname: "/" }}>
            <Logo />
          </Link>

          <ul
            className={`${styles.menu_list} ${styles.right_menu} ${styles.header_element}`}
          >
            {rightMenu.map((item, index) => (
              <NavLink
                to={{ pathname: "/profile" }}
                key={index}
                className={`${styles.menu_list_item} text text_type_main-default text_color_inactive`}
                activeStyle={{ color: "white" }}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
