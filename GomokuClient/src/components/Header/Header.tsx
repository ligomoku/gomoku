import styles from "./Header.module.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <header className={styles.header}>
    <a href="#" className={styles.logo}>
      Gomoku
    </a>
    <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
    <label className={styles.menuIcon} htmlFor="menu-btn">
      <span className={styles.navicon}></span>
    </label>
    <ul className={styles.menu}>
      <li className={styles.menuItem}>{children}</li>
      <li className={styles.menuItem}>
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
