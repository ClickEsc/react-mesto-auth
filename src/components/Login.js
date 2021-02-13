import React from 'react';

import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm onSubmit={props.onSubmit} name="login" title="Войти" buttonTitle="Войти"/>
  );
}
  
export default Login;