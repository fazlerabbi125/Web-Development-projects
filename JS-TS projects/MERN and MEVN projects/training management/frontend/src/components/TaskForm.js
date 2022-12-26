import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";

export default function TaskForm({task,submitForm}) {
    const navigate = useNavigate();
    const { register, handleSubmit,formState: { errors } } = useForm({
        defaultValues:{
            score:task.score||0,
            content:task.content||"",
        }
    });
    const onSubmit = data => submitForm(data)
    return (
    <section className='card authForm'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
            <div className="mb-3">
                <div className="row justify-content-center ">
                    <div className="col-auto">
                        <label className="col-form-label">Score:</label>
                    </div>
                    <div className="col-auto">
                        <input type="number" className="form-control" {...register("score", { required: "score is required"})}
                        />  
                    </div>                
                </div>
                {errors.score && <div className="text-center text-danger fw-bolder">{errors.score.message}</div>}    
            </div>
            <div className="mb-3 ">
                <div className='col-8 mx-auto'>
                    <label htmlFor="details" className="form-label">Task Content</label>
                    <textarea className="form-control" id="details" rows="3"
                    {...register('content',{ required: "content is required", 
                    minLength:{
                        value:10,
                        message: "content must be at least 10 characters long."
                    } })}
                    ></textarea>
                </div>
                {errors.content && <div className="text-center text-danger fw-bolder">{errors.content.message}</div>}    
            </div>
            <div className="row justify-content-center gap-2">
                <button type="button" className="col-4 btn btn-secondary" onClick={()=>navigate(-1)}>Back</button>
                <button type="submit" className='col-4 btn btn-dark'>Submit</button>
            </div>
        </form>
    </section>
    )
}
