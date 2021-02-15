import { Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <Route exact path="/">
          <p className="header__user">{props.email}</p>
          <Link to="/sign-in" onClick={props.signOut} className="header__link">Выйти</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;