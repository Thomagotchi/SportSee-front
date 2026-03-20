import styles from "./styles.module.scss";

const AsideDefault = ({ links = [] }) => {
  return (
    <aside className={styles.aside} aria-label="Navigation latérale">
      <ul className={styles.list}>
        {links.map((link, idx) => (
          <li key={`${link.href}-${idx}`} className={styles.item}>
            <a
              className={styles.link}
              href={link.href}
              aria-label={link.icon?.alt || `Lien ${idx + 1}`}
            >
              {link.icon?.src ? (
                <img
                  className={styles.icon}
                  src={link.icon.src}
                  alt={link.icon?.alt ?? ""}
                />
              ) : null}
            </a>
          </li>
        ))}
      </ul>
      <span className={styles.copyright}>Copiryght, SportSee 2020</span>
    </aside>
  );
};

export default AsideDefault;
