function Footer() {
  const today = new Date();
  const thisYear = today.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; { thisYear } Mesto Russia</p>
    </footer>
    );
  }
  
export default Footer;