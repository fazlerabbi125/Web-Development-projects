import { useForm } from "react-hook-form";
import {useLocation,useNavigate} from 'react-router-dom';
import {genres} from "../utils/constants"

// validate: file => (!file)||(file && ["image/jpeg", "image/png", "image/jpg"].includes(file[0]?.type)) ||
//"File input has to be empty or can only have PNG, JPEG and JPG formats"
//     }

const ItemForm = ({item,submitForm}) => {
    const navigate = useNavigate(); //hook for re-direct
    const dV={
        title:item.title||'',
        genre:(typeof item.genre === 'string'?item.genre.split('|'):item.genre)||[],
        year:item.year||null,
        rating:item.rating||null,
        poster:null,
        imgUrl:item.imgUrl||'',
        description:item.description||'',
        country:item.country||'',
        language:item.language||'',
        photoClear:false
    }
    const { register, handleSubmit,formState:{errors} } = useForm({
    defaultValues:dV
    });


    const onSubmit = (data) => {
        if (data.poster)data.poster=data.poster[0];
        if (data.photoClear){
            data.imgUrl="";
            data.photoClear=null;
        }
        data.genre=data.genre.reduce((str,value)=>{
            if (str) return str+"|"+value;
            return str+value;
        },"")

        submitForm(data);
    }
    let location = useLocation();
    return ( 
        <>
            <form className="data mx-auto w-50 my-5 p-4" onSubmit={handleSubmit(onSubmit)}>
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
                    <label className="col-form-label">Language:</label>
                </div>
                <div className="col-auto">
                    <input type="text" className="form-control" {...register("language", { required: "Language is required", 
                        minLength:{
                            value:3,
                            message: "Language must be at least 3 characters long."
                        } })}
                    />  
                </div>                
                </div>
                {errors.language && <div className="text-center text-danger fw-bolder">{errors.language.message}</div>}    
            </div>
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Country:</label>
                </div>
                <div className="col-auto">
                    <input type="text" className="form-control" {...register("country", { required: "Country is required", 
                        minLength:{
                            value:2,
                            message: "Country must be at least 2 characters long."
                        } })}
                    />  
                </div>                
                </div>
                {errors.country && <div className="text-center text-danger fw-bolder">{errors.country.message}</div>}    
            </div>
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Release year:</label>
                </div>
                <div className="col-auto">
                    <input type="number" className="form-control" {...register("year", { required: "Year is required", 
                            min:{
                                value:1980,
                                message: "Year must be 1980 onwards."
                            },
                            max:{
                                value:2023,
                                message: "Year must be less than or equal to 2023."
                            }
                        
                        })}
                    />  
                </div>                
                </div>
                {errors.year && <div className="text-center text-danger fw-bolder">{errors.year.message}</div>}    
            </div>
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Rating:</label>
                </div>
                <div className="col-4">
                    <input type="number" className="form-control" placeholder="Not mandatory"{...register("rating", {
                            min:{
                                value:0,
                                message: "Rating must be between 0 and 10."
                            },
                            max:{
                                value:10,
                                message: "Rating must be between 0 and 10."
                            }
                        
                        })}
                    />  
                </div>                
                </div>
                {errors.rating && <div className="text-center text-danger fw-bolder">{errors.rating.message}</div>}    
            </div>
            {item.imgUrl && <div className="mb-3 text-center text-break">
                <a href={item.imgUrl} target="_blank" rel="noreferrer" className="link-info"> Current Movie/Series Poster</a>  
                &nbsp; <input className="form-check-input" type="checkbox" {...register("photoClear")}/> Remove
             </div>}
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Upload Poster (optional):</label>
                </div>
                <div className="col-auto">
                <input type="file" className="form-control" {...register("poster")} />
                </div>                
                </div>
                {errors.poster && <div className="text-center text-danger fw-bolder">{errors.poster.message}</div>}    
            </div>    
            <div className="mb-3">
            <div className="row justify-content-center ">
                <div className="col-auto">
                    <label className="col-form-label">Genres:</label>
                </div>
                <div className="col-auto">
                    <select className="form-select" multiple {...register("genre", {required: "Genre is required"})}>
                        <option value="" disabled>Choose your genres</option>
                        {genres.map(value=><option value={value} key={value}>{value}</option>)}
                    </select>
                </div>                
                </div>
                {errors.genre && <div className="text-center text-danger fw-bolder">{errors.genre.message}</div>}    
            </div>
            <div className="mb-3">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <label className="col-form-label">Description:</label>
                    </div>
                    <div className="col-auto">
                        <textarea  className="form-control" {...register("description", { required: "Description is required", 
                            minLength:{
                                value:5,
                                message: "Description must be at least 5 characters long."
                            } 
                        })} rows="5" cols="40"></textarea>
                    </div>                
                </div>
            {errors.description && <div className="text-center text-danger fw-bolder">{errors.description.message}</div>}    
            </div>
            <div className="text-center">
                {location.pathname.endsWith("edit") &&
                <button className="btn btn-danger me-1" onClick={()=>navigate(`/movie-series/${item._id}`)}>Back to Details</button>}
                <input type="submit" className="btn btn-primary"/>
            </div>
            </form>
        </>


     );
}
 
export default ItemForm;