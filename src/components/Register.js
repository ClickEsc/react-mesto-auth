import React from 'react';

import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm isOpen={props.isOpen} onSubmit="" onClose={props.onClose} name="login" title="Регистрация" buttonTitle="Зарегистрироваться" children={
      <>
        <p className="auth__hint">Уже зарегистрированы? Войти</p>
      </>
    }/>
  );
}
  
export default Register;