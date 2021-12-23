import { useState, useEffect } from 'react';
import { Input, EmailInput, PasswordInput , Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// LOCAL
import styles from './register.module.css';
import { fetchRegistration } from '../../services/actions/auth';

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onNameChange = (e) => setName(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onEmailChange = (e) => setEmail(e.target.value)
  
  const handleClick = () => {
    dispatch(fetchRegistration(email, password, name))
  }

  const { user } = useSelector(store => store.auth)

  useEffect(() => {
    user && history.replace({ pathname: "/" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <div className={styles.login_container}>
        <p className="text text_type_main-default">Регистрация</p>

        <div className={`${styles.form_block} mt-6 mb-20`}>
          <div className="mb-6">
            <Input onChange={onNameChange} value={name} name={'name'} placeholder="Имя" />
          </div>
          <div className="mb-6">
            <EmailInput onChange={onEmailChange} value={email} name={'email'} />
          </div>
          <div className="mb-6">
            <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
          </div>
          <Button onClick={handleClick} type="primary" size="medium">Зарегистрироваться</Button>
        </div>
        
        <div className={styles.bottom_info}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы</p>
          <Link to={{ pathname: '/login' }} className={`text text_type_main-default ml-4 ${styles.link}`}>Войти</Link>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;