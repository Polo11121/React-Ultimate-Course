import { NavLink } from "react-router-dom";
import { Logo } from "@/components";
import styles from "@/components/PageNav/PageNav.module.css";

export const PageNav = () => (
  <nav className={styles.nav}>
    <Logo />
    <ul>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/product">Product</NavLink>
      </li>
      <li>
        <NavLink to="/login" className={styles.ctaLink}>
          Login
        </NavLink>
      </li>
    </ul>
  </nav>
);
