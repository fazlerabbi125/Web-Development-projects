import React from 'react'
import withHoc from '../utils/withHoc'
import { axInstance } from '../hooks/useAxios';
import {getTokens} from "../utils/handleStorage";
import { useSelector } from 'react-redux'
import paginationButtons from '../utils/paginationButtons'
import DeleteModal from '../components/DeleteModal';
import { Link } from "react-router-dom";

function BatchList() {
    const auth= useSelector((state) => state.authUser.userData);
    const itemsPerPage = 3;
    const [page, setPage] = React.useState(1);
    const [period, setPeriod] = React.useState("");
    
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [batchList,setBatchList]=React.useState([]);
    const [total,setTotal]=React.useState(null);
    function fetchData(){
        let fetchUrl;
        if (auth.role==="admin") fetchUrl='/admin/get-batch-list';
        else if (auth.role==="trainer") fetchUrl='/trainer/get-batches';
        else fetchUrl='/trainee/get-batch-list';
        axInstance.get(fetchUrl+`?page=${page}&itemsPerPage=${itemsPerPage}&period=${period}`,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setBatchList(response.data.results.batchlist);
                setTotal(response.data.results.total);
                setError(null);
                setIsLoading(false);
            })
            .catch(function (err) {
                setError(err.message);
                setIsLoading(false);
        });
    }
    React.useEffect(() => {
        fetchData();
    },[page,period]);
    React.useEffect(() => {
        setPage(1);
    },[total]);

    const [modal,setModal]= React.useState({});
    
    function toggleModal(id){
        setModal({...modal,[id]:!modal[id]});
    }
    return (
        <>    
        {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 className="text-center text-danger">{error}</h2>}
        {!isLoading && batchList && (
            <>
            <div className="w-25 mx-auto mb-5">
                <select className="form-select" value={period} onChange={(e)=>setPeriod(e.target.value)}>
                    <option value="">All Batches</option>
                    <option value="prev">Previous Batches</option>
                    <option value="running">Ongoing and Future Batches</option>
                </select>
            </div>
            {batchList.length===0? <h2 className="text-center">No batches found</h2>: (
            <section className="mb-2">
                <table className="table table-bordered w-75 mx-auto text-center">
    <thead className="table-info">
    <tr>
        <th scope="col">Name (Click to see batch details)</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
        {auth.role==="admin" && <th scope="col">Actions</th>}
    </tr>
    </thead>
    <tbody>
    {batchList.map(item=>(
        <tr key={item._id}>
            <th scope="row"><Link to={`/user/${item._id}/batch-details`} className="text-decoration-none">{item.name}</Link></th>
            <td>{item.startDate.split('T')[0]}</td>
            <td>{item.endDate.split('T')[0]}</td>
            {auth.role==="admin" && (<>
            <td className="d-flex justify-content-center gap-2 flex-wrap"><Link to={`/admin/${item._id}/edit-batch`} state={{batch:item}} className='btn btn-dark '> Edit</Link>
            <button type="button" className='btn btn-danger' onClick={()=>toggleModal(`item-${item._id}`)}>Delete</button></td>
            {modal[`item-${item._id}`] && <DeleteModal toggleModal={toggleModal} id={`item-${item._id}`} url={`/admin/${item._id}/delete-batch`}  type={'batch'}/>}
            </>)
            }
            </tr>
    ))}
        </tbody>
    </table>
            </section>
            )}
            </>
        )}
        {total>0 && (
            <nav className="mb-5">
                <ul className="pagination justify-content-center">
                    {paginationButtons(page,total,itemsPerPage,setPage)}  
                </ul>
            </nav>
            )} 
        </>
    )
}

export default withHoc('Batch List',BatchList) ;