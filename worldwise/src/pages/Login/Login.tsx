import { useState, MouseEvent } from "react";
import { Button, PageNav } from "@/components";
import { useAuthContext } from "@/contexts";
import { useNavigate } from "react-router-dom";
import styles from "@/pages/Login/Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { onLogin } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onLogin(email, password);
    navigate("/app/cities");
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <Button onClick={loginHandler}>Login</Button>
        </div>
      </form>
    </main>
  );
};
