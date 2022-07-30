import { useContext } from "react";
import MessageContext from "../../contexts/MessageContext";
import "./Toast.css"

const Toast = () => {
    const {message, setMessage}=useContext(MessageContext);
    const closeAlert=()=>setMessage(''); 
    setTimeout(() =>setMessage(''),5000);
    return ( 
        <>
        {message && (
        <div className="custom-toast" role="alert">
          <div className="custom-toast__header">
            <strong className="me-auto">Message</strong>
            <button type="button" className="btn-close" onClick={closeAlert}></button>
          </div>
          <div className="custom-toast__content">
            {message}
          </div>
        </div>
      )}
      </>
    );
}

export default Toast;