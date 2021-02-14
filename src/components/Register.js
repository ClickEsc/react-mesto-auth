import React from 'react';
import { Link } from 'react-router-dom';
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

  function resetForm() {
    setEmail('');
    setPassword('')
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
    resetForm();
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