import EmployeeForm from '../components/EmployeeForm';
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";
import { MessageContext, MessageType} from "../contexts/MessageContext";
import {useContext} from "react";

const CreateEmployee = () => {
  const navigate = useNavigate(); //hook for re-direct
  const {setMessage}=useContext(MessageContext) as MessageType ;
  function handleAdd(inputs:any){
    axInstance.post('', inputs)
        .then(function () {
          setMessage('Employee has been added successfully');
          navigate('/');
        })
        .catch(function (error) {
          console.log(error.message);
      });
  }
  return (
    <section>
    <EmployeeForm employee={{}} handleSubmit={handleAdd} mode={'create'}/>
    </section>
  );
}

export default CreateEmployee;