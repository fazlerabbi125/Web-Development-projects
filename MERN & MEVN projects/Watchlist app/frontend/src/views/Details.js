import withHOC from "../components/withHoc";
import {useAxios} from '../hooks/useAxios';
import { Link,useParams} from "react-router-dom";
import { useState } from 'react';
import Delete from '../components/Delete';
import Toast from "../components/Toast"
import poster from "../assets/poster-not-available.jpg"
import {useSelector} from 'react-redux'

const Details = () => {
    const {id} = useParams();
    const [modal,setModal]= useState(false);
    const auth= useSelector((state) => state.authUser.userData);
    const { data, error, isLoading}=useAxios(`/movie-details/${id}`)
    function toggleModal(){
        setModal(!modal);
    }
    // <div><span className="item-property">Status:</span> <span 
    //             style={{color:(status.filter(i=>i.val===data.status))[0].color}}>{data.status}</span>
    //                 </div>
    return ( 
    <>
    {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}    
    {error && <h2 className="text-center text-danger">{error}</h2>}
    {data && (<div className="card w-75 mx-auto data mb-5">
        <div className="card-header">
        {auth && auth.isAdmin && (<div>
        <div className="d-flex justify-content-space-around float-end">
                <Link to={`edit`} className="btn btn-warning me-1 rounded-pill" state={{ data }}><i className="fa fa-pencil"></i></Link>
                <button className="btn btn-danger rounded-pill"onClick={toggleModal}>
                <i className="fa fa-trash"></i></button>
            </div>
            {modal && <Delete id={data._id}  toggleModal={toggleModal} className="text-dark"  />}
            </div> )
        }
            <div className="row align-items-center">
              <img src={data.imgUrl||poster} alt="Poster" className="data_img mb-2 col-auto img-fluid"/>
              <h2 className="card-title mb-4 col-auto">{data.title}</h2>
            </div>
        </div>
        <div className="card-body">
            <h6 className="item-property">Description:</h6>
            <div>{data.description}</div>
            <div className="row justify-content-around mt-4">
                <div className="col-auto">
                   <div><span className="item-property">Genre:</span> {data.genre}</div>
                   <div><span className="item-property">Year:</span> {data.year}</div>
                   <div><span className="item-property">Rating:</span> {data.rating?data.rating:"Unrated"}</div>
                </div>
                <div  className="col-auto">
                    <div><span className="item-property">Country:</span> {data.country}</div>
                    <div><span className="item-property">Language:</span> {data.language}</div>
                </div>

            </div>
        </div>
    </div>)}
    <Toast />

    </>
 );
}
/*
<h2 className="card-title mb-4">{data.title}</h2>
*/
const EnhancedComponent=withHOC("Movie/Series Details",Details);
export default EnhancedComponent;