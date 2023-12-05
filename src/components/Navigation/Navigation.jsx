import styles from "./Navigation.module.css";
import itLogo from "/favicon.ico";
import { useRef } from "react";
export default function Navigation() {
  const menuRef = useRef();
  function handleRef() {
    menuRef.current.classList.toggle(styles["mobile-menu"]);
  }
  return (
    <nav>
      <div className={styles.navigation}>
        <div className={`${styles["our-website"]}`}>
          <img src={itLogo} className={`${styles.logo}`} alt="it-test logo" />
          <p>IT-TEST</p>
        </div>
        <div ref={menuRef} className={`${styles["menu-items"]}`}>
          <li>Home</li>
          <li>About</li>
          <li>Email</li>
        </div>
        <div className={styles["burger-menu"]} onClick={handleRef}>
          <div className={styles["burger-line"]}></div>
          <div className={styles["burger-line"]}></div>
          <div className={styles["burger-line"]}></div>
        </div>
      </div>
    </nav>
  );
}
