import styles from "../styles/Message.module.css";
function Message({ message }) {
  return (
    <div>
      <p>
        <span className={styles.message}>{message}</span>
      </p>
    </div>
  );
}

export default Message;
