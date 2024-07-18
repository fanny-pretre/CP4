import Logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-adresse">
          <p>140 avenue Victor Hugo</p>
          <p> 17000 La rochelle</p>
        </div>
        <div className="footer-design">
          <img src={Logo} alt="logo" />
        </div>
        <div className="footer-contact">
          <p>0606060606</p>
          <p>contact@leterrier.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Le Terrier. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
