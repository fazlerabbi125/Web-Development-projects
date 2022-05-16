import { useState, useEffect } from "react";
import EmployeeList from "../components/EmployeeList";
import SearchForm from "../components/SearchForm";
import {Link} from 'react-router-dom';
import axInstance from '../useAxios';
// import useFetch from "../useFetch";

const Home = () => {
    const [query, setQuery] = useState('');
    const [employees,setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() =>{
        axInstance.get('')
        .then(function (response) {
            setEmployees(response.data);
            setIsLoading(false);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setEmployees([]);
            setIsLoading(false);
        });
        },1000)
        
      }, []);
      let filteredList=employees.filter(employee=>{
        return employee.name.toLowerCase().includes(query.toLowerCase())||employee.dept.toLowerCase().includes(query.toLowerCase())||
        employee.role.toLowerCase().includes(query.toLowerCase())|| `${employee.id}`.startsWith(query);
        });
      
    return ( 
        <>
        <h1 className="banner">Employee List</h1>
        <h2 style={{textAlign:"center"}}>
            <Link to="employee/create" className="toCreate">
             Create Employee
            </Link>
        </h2>
        <SearchForm setQuery={setQuery} />
        {isLoading && <h2 style={{color:"white",textAlign:"center" }}>Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 style={{color:"red",textAlign:"center" }}>{error}</h2>}
        <EmployeeList employees={filteredList} error={error} isLoading={isLoading}/>
        {!isLoading && !error &&
        <h2 style={{display: filteredList.length===0? "block": "none",color:"white",textAlign:"center" }}> No employees found</h2>
        }       
        
        </>
     );
}
 
export default Home;