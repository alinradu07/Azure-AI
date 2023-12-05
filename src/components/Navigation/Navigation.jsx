import styles from "./Navigation.module.css";
import viteLogo from "/vite.svg";
import { useRef } from "react";
import { useState } from "react";
export default function Navigation() {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const menuRef = useRef();
  function handleRef() {
    if (burgerClicked) {
      menuRef.current.classList.add(styles["mobile-menu-hide"]);
      menuRef.current.classList.remove(styles["mobile-menu"]);
      setBurgerClicked((prevState) => !prevState);
    }
    if (!burgerClicked) {
      menuRef.current.classList.remove(styles["mobile-menu-hide"]);
      menuRef.current.classList.add(styles["mobile-menu"]);
      setBurgerClicked((prevState) => !prevState);
    }
  }
  return (
    <nav>
      <div className={styles.navigation}>
        <div className={`${styles["our-website"]}`}>
          <img src={viteLogo} className={`${styles.logo}`} alt="it-test logo" />
          <p>Banking Logo</p>
        </div>
        <div className={`${styles["menu-items"]}`}>
          <li>Contact</li>
          <li>Login</li>
          <li>Support</li>
        </div>
        <div className={styles["burger-menu"]} onClick={handleRef}>
          <div className={styles["burger-line"]}></div>
          <div className={styles["burger-line"]}></div>
          <div className={styles["burger-line"]}></div>
        </div>
      </div>
      <div ref={menuRef} className={styles["mobile-menu-hide"]}>
        <li>Contact</li>
        <li>Login</li>
        <li>Support</li>
      </div>
    </nav>
  );
}
