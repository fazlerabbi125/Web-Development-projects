import { useNavigate,Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState,useEffect,useContext} from "react";
import styles from "./List.module.css"
import poster from "../../assets/poster-not-available.jpg"
import {axInstance}  from "../../hooks/useAxios"
import { useSelector, useDispatch } from 'react-redux'
import {fetchList} from '../../store/features/watchlistSlice'
import MessageContext from "../../contexts/MessageContext";
import {getTokens} from "../../utils/handleStorage";

const List = ({data,query}) => {
    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext);
    const auth= useSelector((state) => state.authUser.userData);

    const dispatch = useDispatch();
    const {data:watchlist} = useSelector((state) => state.userWatchlist)

    useEffect(() => {
      if (auth)dispatch(fetchList());
    },[auth])
    
  let filteredList=data.filter(employee=>{
      if (query.filter==='year' && query.search) return employee['year']===Number(query.search);
      // else if(status.map(i=>i.val).includes(query.filter)){
      //     return employee['status']===query.filter;
      // }
      // <div><span className="item-property">Status:</span> <span 
      //           style={{color:(status.filter(i=>i.val===item.status))[0].color}}>{item.status}</span></div>
              
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

  const handleList = async function(id,isAdded){
    try {
      if (isAdded){
        await axInstance.delete(`/delete-from-list/${id}`,{
          headers: {
            'Authorization': `Bearer ${getTokens().accessToken}`
          }
        });
        setMessage("Item has been removed from your watchlist");
      }
      else{
        await axInstance.post('/add-to-list',{id},{
          headers: {
            'Authorization': `Bearer ${getTokens().accessToken}`
          }
        });
        setMessage("Item has been added to your watchlist");
      }
      navigate('/watchlist');
    } catch (error) {
      console.error(error.message);
    }
  }
    return ( 
    <>
    <h2 style={{display: filteredList.length===0? "block": "none"}} className="text-center mt-4"> No match found</h2>
    {filteredList && filteredList.length>0 && (<div className="card mx-auto w-75 my-5 data">
        <ul className="list-group list-group-flush">
        {displayItems.map(item => (
            <li className="list-group-item" key={item._id} >
              <div className="row">
                <img src={item.imgUrl||poster} alt="Poster" className="data__img mb-2 img-fluid col-3"/>
                <div className="col-8">
                  <h3>{item.title} </h3>
                  <div><span className="data__property--muted">Genre:</span> {item.genre}</div>
                  <div><span className="data__property--muted">Release year:</span> {item.year}</div>
                  <div className="my-1"><Link to={`/movie-series/${item._id}`} className="btn btn-dark">View Details</Link></div>
                  {auth && (<div>
                    {watchlist.find((elem)=>elem.movie._id===item._id)?(
                        <button className="btn btn-warning" onClick={()=>handleList(item._id,true)}>Remove from WatchList
                        </button>):<button className="btn btn-success" onClick={()=>handleList(item._id,false)}>
                          Add to WatchList</button>
                      }      
                    </div> )}
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