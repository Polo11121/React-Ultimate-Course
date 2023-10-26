import { NavLink } from "react-router-dom";
import styles from "@/components/AppNav/AppNav.module.css";

export const AppNav = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <NavLink to="cities">Cities</NavLink>
      </li>
      <li>
        <NavLink to="countries">Countries</NavLink>
      </li>
    </ul>
  </nav>
);
