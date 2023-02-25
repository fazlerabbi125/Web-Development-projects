import React from 'react'
import Layout from '../../components/common/Layout'
import { axInstance } from '../../hooks/useAxios';
import { getTokens } from "../../utils/handleStorage";
import { useNavigate, useLocation } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import CourseForm from '../../components/forms/CourseForm';

function EditCourse() {
  const navigate = useNavigate(); //hook for re-direct
  const { state: { course } } = useLocation();
  const { setMessage } = React.useContext(MessageContext);
  const [error, setError] = React.useState(null);

  async function handleEdit(inputs) {
    try {
      const res = await axInstance.patch(`/${course.slug}/edit-course`, inputs, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${getTokens().accessToken}`
        }
      })
      if (!res.data || !res.data.success) {
        console.log(res.response.data.errors);
        throw new Error(res.response.data.message);
      }
      setMessage("Your course has been edited");
      navigate('/admin/courselist');
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <Layout>
      {error && <h2 className="text-center text-danger">{error}</h2>}
      <CourseForm course={course} submitForm={handleEdit} mode="edit" />
    </Layout>
  );
}

export default EditCourse