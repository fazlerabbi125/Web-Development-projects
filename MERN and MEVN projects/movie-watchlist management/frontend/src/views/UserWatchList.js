import withHOC from "../components/withHoc";
import { useNavigate,Link } from "react-router-dom";
import { useState,useEffect,useContext} from "react";
import poster from "../assets/poster-not-available.jpg"
import {axInstance} from "../hooks/useAxios"
import {status} from "../utils/constants"
import { useSelector, useDispatch } from 'react-redux'
import {fetchList} from '../store/features/watchlistSlice'
import MessageContext from "../contexts/MessageContext";
import {getTokens} from "../utils/handleStorage";

const UserWatchList = () => {

    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const {data:watchlist,error,isLoading,count} = useSelector((state) => state.userWatchlist)

    const itemsPerPage = 2;

    useEffect(() => {
      dispatch(fetchList({page,itemsPerPage}));
    },[page,dispatch]);

    const handlePageClick = (page) => {
      setPage(page);
    }
    const paginationButtons = () => {
      let btn = [];
      if (count) {
          const totalPage = Math.ceil(count / itemsPerPage);
          if (totalPage>1){
            if (page-1>0){
              btn.push(
                (<li className="page-item" key={"Previous"}  onClick={() => { handlePageClick(page-1) }}>
                <span className="page-link text-secondary fw-bold" role="button">
                  &laquo;</span>
              </li>)
              )
            }
              for (let i = 1; i <= totalPage; i++){
                if (i===page){
                  btn.push(<li className="page-item active" key={i} aria-current="page">
                    <span className="page-link bg-dark text-light border-dark" role="button" >{i}</span>
                  </li>)
                }
                else if (i>=page-1 && i<=page+1){
                  btn.push(
                    <li className="page-item" key={i}  onClick={() => { handlePageClick(i) }}> <span className="page-link text-dark" role="button" >{i}</span> </li>
                  )
                }
              }
              if (page+1<=totalPage){
                btn.push(
                  (<li className="page-item" key={"Next"}  onClick={() => { handlePageClick(page+1) }}>
                  <span className="page-link text-secondary fw-bold" role="button">
                  &raquo;</span>
                </li>)
                )
              }
          }
      }
      return btn;
    }

    
    
    const handleList = async function(id){
        try {
          await axInstance.delete(`/delete-from-list/${id}`,{
            headers: {
              'Authorization': `Bearer ${getTokens().accessToken}`
            }
          });
          setMessage("Item has been removed from your watchlist");
          navigate(0);
        } catch (error) {
          console.error(error.message);
        }
      }

      const changeStatus = async function(id,status){
        try {
          await axInstance.put(`/change-status/${id}`,{status},{
            headers: {
              'Authorization': `Bearer ${getTokens().accessToken}`
            }
          });
          setMessage("Item status has been changed");
          navigate(0);

        } catch (error) {
          console.error(error.message);
        }
      }
    return ( 
    <>
    {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
    {error && <h2 className="text-center text-danger">{error}</h2>}
    {!isLoading && !error && (<div>
    <h2 style={{display: watchlist.length===0? "block": "none"}} className="text-center mt-4"> No items added to watchlist</h2>
    {watchlist && watchlist.length>0 && (<div className="card mx-auto w-75 my-5 data">
        <ul className="list-group list-group-flush">
        {watchlist.map(item => (
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
              <img src={item.movie.imgUrl||poster} alt="Poster" className="data__img mb-2 img-fluid col-3"/>
              <div className="col-8">
                <h3 className="text-break">{item.movie.title} </h3>
                <div><span className="data__property--muted">Genre:</span> {item.movie.genre}</div>
                <div><span className="data__property--muted">Release year:</span> {item.movie.year}</div>
                <div className="dropdown">
  <button className="btn btn-dark dropdown-toggle " type="button" id={"status-"+item.movie._id} data-bs-toggle="dropdown" aria-expanded="false">
  <span className="data__property--muted">Status :</span> {item.status}
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
    <nav className="mb-5">
        
     {count>0 && (<ul className="pagination justify-content-center">
            {paginationButtons()}  
      </ul>)}
    </nav>

</div>)}
    </> 
    
        );
}
const EnhancedComponent=withHOC("Your Watchlist",UserWatchList);
export default EnhancedComponent; 
