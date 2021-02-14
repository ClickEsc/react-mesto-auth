function AuthForm(props) {
  return (
    <div className="auth">
      <form noValidate onSubmit={props.onSubmit} className={`auth__form auth__form_${props.name}`} name={`${props.name}-form`}>
        <h2 className="auth__title">{`${props.title}`}</h2>
        <input required value={props.email} onChange={props.handleEmailChange} id="auth-email-input" type="email" className="auth__input auth__input_email" placeholder="Email"></input>
        <input required value={props.password} onChange={props.handlePasswordChange} id="auth-password-input" type="password" className="auth__input auth__input_password" placeholder="Пароль"></input>
        <button className="auth__save" type="submit" aria-label="Сохранить изменения">{`${props.buttonTitle}`}</button>
        {props.children}
      </form>
    </div>
  );
}

export default AuthForm;