import React from 'react'
import { useForm } from "react-hook-form";
import { useLocation,useNavigate,useParams } from "react-router-dom";
import { axInstance } from '../hooks/useAxios';
import MessageContext from "../contexts/MessageContext";
import { useDispatch } from 'react-redux'
import { updateCredentials } from '../store/features/userSlice';
import Layout from '../components/Layout';

function AccountUpdate() {

    const dispatch=useDispatch();
    const {state} = useLocation();
    const navigate = useNavigate();
    const {userID}=useParams();
    const [error, setError]=React.useState(null);
    const {setMessage}=React.useContext(MessageContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            name:state.user.name,
            email:state.user.email,
            gender:state.user.gender,
            photo:state.user.photo,
            birth_date:state.user.birth_date.split('T')[0],
            imgClear:""
        }
    });

    const onSubmit = async (data) =>{
        // when file is uploaded, array is return where index 0 contains file. But if photo is a string, it will return the character on index 0.
        if (data.photo)data.photo=data.photo[0];
        data.token=localStorage.getItem('refresh');
        try {
            const res= await axInstance.patch(`/${state.user._id}/update-profile`,data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!res.data || !res.data.success){
                console.log(res.response.data.errors);
                throw new Error(res.response.data.message);
            }
            localStorage.setItem('token',res.data.results.access_token);
            localStorage.setItem('refresh',res.data.results.refresh_token);
            dispatch(updateCredentials({
                name:res.data.results.name,
                email:res.data.results.email
            }))
            setMessage("Your profile info has been updated");
            navigate('/user/'+userID);
        } catch (error) {
            setError(error.message);
        }
    }
    
    return (
    <Layout header='Update Your Profile'>
    <section className='card authForm'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Name:</label>
                </div>
                <div className="col-auto">
                    <input type="text" className="form-control" {...register("name", { required: "Name is required", 
                        minLength:{
                            value:3,
                            message: "Name must be at least 3 characters long."
                        } })}
                    />  
                </div>                
            </div>
            {errors.name && <div className="text-center text-danger fw-bolder">{errors.name.message}</div>}    
        </div>
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Email:</label>
                </div>
                <div className="col-auto">
                    <input type="email" className="form-control" {...register("email", { required: "Email is required" })}
                    />  
                </div>                
            </div>
            {errors.email && <div className="text-center text-danger fw-bolder">{errors.email.message}</div>}    
        </div>
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Date of Birth:</label>
                </div>
                <div className="col-auto">
                    <input type="date" className="form-control" {...register("birth_date", { required: "birth_date is required" })}
                    />  
                </div>                
            </div>
            {errors.birth_date && <div className="text-center text-danger fw-bolder">{errors.birth_date.message}</div>}    
        </div>
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Gender:</label>
                </div>
                <div className="col-auto">
                    <select className="form-select" {...register("gender", {required: "gender is required"})}>
                        <option value="" disabled>Choose your gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Others'>Others</option>
                    </select> 
                </div>                
            </div>
            {errors.gender && <div className="text-center text-danger fw-bolder">{errors.gender.message}</div>}    
        </div>
        <div className="mb-3 text-center">
            <a href={state.user.photo} target="_blank" rel="noreferrer" className="link-info"> Current Photo</a>  
            <input className="form-check-input ms-2 me-1" type="checkbox" {...register("imgClear")}/> Remove    
        </div>
        
        <div className="mb-3">
            <div className="text-center">
                <label className="col-form-label">Upload Photo (optional):</label>
            </div>
            <div className="mx-auto col-8">
                <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" {...register("photo")} />
            </div>  
            {errors.photo && <div className="text-center text-danger fw-bolder">{errors.photo.message}</div>}                                             
        </div>
        <div className="text-center">
            <input className='btn btn-dark' type="submit" value="Update" />
        </div>
        </form>
    </section>
    </Layout>
    )
}
export default AccountUpdate;