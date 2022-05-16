import logo from '../profile.jpg';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState} from "react";

const EmployeeList = ({employees}) => {
    const navigate = useNavigate();

    function handleClick(id){
        navigate('employee/'+id,{
            state:{
                id
            }
        });
    }
    
    const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 10;
  const firstIndex = pageNumber * itemsPerPage;
  const lastIndex = pageNumber * itemsPerPage + itemsPerPage;

  const displayItems = employees.slice(firstIndex, lastIndex );

  const pageCount = Math.ceil(employees.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

    return ( 
    <>
      <div className="flex-container">
         {employees && displayItems.map(employee => (
             <div className="flex-item"  onClick={()=>handleClick(employee.id)} key={employee.id} >
                <img src={logo} alt="Logo" className="profile"/>
                <h3>{employee.name} - {employee.id}</h3>
                <p>Department: {employee.dept}</p>
                <p>Designation: {employee.role}</p>
            </div>
         ))}
      </div>      
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"paginationBttns"}
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
