import React from 'react'
import Layout from '../../components/Layout'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useLocation,useParams } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import UserManagementForm from '../../components/UserManagementForm';

const EditTrainingUser = () => {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    let {state} = useLocation();
    const { eID } = useParams();
    function handleEdit(inputs){
        axInstance.patch(`/admin/${eID}/edit-employee`, inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`
            }
        })
            .then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your user has been edited");
                navigate('/admin/userlist');
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <Layout header='Edit Employee Profile'>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <UserManagementForm user={state.user} submitForm={handleEdit} mode="edit"/>
    </Layout> 
    );
}

export default EditTrainingUser;