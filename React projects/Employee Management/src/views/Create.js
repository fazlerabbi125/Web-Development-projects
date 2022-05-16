import EmployeeForm from '../components/EmployeeForm'
import axInstance from '../useAxios';
import { useNavigate } from "react-router-dom";


const Create = () => {
  const navigate = useNavigate(); //hook for re-direct
  function handleAdd(inputs){
    axInstance.post('', inputs)
        .then(function (response) {
          navigate('/');
        })
        .catch(function (error) {
          console.log(error);
      });
  }
  return (
    <>
    <h1 className="banner">Add a New Employee</h1>
    <EmployeeForm employee={{}} handleSubmit={handleAdd}/>
    </>
  );
}
 
export default Create;