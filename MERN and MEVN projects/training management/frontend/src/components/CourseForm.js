import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";

const CourseForm = ({course,submitForm,mode}) => {
    const navigate = useNavigate();
    const courseTimings =['9:00 AM to 10:30 AM','11:00 AM to 12:30 PM','3:30 PM to 5:00 PM'];
    const { register, handleSubmit,formState: { errors } } = useForm({
        defaultValues:{
            title:course.title||"",
            details:course.details||"",
            image:course.image||"",
            timing:course.timing||"",
            imgClear:""
        }
    });
    const onSubmit = data =>{
        if (data.image)data.image=data.image[0]; 
        console.log(data)
        submitForm(data);
    }
    return (
    <section className='card authForm'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
            <div className="mb-3">
                <div className="row justify-content-center ">
                    <div className="col-auto">
                        <label className="col-form-label">Title:</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" {...register("title", { required: "Title is required", 
                            minLength:{
                                value:3,
                                message: "Title must be at least 3 characters long."
                            } })}
                        />  
                    </div>                
                </div>
                {errors.title && <div className="text-center text-danger fw-bolder">{errors.title.message}</div>}    
            </div>
            <div className="mb-3">
                <div className="row justify-content-center ">
                    <div className="col-auto">
                        <label className="col-form-label">Timing:</label>
                    </div>
                    <div className="col-auto">
                        <select className="form-select" {...register("timing", {required: "timing is required"})}>
                            <option value="" disabled>Choose course timing</option>
                            {courseTimings.map(item=>
                                <option value={item} key={item}>{item}</option>
                            )}
                            
                        </select> 
                    </div>                
                </div>
                {errors.timing && <div className="text-center text-danger fw-bolder">{errors.timing.message}</div>}    
            </div>
            {course && course.image &&
                <div className="mb-3 text-center">
                    <a href={course.image} target="_blank" rel="noreferrer" className="link-info"> Current Image</a>  
                    <input className="form-check-input ms-2 me-1" type="checkbox" {...register("imgClear")}/> Remove    
                </div>
            }
            <div className="mb-3">
                <div className="text-center">
                    <label className="col-form-label">Upload Image (optional):</label>
                </div>
                <div className="mx-auto col-8">
                    <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" {...register("image")} />
                </div>  
                {errors.image && <div className="text-center text-danger fw-bolder">{errors.image.message}</div>}                                             
            </div>
            <div className="mb-3 ">
                <div className='col-8 mx-auto'>
                    <label htmlFor="details" className="form-label">Course Details</label>
                    <textarea className="form-control" id="details" rows="3"
                    {...register('details',{ required: "Details is required", 
                    minLength:{
                        value:10,
                        message: "Details must be at least 10 characters long."
                    } })}
                    ></textarea>
                </div>
                {errors.details && <div className="text-center text-danger fw-bolder">{errors.details.message}</div>}    
            </div>
            <div className="row justify-content-center gap-2">
                {mode==="edit" && (<button type="button" className="col-4 btn btn-secondary" onClick={()=>navigate(-1)}>Back</button>)}
                <input className='col-4 btn btn-dark' type="submit" value="Submit" />
            </div>
        </form>
    </section>
    )
}

export default CourseForm