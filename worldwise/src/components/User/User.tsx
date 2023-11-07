import { useAuthContext } from "@/contexts";
import { useNavigate } from "react-router-dom";
import styles from "@/components/User/User.module.css";

export const User = () => {
  const { onLogout, user } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
