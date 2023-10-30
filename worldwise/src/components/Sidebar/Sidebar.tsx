import { Outlet } from "react-router-dom";
import { AppNav, Footer, Logo } from "@/components";
import styles from "@/components/Sidebar/Sidebar.module.css";

export const Sidebar = () => (
  <div className={styles.sidebar}>
    <Logo />
    <AppNav />
    <Outlet />
    <Footer />
  </div>
);
