import { Link } from 'react-router-dom';

function Header(props) {
  // Путь текущего местоположения
  const currentPath = document.location.pathname

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <p className="header__user">{currentPath ==='/' ? props.email : ''}</p>
        <Link to={(currentPath ==='/sign-in') ? "/sign-up" : "/sign-in"}  onClick={props.signOut} className="header__link">{ (currentPath === '/') ? "Выйти" : (currentPath === '/sign-in' ? "Регистрация" : "Войти")} </Link>
      </div>
    </header>
  );
}

export default Header;