import styles from "./styles.module.scss";

const NavbarDefault = ({ links = [], logo }) => {
  return (
    <nav className={styles.navbar}>
      <a className={styles.navbar_home} href="/" aria-label="Lien accueil">
        {logo?.src ? <img src={logo.src} alt={logo?.alt ?? "Logo"} /> : null}
      </a>
      <div className={styles.links}>
        {links.map((link) => (
          <a key={link.href} className={styles.navbar_link} href={link.href}>
            {link.title}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavbarDefault;
