import withHOC from "../components/withHoc";
import { useNavigate,Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState,useEffect,useContext} from "react";
import poster from "../assets/poster-not-available.jpg"
import {axInstance} from "../hooks/useAxios"
import {status} from "../utils/constants"
import { useSelector, useDispatch } from 'react-redux'
import {fetchList} from '../store/features/watchlistSlice'
import MessageContext from "../contexts/MessageContext";
import Toast from "../components/Toast"
const UserWatchList = () => {

    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext);
    
    const dispatch = useDispatch();
    const {data:watchlist} = useSelector((state) => state.userWatchlist)

    useEffect(() => {
      dispatch(fetchList());
    },[]);

    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(watchlist.length / itemsPerPage);

    const firstIndex = pageNumber * itemsPerPage;
    const lastIndex = pageNumber * itemsPerPage + itemsPerPage;
    const displayItems = watchlist.slice(firstIndex, lastIndex );

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };
    
    const handleList = async function(id){
        try {
          await axInstance.delete(`/delete-from-list/${id}`);
          setMessage("Item has been removed from your watchlist");
          navigate(0);
        } catch (error) {
          console.error(error.message);
        }
      }

      const changeStatus = async function(id,status){
        try {
          await axInstance.put(`/change-status/${id}`,{status});
          setMessage("Item status has been changed");
          navigate(0);

        } catch (error) {
          console.error(error.message);
        }
      }
    return ( 
    <>
    <h2 style={{display: watchlist.length===0? "block": "none"}} className="text-center mt-4"> No items added to watchlist</h2>
    {displayItems && (<div className="card mx-auto w-75 my-5 data">
        <ul className="list-group list-group-flush">
        {displayItems.map(item => (
            <li className="list-group-item" key={item.movie._id} >
            <div className="float-end">
                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" id={"dropdownMenuButton"+item.movie._id} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={"dropdownMenuButton"+item.movie._id}>
                    <Link to={`/movie-series/${item.movie._id}`} className="dropdown-item">View Details</Link>
                    <li>
                    <div className="text-danger dropdown-item" onClick={()=>handleList(item.movie._id)}>Remove from WatchList</div>     
                    </li>
                  </ul>
              </div>
            
            <div className="row">
              <img src={item.movie.imgUrl||poster} alt="Poster" className="data_img mb-2 col-sm-auto col-8 img-fluid"/>
              <div className="col-sm-auto col-8">
                <h3 className="text-break">{item.movie.title} </h3>
                <div><span className="item-property">Genre:</span> {item.movie.genre}</div>
                <div><span className="item-property">Release year:</span> {item.movie.year}</div>
                <div class="dropdown">
  <button className="btn btn-dark dropdown-toggle " type="button" id={"status-"+item.movie._id} data-bs-toggle="dropdown" aria-expanded="false">
  <span className="item-property">Status :</span> {item.status}
  </button>
  <ul className="dropdown-menu" aria-labelledby={"status-"+item.movie._id}>
    {status.map(value=><li key={value.val} onClick={()=>changeStatus(item.movie._id,value.val)}><div className="dropdown-item" 
    style={{color:value.color}}
    >{value.val}</div></li>)}
  </ul>
</div>
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
  containerClassName="pagination justify-content-center"
  pageLinkClassName="page-link"
  disabledClassName="disabled"
  activeClassName="active"
  breakLabel="..."
  breakClassName="page-link"
  renderOnZeroPageCount={null}
  marginPagesDisplayed={1}
  pageClassName="page-item"
  previousClassName="page-item"
  nextClassName="page-item"
  previousLinkClassName	="page-link"
  nextLinkClassName="page-link"
/>
</div>
<Toast/>
    </> 
    
        );
}
const EnhancedComponent=withHOC("Your Watchlist",UserWatchList);
export default EnhancedComponent; 
