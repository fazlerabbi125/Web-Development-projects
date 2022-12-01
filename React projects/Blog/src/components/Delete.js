import { useNavigate } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { useContext } from "react";
import { API_route_prefix } from "../hooks/useFetch";

const Delete = (props) => {
    const navigate = useNavigate();
    const { setMessage } = useContext(MessageContext);

    function handleDelete(event) {
        event.preventDefault();
        fetch(API_route_prefix + props.url, {
            method: "DELETE",
        }).then(() => {
            setMessage("Your item has been deleted");
            navigate("/");
        });
    }

    function modalSelf(e) {
        if (e.target === document.getElementsByClassName("modal-backdrop")[0]) {
            props.toggleModal();
        }
    }

    return (
        <div className="modal-backdrop" onClick={modalSelf}>
            <div className="modal-dialog text-center text-dark">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title">Confirm Deletion </h5>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this item?
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={props.toggleModal}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-red"
                            onClick={handleDelete}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delete;
