function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <p className="header__user">email@mail.com</p>
        <a className="header__link">Выйти</a>
      </div>
    </header>
  );
}

export default Header;