import logo from '../assets/images/profile.jpg';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState,useEffect} from "react";

const EmployeeList = ({employees,query}) => {
    const navigate = useNavigate();

    function handleClick(id){
        navigate('employee/'+id);
    }

  let filteredList=employees.filter(employee=>{
      return employee.name.toLowerCase().includes(query.toLowerCase())||employee.dept.toLowerCase().includes(query.toLowerCase())||
      employee.role.toLowerCase().includes(query.toLowerCase())|| `${employee.id}`.startsWith(query);
  });

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredList.length / itemsPerPage);

  useEffect(() => {setPageNumber(0)},[query])

  const firstIndex = pageNumber * itemsPerPage;
  const lastIndex = pageNumber * itemsPerPage + itemsPerPage;
  const displayItems = filteredList.slice(firstIndex, lastIndex );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

    return ( 
    <>
      <h2 style={{display: filteredList.length===0? "block": "none",color:"white",textAlign:"center" }}> No employees found</h2>
      {filteredList && (<div className="flex-container">
      {displayItems.map(employee => (
             <div className="flex-item"  onClick={()=>handleClick(employee.id)} key={employee.id} >
                <img src={logo} alt="Logo" className="profile"/>
                <h3>{employee.name} - {employee.id}</h3>
                <p>Department: {employee.dept}</p>
                <p>Designation: {employee.role}</p>
            </div>
         ))} 
      </div>)}     
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        breakLabel="..."
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
      />
    
    </> );
}
 
export default EmployeeList;
