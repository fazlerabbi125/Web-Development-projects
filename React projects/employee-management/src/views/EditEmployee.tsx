import EmployeeForm from "../components/EmployeeForm";
import {useLocation} from 'react-router-dom';
import {axInstance} from '../hooks/useAxios';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
const EditEmployee = () => {
  const navigate = useNavigate();
  const {state:{employee}}:any = useLocation();

  const handleEdit= async (inputs:any)=>{
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
        <Layout>
        {/* <h1 className="banner">Edit Employee</h1> */}
        <EmployeeForm employee={employee} handleSubmit={handleEdit}/>
        </Layout>
      );
}

export default EditEmployee;
