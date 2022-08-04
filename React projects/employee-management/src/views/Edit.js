import EmployeeForm from "../components/EmployeeForm";
import {useLocation} from 'react-router-dom';
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const {state:{employee}} = useLocation();

  const handleEdit= async (inputs)=>{
    try {
      await axInstance.put(`${employee.id}`, inputs)
      navigate(`/employee/${employee.id}`,{
            state:{
                id:employee.id
            }
        });
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
        <>
        <h1 className="banner">Edit Employee</h1>
        <EmployeeForm employee={employee} handleSubmit={handleEdit}/>
        </>
      );
}
 
export default Edit;
