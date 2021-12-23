import { useEffect, useState } from 'react';
import { EmailInput, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// LOCAL
import styles from './forgot-password.module.css';
import { fetchForgotPasswort } from '../../services/actions/forgotPassword';

const ForgotPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { forgotPasswordStatus } = useSelector(store => store.forgotPassword)
  const [email, setEmail] = useState('');

  const onEmailChange = (e) => setEmail(e.target.value)

  const handleClick = () => {
    dispatch(fetchForgotPasswort(email))
  }

  useEffect(() => {
    if (forgotPasswordStatus) history.replace({ pathname: "/reset-password"})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordStatus])

  const { user } = useSelector(store => store.auth)

  useEffect(() => {
    user && history.replace({ pathname: "/" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])



  return (
    <>
        <div className={styles.login_container}>
          <p className="text text_type_main-default">Восстановление пароля</p>

          <div className={`${styles.form_block} mt-6 mb-20`}>
            <div className="mb-6">
              <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            </div>
            <Button onClick={handleClick} type="primary" size="medium" c>Восстановить</Button>
          </div>
          
          <div className={styles.bottom_info}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={{ pathname: '/login' }} className={`text text_type_main-default ml-4 ${styles.link}`}>Войти</Link>
          </div>
        </div>
    </>
  )
}

export default ForgotPasswordPage;