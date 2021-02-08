import React from 'react';

import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm isOpen={props.isOpen} onSubmit="" onClose={props.onClose} name="login" title="Войти" buttonTitle="Войти"/>
  );
}
  
export default Login;