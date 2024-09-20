import styles from "./Header.module.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  const clerk = useUser();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Gomoku
      </Link>
      <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
      <label className={styles.menuIcon} htmlFor="menu-btn">
        <span className={styles.navicon}></span>
      </label>
      <ul className={styles.menu}>
        <li
          className={styles.menuItem}
          style={{
            marginRight: "20px",
            zoom: clerk.isSignedIn ? "1.4" : "unset",
          }}
        >
          <SignedOut>
            <SignInButton>
              <button className={styles.button}>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
      </ul>
    </header>
  );
};
