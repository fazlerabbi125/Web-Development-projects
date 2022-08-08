import React from 'react'
import Layout from '../../components/Layout';
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import CourseForm from '../../components/CourseForm';

function CreateCourse() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);

    function handleAdd(inputs){
        axInstance.post('/create-course', inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your course has been added");
                navigate('/admin/courselist');
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <Layout header={'Create Training Course'}>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <CourseForm course={{}} submitForm={handleAdd} mode="create"/>
    </Layout> 
    );
}

export default CreateCourse