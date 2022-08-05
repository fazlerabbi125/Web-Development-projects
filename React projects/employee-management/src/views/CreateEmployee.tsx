import EmployeeForm from '../components/EmployeeForm';
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate(); //hook for re-direct
  function handleAdd(inputs:any){
    axInstance.post('', inputs)
        .then(function () {
          navigate('/');
        })
        .catch(function (error) {
          console.log(error.message);
      });
  }
  return (
    <section>
          {/* <h1 className="banner">Add a New Employee</h1> */}

    <EmployeeForm employee={{}} handleSubmit={handleAdd} mode={'create'}/>
    </section>
  );
}

export default CreateEmployee;