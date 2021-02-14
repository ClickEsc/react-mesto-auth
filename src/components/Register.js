import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';
import AuthForm from "./AuthForm";

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    auth.register(email, password)
      .then((res) => {
        if (res) {
          props.history.push('/sign-in');
        }
        setEmail(res.email);
        setPassword(res.password);
    })
    .catch(err => console.log(`Ошибка при попытке регистрации пользователя: ${err.message}`))
}

  return (
    <AuthForm onSubmit={handleSubmit} email={email || ''} handleEmailChange={handleEmailChange} password={password || ''} handlePasswordChange={handlePasswordChange} name="signup" title="Регистрация" buttonTitle="Зарегистрироваться" children={
      <>
        <p className="auth__hint">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
      </>
    }/>
  );
}
  
export default Register;