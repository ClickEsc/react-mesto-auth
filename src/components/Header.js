import { Link } from 'react-router-dom';

function Header(props) {
  // Путь текущего местоположения
  const currentPath = document.location.pathname

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <p className="header__user">{props.email}</p>
        <Link to={currentPath.search('/sign-in') ? "/sign-up" : "/sign-in"} className="header__link">{ currentPath.search('/') ? props.button : (currentPath.search('/sign-in') ? "Регистрация" : "Войти")}</Link>
      </div>
    </header>
  );
}

export default Header;