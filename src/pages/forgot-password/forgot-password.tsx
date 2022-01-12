import { useEffect, useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// LOCAL
import styles from "./forgot-password.module.css";
import { fetchForgotPasswort } from "../../services/actions/forgotPassword";
// ---------- TYPES ----------
import { RootState } from "../../services/reducers/index";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { forgotPasswordStatus } = useSelector(
    (store: RootState) => store.forgotPassword
  );
  const [email, setEmail] = useState("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchForgotPasswort(email));
  };

  useEffect(() => {
    if (forgotPasswordStatus) {
      history.replace({ pathname: "/reset-password" });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordStatus]);

  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    user && history.replace({ pathname: "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={styles.login_container}>
      <p className="text text_type_main-default">Восстановление пароля</p>

      <form
        onSubmit={handleClick}
        className={`${styles.form_block} mt-6 mb-20`}
      >
        <div className="mb-6">
          <EmailInput onChange={onEmailChange} value={email} name={"email"} />
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>

      <div className={styles.bottom_info}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link
          to={{ pathname: "/login" }}
          className={`text text_type_main-default ml-4 ${styles.link}`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
