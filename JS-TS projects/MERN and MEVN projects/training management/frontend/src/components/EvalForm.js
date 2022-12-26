import React from 'react'
import { useForm,Controller  } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
function EvalForm({assessment,submitForm}) {
    const navigate = useNavigate();
    const { register, handleSubmit,control,getValues ,watch,formState: { errors } } = useForm({
        defaultValues:{
            title:assessment.title||"",
            startTime:assessment?.startTime?new Date(assessment.startTime):"",
            endTime:assessment?.endTime?new Date(assessment.endTime):""
        }
    });
    
    const onSubmit = data =>{
        data.startTime=watch('startTime');
        data.endTime=watch('endTime');
        console.log(data);
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
                        <label className="col-form-label">Start Time:</label>
                    </div>
                    <div className="col-auto">
        <Controller
        control={control}
        name="startTime"
        render={({ field }) => (
        <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            isClearable
            showTimeSelect  
            className={"form-control"}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            />
            )}
            rules={{
                required: "Start time is required",
                validate: () => {
                    return getValues("startTime") < getValues('endTime') || "Start time should be less than end time";
                }
            }}
        />
                    </div>                
                </div>
                {errors.startTime && <div className="text-center text-danger fw-bolder">{errors.startTime.message}</div>}    
            </div>
            <div className="mb-3">
                <div className="row justify-content-center ">
                    <div className="col-auto">
                        <label className="col-form-label">End Time:</label>
                    </div>
                    <div className="col-auto">
        <Controller
        control={control}
        name="endTime"
        render={({ field }) => (
        <DatePicker
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            isClearable
            showTimeSelect
            className={"form-control"}
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            />
            )}
            rules={{
                required: "End time is required",
                validate: () => {
                    return getValues("startTime") < getValues('endTime') || "End time should be greater than start time";
                }
            }}
        />
            
                    </div>                
                </div>
                {errors.endTime && <div className="text-center text-danger fw-bolder">{errors.endTime.message}</div>}    
            </div>
            <div className="row justify-content-center gap-2">
                <button type="button" className="col-4 btn btn-secondary" onClick={()=>navigate(-1)}>Back</button>
                <input className='col-4 btn btn-dark' type="submit" value="Submit" />
            </div>
        </form>
    </section>
    )
}


export default EvalForm