import { Map, Sidebar } from "@/components";
import styles from "@/pages/AppLayout/AppLayout.module.css";

export const AppLayout = () => (
  <div className={styles.app}>
    <Sidebar />
    <Map />
  </div>
);
