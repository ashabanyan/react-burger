import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../app-header/app-header.module.css";

const leftMenu = [
  {
    title: "Конструктор",
    url: "#",
    icon: <BurgerIcon type="primary" />,
  },
  {
    title: "Лента заказов",
    url: "#",
    icon: <ListIcon type="primary" />,
  },
];

const rightMenu = [
  {
    title: "Личный кабинет",
    url: "#",
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
              <li
                key={index}
                className={`${styles.menu_list_item} ${
                  index !== 0 ? "ml-10" : ""
                }`}
              >
                {item.icon}
                <p className="text text_type_main-default ml-2">{item.title}</p>
              </li>
            ))}
          </ul>

          <Logo />

          <ul
            className={`${styles.menu_list} ${styles.right_menu} ${styles.header_element}`}
          >
            {rightMenu.map((item, index) => (
              <li key={index} className={styles.menu_list_item}>
                {item.icon}
                <p className="text text_type_main-default">{item.title}</p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
