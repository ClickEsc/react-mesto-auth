import React from 'react';

import AuthForm from "./AuthForm";

function Login(props) {
  
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
    props.onLogin(email, password);
    resetForm();
  }

  return (
    <AuthForm onSubmit={handleSubmit} email={email || ''} handleEmailChange={handleEmailChange} password={password || ''} handlePasswordChange={handlePasswordChange} name="signin" title="Вход" buttonTitle="Войти"/>
  );
}
  
export default Login;