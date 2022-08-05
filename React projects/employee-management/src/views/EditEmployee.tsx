import EmployeeForm from "../components/EmployeeForm";
import {useLocation} from 'react-router-dom';
import {axInstance} from '../hooks/useAxios';
import { useNavigate,useParams } from "react-router-dom";
import { MessageContext, MessageType} from "../contexts/MessageContext";
import {useContext} from "react";

const EditEmployee = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const {state:{employee}}:any = useLocation();
  const {setMessage}=useContext(MessageContext) as MessageType ;

  const handleEdit= async (inputs:any)=>{
    try {
      await axInstance.put(`${employee.id}`, inputs)
      setMessage('Employee details have been updated');
      navigate(`/employee/${id}/details`);
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <section>
        {/* <h1 className="banner">Edit Employee</h1> */}
        <EmployeeForm employee={employee} handleSubmit={handleEdit} mode={'edit'}/>
        </section>
      );
}

export default EditEmployee;
