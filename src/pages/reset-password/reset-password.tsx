import { useState, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/hooks";
import { useHistory } from "react-router-dom";
// LOCAL
import styles from "./reset-password.module.css";
import { fetchResetPassword } from "../../redux/actions/forgotPassword";
// ---------- TYPES ----------
import { RootState } from "../../redux/types/index";

const ResetPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordStatus, recoveryStage } = useSelector(
    (store) => store.forgotPassword
  );

  const [newPassword, setNewPassword] = useState("");
  const [mailCode, setMailCode] = useState("");

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchResetPassword(newPassword, mailCode));
  };

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    user && history.replace({ pathname: "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    recoveryStage !== 1 && history.replace({ pathname: "/forgot-password" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recoveryStage]);

  return (
    <div className={styles.login_container}>
      {resetPasswordStatus ? (
        <p className="text text_type_main-large">Пароль успешно изменен.</p>
      ) : (
        <>
          <p className="text text_type_main-default">Восстановление пароля</p>
          <form
            onSubmit={handleClick}
            className={`${styles.form_block} mt-6 mb-20`}
          >
            <div className="mb-6">
              <Input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                name={"new-password"}
                placeholder="Введите новый пароль"
              />
            </div>
            <div className="mb-6">
              <Input
                onChange={(e) => setMailCode(e.target.value)}
                value={mailCode}
                name={"mail-code"}
                placeholder="Введите код из письма"
              />
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
        </>
      )}
    </div>
  );
};

export default ResetPasswordPage;
