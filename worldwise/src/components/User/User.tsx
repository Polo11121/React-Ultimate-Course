import styles from "@/components/User/User.module.css";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export const User = () => {
  const user = FAKE_USER;

  const clickHandler = () => {};

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={clickHandler}>Logout</button>
    </div>
  );
};
