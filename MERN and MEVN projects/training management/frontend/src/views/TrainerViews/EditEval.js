import React from 'react'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useLocation } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import EvalForm from '../../components/EvalForm';
import Layout from '../../components/Layout';

function EditEval() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const {state:{assessment}}=useLocation();
    function handleEdit(inputs){
        axInstance.patch(`/trainer/${assessment._id}/edit-assessment`, inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your assessment has been edited");
                navigate(-1);
            })
            .catch(function (error) {
            setError(error.message);
        });
    }
    return ( 
    <Layout header='Edit Assessment'>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <EvalForm assessment={assessment} submitForm={handleEdit} />
    </Layout> 
    );
}

export default EditEval


