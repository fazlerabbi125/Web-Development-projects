import ItemForm from "../components/ItemForm";
import withHOC from "../components/withHoc";
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { useContext,useState } from "react";


const Create = () => {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=useContext(MessageContext);
    const [error, setError] = useState(null);

    function handleAdd(inputs){
        axInstance.post('/movie-series/create', inputs,{
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(function (response) {
                if (!response.data.success) throw new Error(response.data.message);
                setMessage("Your item has been added");
                navigate('/');
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <ItemForm item={{}} submitForm={handleAdd}/>
    </> 
    );
}
const EnhancedComponent=withHOC("Add a movie/series to watchlist",Create);

export default EnhancedComponent;