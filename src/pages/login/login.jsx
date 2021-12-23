import { useEffect, useState } from 'react';
import { EmailInput, PasswordInput , Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// LOCAL
import styles from './login.module.css';
import { fetchAuthorization } from '../../services/actions/auth';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onPasswordChange = (e) => setPassword(e.target.value)
  const onEmailChange = (e) => setEmail(e.target.value)

  const handleClick = () => {
    dispatch(fetchAuthorization(email, password))
  }

  const { user } = useSelector(store => store.auth)
  const { state } = useLocation();

  useEffect(() => {
    if (user && state?.from) {
      history.replace({ pathname: state.from.pathname })
    } else {
      user && history.replace({ pathname: "/" })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  return (
    <>
      <div className={styles.login_container}>
        <p className="text text_type_main-default">Вход</p>

        <div className={`${styles.form_block} mt-6 mb-20`}>
          <div className="mb-6">
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
          </div>
          <div className="mb-6">
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
          </div>
          <Button onClick={handleClick} type="primary" size="medium">Войти</Button>
        </div>
        
        <div className={styles.bottom_info}>
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
          <Link to={{ pathname: '/register' }} className={`text text_type_main-default ml-4 ${styles.link}`}>Зарегистрироваться</Link>
        </div>
        <div className={`${styles.bottom_info} mt-4`}>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
          <Link to={{ pathname: '/forgot-password' }} className={`text text_type_main-default ml-4 ${styles.link}`}>Восстановить пароль</Link>
        </div>
      </div>
    </>
  )
}

export default LoginPage;