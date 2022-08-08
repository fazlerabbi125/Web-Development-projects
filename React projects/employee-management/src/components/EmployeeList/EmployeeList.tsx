import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState,useEffect} from "react";
import styles from "./EmployeeList.module.css"
import profileImg from '../../assets/images/profile.jpg';
import SearchForm from "../SearchForm/SearchForm"
import useDebounce from '../../hooks/useDebounce'

interface ELProps{
  employeeList: any[],
}

const EmployeeList: React.FC<ELProps> = ({employeeList}) => {
  const [query, setQuery] = useState<string>('');

  const debouncedQuery= useDebounce(query);
//   let filteredList=data.filter(employee=>{
//     if (query.filter==='year' && query.search) return employee['year']===Number(query.search);        
//     else if (query.filter==='title' && query.search) return employee['title'].toLowerCase().includes(query.search.toLowerCase());
//     else if (query.filter==='genre' && query.search) return employee['genre'].toLowerCase().includes(query.search.toLowerCase());
//     return true;
// });
  let filteredList=employeeList.filter((employee:any)=>{
    if (debouncedQuery){
      return employee.name.toLowerCase().includes(query.toLowerCase())||employee.dept.toLowerCase().includes(query.toLowerCase())||
      employee.role.toLowerCase().includes(query.toLowerCase())|| `${employee.id}`.startsWith(query);
    }
    return true;
  });

  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemsPerPage:number = 10;
  const pageCount:number = Math.ceil(filteredList.length / itemsPerPage);

  useEffect(() => {setPageNumber(0)},[query])

  const firstIndex = pageNumber * itemsPerPage;
  const lastIndex = pageNumber * itemsPerPage + itemsPerPage;
  const displayItems = filteredList.slice(firstIndex, lastIndex );

  type selectedPage= {
    selected:number
  };

  const handlePageClick = ({ selected }:selectedPage) => {
    setPageNumber(selected);
  };

    return ( 
    <>
      <SearchForm setQuery={setQuery}/>
      <h2 style={{display: filteredList.length===0? "block": "none",color:"white",textAlign:"center" }}> No employees found</h2>
      {filteredList && (<div className={styles['emp-list']}>
      {displayItems.map(employee => (
            <Link to={`/employee/${employee.id}/details`} className={styles['emp-list__item']} key={employee.id} >
              <img src={profileImg} alt="profile"className={styles['emp-list__item__photo']}/>
                <h2 className={styles['emp-list__item__heading']}>{employee.name} - {employee.id}</h2>
                <p><span className={styles['emp-list__item__property']}>Department:</span> {employee.dept}</p>
                <p><span className={styles['emp-list__item__property']}>Designation:</span> {employee.role}</p>
            </Link>
        ))} 
      </div>)}     
      <ReactPaginate
        containerClassName={"pagination"}
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageLinkClassName="pagination__page"
        previousLinkClassName={"pagination__page"}
        nextLinkClassName={"pagination__page"}
        disabledClassName="pagination__page--disabled"
        activeLinkClassName={"pagination__page--active"}
        breakLabel="..."
        breakLinkClassName="pagination__page"
        renderOnZeroPageCount={() => null}
        marginPagesDisplayed={1}
      />
    
    </> );
}

export default EmployeeList;
