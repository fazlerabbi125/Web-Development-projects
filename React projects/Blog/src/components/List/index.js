import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState,useEffect} from "react";
import {status} from "../../utils/constants"
import styles from "./List.module.css"
import poster from "../../assets/poster-not-available.jpg"

const List = ({data,query}) => {
    const navigate = useNavigate();

    function handleClick(id){
        navigate('movie-series/'+id);
    }
    
  let filteredList=data.filter(employee=>{
      if (query.filter==='year' && query.search) return employee['year']===Number(query.search);
      else if(status.map(i=>i.val).includes(query.filter)){
          return employee['status']===query.filter;
      }
      else if (query.filter==='title' && query.search) return employee['title'].toLowerCase().includes(query.search.toLowerCase());
      else if (query.filter==='genre' && query.search) return employee['genre'].toLowerCase().includes(query.search.toLowerCase());
      return true;
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
    <h2 style={{display: filteredList.length===0? "block": "none"}} className="text-center mt-4"> No match found</h2>
    {filteredList && (<div className="card mx-auto w-75 my-5 data">
        <ul className="list-group list-group-flush">
        {displayItems.map(item => (
            <li className="list-group-item" key={item.id} onClick={()=>handleClick(item.id)}>
              <div className="row">
              <img src={poster} alt="Poster" className="d-block mb-2 col-sm-auto col-8 img-fluid"/>
              <div className="col-sm-auto col-8">
                <h3>{item.title} </h3>
                <div><span className="item-property">Genre:</span> {item.genre}</div>
                <div><span className="item-property">Release year:</span> {item.year}</div>
                <div><span className="item-property">Status:</span> <span 
                style={{color:(status.filter(i=>i.val===item.status))[0].color}}>{item.status}</span></div>
              </div>
              </div>
            </li>
         ))} 
        </ul>
    </div>)}
    <div className="mb-5">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={styles.paginationBttns}
        pageLinkClassName={styles.paginationBttns__link}
        disabledClassName={styles.paginationBttns__disabled}
        activeClassName={styles.paginationBttns__active}
        breakLabel="..."
        breakClassName={styles.paginationBttns__breakLabel}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
      />
    </div>

    </> 
    
        );
}

/* <div onClick={()=>handleClick(item.id)}>
                <h3>{item.title} </h3>
                <div><span className="item-property">Genre:</span> {item.genre}</div>
                <div><span className="item-property">Release year:</span> {item.year}</div>
                <div><span className="item-property">Status:</span> <span 
                style={{color:(status.filter(i=>i.val===item.status))[0].color}}>{item.status}</span></div>
                </div>
                </li> */
export default List;