import { useNavigate } from "react-router-dom";
import {axInstance} from '../hooks/useAxios';
import MessageContext from "../contexts/MessageContext";
import { useContext,useRef } from "react";
import {getTokens} from "../utils/handleStorage";

const DeleteModal = (props) => {
    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext);
    const selectedModal =useRef();

    function handleDelete(event){
        event.preventDefault();
        axInstance.delete(`/movie-series/${props.id}/delete`,{
            headers: {
            'Authorization': `Bearer ${getTokens().accessToken}`
            }
        })
        .then(() => {
            setMessage("Your item has been deleted");
            navigate("/");
        });
    }
    function modalSelf(e){
        if(e.target===selectedModal.current){
            props.toggleModal();
        }
    }
    
    return (
    <div className="modal-backdrop" ref={selectedModal} onClick={modalSelf}>
        <div className="modal-dialog text-center text-dark">
            <div className="modal-content">
            <div className="modal-header justify-content-center">
                <h5 className="modal-title">Confirm Deletion </h5>
            </div>
            <div className="modal-body">
                Are you sure you want to delete this item?
            </div>
            <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-dark" onClick={props.toggleModal}>Close</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm</button>
            </div>
            </div>
        </div>
    </div>
    );
}

export default DeleteModal;