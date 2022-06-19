import ItemForm from "../components/ItemForm";
import {useLocation,useNavigate} from 'react-router-dom';
import {axInstance} from '../hooks/useAxios';
import withHOC from "../components/withHoc";
import MessageContext from "../contexts/MessageContext";
import { useContext,useState } from "react";
import {getTokens} from "../utils/handleStorage";


const Edit = () => {
  const {setMessage}=useContext(MessageContext);
  const navigate = useNavigate();
  const {state:{data}} = useLocation();
  const [error, setError] = useState(null);

  const handleEdit= async (inputs)=>{
    try {
      await axInstance.put(`/movie-series/${data._id}/edit`, inputs,{
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${getTokens().accessToken}`
        }
      });
      setMessage("Your item has been edited");
      navigate(`/movie-series/${data._id}`);
    } catch (error) {
      setError(error.message);
    }
  }
  
    return (
        <>
          {error && <h2 className="text-center text-danger">{error}</h2>}
          <ItemForm item={data} submitForm={handleEdit}/>
        </>
      );
}

const EnhancedComponent=withHOC("Edit movie/series",Edit);

export default EnhancedComponent;
