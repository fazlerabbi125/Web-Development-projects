import React from 'react'
import Layout from '../../components/Layout'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate,useLocation,useParams } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import LessonForm from '../../components/LessonForm';

function EditLesson() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const {state:{courseID,lesson}}=useLocation();
    const {courseSlug,lessonID}= useParams();
    function handleEdit(inputs){
        axInstance.patch(`/${courseSlug}/${lessonID}/edit-lesson`, inputs,{
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
    <Layout header={'Edit Course Lesson'}>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <LessonForm lesson={lesson} course={courseID} submitForm={handleEdit} />
    </Layout> 
    );
}

export default EditLesson