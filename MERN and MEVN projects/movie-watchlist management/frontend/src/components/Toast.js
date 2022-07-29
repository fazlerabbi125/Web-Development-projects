//import FlashMessage from 'react-flash-message'
import { useContext } from "react";
import MessageContext from "../contexts/MessageContext";

const Toast = (props) => {
    const {message, setMessage}=useContext(MessageContext);
    const closeAlert=()=>setMessage(''); 
    setTimeout(() =>setMessage(''),5000);
    return ( 
        <>
        {message && (<div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: "11"}}>
        <div role="alert" >
          <div className="toast-header">
            <strong className="me-auto">Message</strong>
            <button type="button" className="btn-close" onClick={closeAlert}></button>
          </div>
          <div className="toast-content text-muted">
            {message}
          </div>
        </div>
      </div>)}
      </>
     );
}
 
export default Toast;