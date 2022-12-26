import { useContext } from "react";
import { MessageType, MessageContext } from "../../contexts/MessageContext";
import styles from "./Toast.module.scss";

const Toast = () => {
  const { message, setMessage } = useContext(MessageContext) as MessageType;
  const closeAlert = () => setMessage("");
  setTimeout(() => setMessage(""), 5000);
  return (
    <>
      {message && (
        <div className={styles["custom-toast"]} role="alert">
          <div className={styles["custom-toast__header"]}>
            <strong>Message</strong>
            <button
              type="button"
              className="btn--close"
              onClick={closeAlert}
            ></button>
          </div>
          <div className={styles["custom-toast__content"]}>{message}</div>
        </div>
      )}
    </>
  );
};

export default Toast;
