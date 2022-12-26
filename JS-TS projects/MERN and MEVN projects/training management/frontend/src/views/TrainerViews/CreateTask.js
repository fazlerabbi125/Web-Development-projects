import React from 'react'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useParams } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import TaskForm from '../../components/TaskForm';
import Layout from '../../components/Layout';

function CreateTask() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const {evalID} = useParams();
    function handleAdd(inputs){
        axInstance.post(`/trainer/${evalID}/add-task`, inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your task has been added");
                navigate(`/trainer/${evalID}/assessment-details`);
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <Layout header='Create Evaluation Task'>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <TaskForm task={{}} submitForm={handleAdd} />
    </Layout> 
    );
}

export default CreateTask