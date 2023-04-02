import styles from './styles/Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.navbar__logo}>LingoSnapz</a>
      <div className={styles.navbar__links}>
        <a href="/feed" className={styles.navbar__link}>Feed</a>
        <a className={styles.navbar__link}>Sign in</a>
        <a className={styles.navbar__link}>Get Started</a>
      </div>
    </nav>
  );
}

export default Navbar;
