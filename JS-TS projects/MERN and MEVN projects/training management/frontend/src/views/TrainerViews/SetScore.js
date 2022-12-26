import React from 'react'
import { useParams,useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout';
import {useAxios,axInstance} from '../../hooks/useAxios'
import {getTokens} from "../../utils/handleStorage";
import useDebounce from '../../hooks/useDebounce';
import BreadCrumb from '../../components/BreadCrumb';

function SetScore() {
    const navigate = useNavigate();
    const {evalID} = useParams();
    const {data, error, isLoading}=useAxios(`/trainer/${evalID}/get-assessment`);
    const [score,setScore]= React.useState({});
    const [query,setQuery]= React.useState({search:'',filter:''});
    function handleQuery(event){
        const name = event.target.name;
        const value = event.target.value;
        setQuery(values => ({...values, [name]: value}))
    }
    function getScore(traineeID){
        const trainee=data?.assessment.traineeScores.find((item) =>item.trainee===traineeID)
        return trainee?.score;
    }
    const handleScore=(event,trainee)=>{
        event.preventDefault();
        const traineeScore={trainee,score:score["score-"+trainee]};
        if (traineeScore.score<=data?.total){
        axInstance.patch(`/trainer/${evalID}/set-trainer-scores`, traineeScore,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                navigate(0);
            })
            .catch(function (error) {
                error=error.message;
                console.log(error);
        });
        }
    }
    const debouncedSearchTerm = useDebounce(query.search);
    let trainees=data?.assessment.batch.trainees.filter(function(trainee) {
        if (query.filter==='email' && debouncedSearchTerm){
            return trainee['email'].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        }
        else if (query.filter==='name' && debouncedSearchTerm){
            return trainee['name'].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        }
        return true;
    });
    return (
    <Layout header='Manage Trainee Scores'>
        <BreadCrumb prev='Course Assessments' current='Manage Trainee Scores'/>

        {error && <h2 className="text-center text-danger">{error}</h2>}
        {isLoading ? <h2 className="text-center mt-3">Loading <i className="fa fa-spinner fa-spin"></i></h2>:(
        <>
        {(!data?.assessment && data?.assessment.batch.trainees) ? <h2 className="text-center">No trainee found</h2>: (  
            <>
            <div className="trainee-search">
                <input className="form-control trainee-search__inputs" type="search" name="search" placeholder="Seach trainee by name or email"
                value={query.search} onChange={handleQuery}
                />
                <select className="form-select trainee-search__inputs" name="filter" onChange={handleQuery} value={query.filter}>
                <option value="">Choose category</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
                </select>
            </div>
            <h3 className="text-center">The total score for this assessment is: {data.total}</h3>
            {trainees.length===0? <h2 className="text-center">No trainees found</h2>: (<table className="table table-bordered w-75 mx-auto text-center my-3">
                    <thead className="table-info">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Current Score</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {trainees.map(item=>(
                        <tr key={item._id}>
                        <th scope="row">{item._id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{getScore(item._id)}</td>
                        <td><button className='btn btn-secondary' data-bs-toggle="modal" data-bs-target={`#trainee-${item._id}`}>Set score</button></td>
<div className="modal fade" id={`trainee-${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header justify-content-center">
        <h5 className="modal-title" id="exampleModalLabel">Set assessment score</h5>
    </div>
    <form onSubmit={(e)=>handleScore(e,item._id)}>
    <div className="modal-body text-center">
        <input type="number" value={score["score-"+item._id]} name={"score-"+item._id} onChange={(e)=>setScore({...score,["score-"+item._id]:e.target.value})} className="form-control text-center w-75 mx-auto" placeholder="Enter score" />
        {score["score-"+item._id]>data?.total && <div className="text-danger mt-3">Score cannot exceed the total score of {data?.total}</div>}
    </div>
    <div className="modal-footer justify-content-center">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
        <button type="submit" className="btn btn-success" >Confirm</button>
    </div>
    </form>
    </div>
</div>
</div>
                        </tr>
                        
                    ))}

                    </tbody>
                </table>
            )}
            </>
        )}
        </>
    )}
    </Layout>
    )
}

export default SetScore