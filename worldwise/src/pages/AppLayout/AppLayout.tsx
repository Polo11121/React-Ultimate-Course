import { Map, Sidebar, User } from "@/components";
import { useAuthContext } from "@/contexts";
import { Navigate } from "react-router-dom";
import styles from "@/pages/AppLayout/AppLayout.module.css";

const AppLayout = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
