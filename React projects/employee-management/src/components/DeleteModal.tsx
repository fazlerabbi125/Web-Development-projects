import { useNavigate } from "react-router-dom";
import {axInstance} from '../hooks/useAxios';
import {useRef,useContext} from 'react'
import { MessageContext,MessageType } from "../contexts/MessageContext";
import { DeleteModalInterface } from "../utils/interfaces";

const DeleteModal = (props:DeleteModalInterface) => {
    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext) as MessageType;
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
            <div className="modal__content__header">
            <span>Confirm Deletion</span>
            </div>
            <form onSubmit={handleDelete} >
                <div className="modal__content__body">
                    <p>Are you sure you want to this profile?</p>
                </div>
                <div className="modal__content__footer">
                    <button className="btn btn--dark" onClick={props.toggleModal}>Close</button>
                    <button type="submit" className="btn btn--danger">Confirm</button>
                </div>
            </form>
        </div>
    </div>
    );
}
export default DeleteModal;