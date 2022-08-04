import { useNavigate } from "react-router-dom";
import {axInstance} from '../hooks/useAxios';
import {useRef,useContext} from 'react'
import { MessageContext,MessageInterface } from "../contexts/MessageContext";

const DeleteModal = (props:any) => {
    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext) as MessageInterface;
    const selectedModal = useRef<HTMLDivElement|null>(null);
    function handleDelete(event:React.FormEvent){
        event.preventDefault();
        axInstance.delete(`${props.id}`)
        .then(():void => {
            setMessage('Employee has been deleted successfully');
            navigate("/"); //for re-direct
        })
        .catch(err=>{
            console.log(err.message);
        })
        ;
    }
    function modalSelf(e:React.MouseEvent){
        if(e.target===selectedModal.current){
            props.toggleModal();
        }
    }
    
    return (
    <div className="modal" ref={selectedModal} onClick={modalSelf}>
        <div className="modal__content">
            <form onSubmit={handleDelete} >
                <p>Are you sure you want to this profile?</p>
                <button className="btn btn--dark" onClick={props.toggleModal}>Close</button>
                <button type="submit" className="btn btn--danger">Delete</button>
            </form>
        </div>
    </div>
    );
}
export default DeleteModal;