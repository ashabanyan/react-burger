import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { logout } from "../../services/actions/auth";
import { useHistory } from "react-router-dom";
// LOCAL
import styles from "./profile.module.css";
import { PROFILE_PAGE_TYPES } from "../../constants/constants";
import UserBlock from "../../components/profile-user-block/profile-user-block";
import OrderHistory from "../../components/order-history/order-history";
import { useEffect } from "react";
// ---------- TYPES ----------
import { RootState } from "../../services/types/index";

interface IProfile {
  type: string;
}

const ProfilePage = ({ type }: IProfile) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((store: RootState) => store.auth);

  const logoutClicked = () => {
    dispatch(logout());
    !user && history.replace({ pathname: "/login" });
  };

  useEffect(() => {
    if (!user && !!localStorage.getItem("access_token")) {
      history.replace({ pathname: "/login" });
    }
  });

  return (
    <div className="container">
      <div className={`mt-30 ${styles.profile_container}`}>
        <div className={`mr-15 ${styles.nav_container}`}>
          <NavLink
            to={{ pathname: "/profile" }}
            className={`mb-6 text text_type_main-medium text_color_inactive ${styles.profile_nav_link}`}
            activeClassName={styles.profile_nav_active_link}
            exact
          >
            Профиль
          </NavLink>
          <NavLink
            to={{ pathname: "/profile/orders" }}
            className={`mb-6 text text_type_main-medium text_color_inactive ${styles.profile_nav_link}`}
            activeClassName={styles.profile_nav_active_link}
            exact
          >
            История заказов
          </NavLink>
          <span
            onClick={logoutClicked}
            className={`mb-20 text text_type_main-medium text_color_inactive ${styles.profile_nav_link}`}
          >
            Выход
          </span>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div>
          {type === PROFILE_PAGE_TYPES.ProfilePage ? (
            <UserBlock />
          ) : (
            <OrderHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
