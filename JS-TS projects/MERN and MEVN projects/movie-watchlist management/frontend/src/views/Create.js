import MovieForm from "../components/MovieForm";
import withHOC from "../components/withHoc";
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { useContext,useState } from "react";
import {getTokens} from "../utils/handleStorage";


const Create = () => {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=useContext(MessageContext);
    const [error, setError] = useState(null);

    function handleAdd(inputs){
        axInstance.post('/movie-series/create', inputs,{
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${getTokens().accessToken}`
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
        <MovieForm item={{}} submitForm={handleAdd}/>
    </> 
    );
}

export default withHOC("Add a movie/series to watchlist",Create);