import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// LOCAL
import styles from "./profile-user-block.module.css";
import { patchUser } from "../../services/actions/auth";
import { IS_DATA_USER_UPDATED } from "../../services/actions/auth";
// ---------- TYPES ----------
import { RootState } from "../../services/reducers/index";

const UserBlock = () => {
  const dispatch = useDispatch();
  const { user, isUserDataUpdated } = useSelector(
    (store: RootState): any => store.auth
  );

  const [userData, setUserData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
  });
  const [isBtnShown, setIsBtnShown] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setUserData({
      ...userData,
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onCancelClick = () => {
    setUserData({
      ...userData,
      name: user.name ?? "",
      email: user.email ?? "",
      password: "",
    });
  };

  const onSaveClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    userData.name && userData.email && userData.password
      ? dispatch(patchUser(userData))
      : setIsErrorShown(true);
  };

  useEffect(() => {
    isErrorShown && setTimeout(() => setIsErrorShown(false), 3000);
  }, [isErrorShown]);

  useEffect(() => {
    isUserDataUpdated &&
      setTimeout(() => dispatch({ type: IS_DATA_USER_UPDATED }), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserDataUpdated]);

  useEffect(() => {
    setIsBtnShown(
      userData.name !== user.name ||
        userData.email !== user.email ||
        userData.password
        ? true
        : false
    );
  }, [userData, user]);

  return (
    <form onSubmit={onSaveClick} className="mb-20`">
      <div className="mb-6">
        <Input
          onChange={(name) => handleChange(name)}
          name={"name"}
          value={userData.name}
          placeholder="Имя"
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={(name) => handleChange(name)}
          name={"email"}
          value={userData.email}
          placeholder="Логин"
        />
      </div>
      <div className="mb-6">
        <PasswordInput
          onChange={(name) => handleChange(name)}
          name={"password"}
          value={userData.password}
        />
      </div>
      {isErrorShown && (
        <p className={`text text_type_main-small ${styles.error_info}`}>
          Данные не заполнены
        </p>
      )}
      {isUserDataUpdated && (
        <p className={`text text_type_main-small ${styles.ok_message_info}`}>
          Данные успешно сохранены
        </p>
      )}
      {isBtnShown && (
        <div>
          <Button type="primary" size="small">
            Сохранить
          </Button>
          <Button onClick={onCancelClick} type="secondary" size="medium">
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};

export default UserBlock;
