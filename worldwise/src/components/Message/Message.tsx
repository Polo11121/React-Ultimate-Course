import styles from "@/components/Message/Message.module.css";

type MessageProps = {
  message: string;
};

export const Message = ({ message }: MessageProps) => (
  <p className={styles.message}>
    <span role="img">👋</span> {message}
  </p>
);
