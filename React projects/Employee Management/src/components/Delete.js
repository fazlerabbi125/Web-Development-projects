import { useNavigate } from "react-router-dom";
import {axInstance} from '../hooks/useAxios';

const Delete = (props) => {
    const navigate = useNavigate();

    function handleDelete(event){
        event.preventDefault();
        axInstance.delete(`${props.id}`)
        .then(() => {
              navigate("/"); //for re-direct
        });
    }
    function modalSelf(e){
        if(e.target===document.getElementsByClassName("modal-backdrop")[0]){
            props.toggleModal();
        }
    }
    
    return (
    <div className="modal-backdrop" onClick={modalSelf}>
      <div className="modal-content">
          <form onSubmit={handleDelete} >
              <p>Are you sure you want to this profile?</p>
              <button className="btn btn-dark" onClick={props.toggleModal}>Close</button>
              <button type="submit" className="btn btn-danger">Delete</button>
          </form>
      </div>
  </div>
      );
}
 
export default Delete;