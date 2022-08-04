import { useContext } from "react";
import {MessageInterface,MessageContext} from "../../contexts/MessageContext";
import styles from "./Toast.module.css"

const Toast = () => {
    const {message, setMessage}=useContext(MessageContext) as MessageInterface;
    const closeAlert=()=>setMessage(''); 
    setTimeout(() =>setMessage(''),5000);
    return ( 
        <>
        {message && (
        <div className={styles["custom-toast"]} role="alert">
          <div className={styles["custom-toast__header"]}>
            <strong>Message</strong>
            <button type="button" onClick={closeAlert}><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className={styles["custom-toast__content"]}>
            {message}
          </div>
        </div>
      )}
      </>
    );
}

export default Toast;