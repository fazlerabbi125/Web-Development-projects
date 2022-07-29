import React from 'react'
import withHoc from '../../utils/withHoc'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useParams,useLocation } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import TaskForm from '../../components/TaskForm';

function EditTask() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const {evalID,taskID} = useParams();
    const {state:{task}}=useLocation();
    async function handleEdit(inputs){
        try {
            const response= await axInstance.patch(`/trainer/${taskID}/edit-task`, inputs,{
                headers: {
                    'Authorization': `Bearer ${getTokens().accessToken}`,
                }
            })
            if (!response.data || !response.data.success){
                console.log(response.response.data.errors);
                throw new Error(response.response.data.message);
            }
            setMessage("Your task has been edited");
            navigate(`/trainer/${evalID}/assessment-details`);
        } catch (error) {
            setError(error.message);
        }
    }
    return ( 
    <>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <TaskForm task={task} submitForm={handleEdit} />
    </> 
    );
}

export default withHoc('Edit Evaluation Task',EditTask)