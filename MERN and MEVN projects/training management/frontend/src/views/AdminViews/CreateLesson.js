import React from 'react'
import Layout from '../../components/Layout';
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useLocation } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import LessonForm from '../../components/LessonForm';

function CreateLesson() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const {state:{course}}=useLocation();
    function handleAdd(inputs){
        axInstance.post(`/${course.slug}/add-lesson`, inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your lesson has been added");
                navigate(-1);
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <Layout header='Create Course Lesson'>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <LessonForm lesson={{}} course={course._id} submitForm={handleAdd} />
    </Layout> 
    );
}

export default CreateLesson