import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {fetchCourseList} from '../store/features/courseListSlice'

export default function UserManagementForm({user,submitForm,mode}) {
    const navigate= useNavigate();
    const dispatch = useDispatch();

    const courselist = useSelector((state) => state.courseList.data);
    React.useEffect(() => {
        dispatch(fetchCourseList({}));
    },[dispatch]);

    function getAssignedCourses(){
        return courselist.filter((course)=>{
            return course.trainer && user && course.trainer._id===user._id
        }).map(course=>course._id);
    }

    const { register, handleSubmit,watch,formState: { errors } } = useForm({
        defaultValues:{
            name:user.name||"",
            email:user.email||"",
            gender:user.gender||"",
            role:user.role||"",
            birth_date:user.birth_date?user.birth_date.split('T')[0]:"",
        }
    });

    const onSubmit = data => submitForm(data);
    return (<>
    {!courselist?<h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>:
    <section className='card authForm'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
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
                    <input type="email" className="form-control" {...register("email", { required: "Email is required",
                        pattern:{
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }})}
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
        
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Role:</label>
                </div>
                <div className="col-auto">
                    <select className="form-select" {...register("role", {required: "Role is required"})}>
                        <option value="" disabled>Choose your role</option>
                        <option value='trainer'>Trainer</option>
                        <option value='trainee'>Trainee</option>
                    </select> 
                </div>                
            </div>
            {errors.role && <div className="text-center text-danger fw-bolder">{errors.role.message}</div>}    
        </div>
        {watch('role')==="trainer" && courselist?.length>0 &&  (
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Courses:</label>
                </div>
                <div className="col-auto">
                    <select className="form-select" multiple defaultValue={getAssignedCourses()}{...register("courses",)}>
                    <option value="" disabled>Choose courses</option>
                        {courselist && courselist.map(item=>(
                            <option value={item._id} key={item._id}>{item.title}</option>
                        ))}
                    </select> 
                </div>                
            </div>
            {errors.courses && <div className="text-center text-danger fw-bolder">{errors.courses.message}</div>}    
        </div>
        )}
        {mode==="create" && (<>
        <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Password:</label>
                </div>
                <div className="col-auto">
                    <input type="password" className="form-control" {...register("password", { required: "Password is required", 
                        minLength:{
                        value:6,
                        message: "Password must be at least 6 characters long."
                        } })}
                    />
                </div>        
            </div>
            {errors.password && <div className="text-danger text-center fw-bolder">{errors.password.message}</div>}
        </div>
        <div className="mb-3">
        <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Confirm Password:</label>
                </div>
                <div className="col-auto">
                    <input type="password" className="form-control" {...register("confirmPassword", { required: "You need to confirm your password", 
                        validate: value => value === watch("password")||"Your passwords don't match"
                    })}
                    />
                </div>        
            </div>
            {errors.confirmPassword && <div className="text-danger text-center fw-bolder">{errors.confirmPassword.message}</div>}
        </div>
        </>)}
        <div className="row justify-content-center gap-2">
            {mode==="edit" && (<button type="button" className="col-4 btn btn-secondary" onClick={()=>navigate("/admin/userlist")}>Back</button>)}
            <input className='col-4 btn btn-dark' type="submit" value="Submit" />
        </div>
        </form>
    </section>}
    </>
    )
}
