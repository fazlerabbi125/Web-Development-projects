import { useNavigate } from "react-router-dom";
import { axInstance } from '../../../hooks/useAxios';
import MessageContext from "../../../contexts/MessageContext";
import { useContext, useRef } from "react";
import { getTokens } from "../../../utils/handleStorage";

const DeleteModal = (props) => {
    const navigate = useNavigate();

    const { setMessage } = useContext(MessageContext);
    const selectedModal = useRef();

    function handleDelete(event) {
        event.preventDefault();
        console.log(props.url);
        axInstance.delete(props.url, {
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`
            }
        })
            .then(() => {
                setMessage(`Your ${props.type || "item"} has been deleted`);
                navigate(props.redirect || 0);
            });
    }
    function modalSelf(e) {
        if (e.target === selectedModal.current) { //or document.getElementById(`${props.id}`)
            props.toggleModal(props.id);
        }
    }
    return (
        <div className="modal-backdrop" onClick={modalSelf} id={props.id}
            ref={selectedModal}
            aria-labelledby={props.id + "ModalLabel"} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title" id={props.id + "ModalLabel"}>Confirm Deletion</h5>
                    </div>
                    <form onSubmit={handleDelete}>
                        <div className="modal-body text-center">
                            Are you sure you want to delete this {props.type || "item"}?
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-dark" onClick={() => props.toggleModal(props.id)}>Close</button>
                            <button type="submit" className="btn btn-danger">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;