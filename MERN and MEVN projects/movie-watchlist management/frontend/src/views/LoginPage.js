import React, { useContext,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import withHOC from "../components/withHoc";
import MessageContext from "../contexts/MessageContext";
import { useDispatch } from 'react-redux'
import {signinUser} from '../store/features/userSlice'


function LoginPage() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {setMessage}=useContext(MessageContext);
    const dispatch = useDispatch();
    const [rememberUser, setRememberUser] = useState(false);

    const handleChange = (event) => {
        const value=event.target.value;
        const name= event.target.name;
        setInputs({...inputs, [name]: value})
    }

    const loginHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(inputs),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    //To store object in localStorage/sessionStorage, use JSON.stringify(object)
                    if(rememberUser){
                        localStorage.setItem('token',data.results.access_token);
                        localStorage.setItem('refresh',data.results.refresh_token);
                    }
                    else{
                        sessionStorage.setItem('token',data.results.access_token);
                        sessionStorage.setItem('refresh',data.results.refresh_token);
                    }
                    setError(null);
                    dispatch(signinUser());
                    setMessage("You are now signed in!");
                    navigate('/');
                }
                else throw new Error(data.message);
            })
            .catch((err) => {
                setError(err.message);
            });
    }
    return (
        <div className="data text-center mx-auto w-50 mt-5">
            <div className="p-4">
                {error && <h4 className="text-danger">{error}</h4>}
            <form onSubmit={loginHandler} >
                <div className="mb-3 row justify-content-center">
                    <label className="col-sm-3 col-auto col-form-label">Email:</label>
                    <div className="col-auto">
                        <input className="form-control" type="email"
                        name="email"
                        required
                        onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row justify-content-center">
                    <label className="col-sm-3 col-auto col-form-label">Password:</label>
                    <div className="col-auto">
                        <input className="form-control" type="password"
                        name="password"
                        required
                        onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3">
                <input className="form-check-input"  type="checkbox"  onChange={(e)=>setRememberUser(e.target.checked)}/>
                <label className="form-check-label" >
                    &nbsp;Remember me
                </label>
                </div>
                <p>
                    <button className="btn btn-primary" type="submit">Login</button>
                </p>
            </form>
            
                <div><Link to="/forgot-password" className="link-info">Forgot password?</Link></div>
                <p>Don't have an account? <Link to="/register" className="link-info">Sign up here!</Link></p>
            </div>
        </div>
    )
}

const EnhancedComponent=withHOC("Sign in to your account",LoginPage);
export default EnhancedComponent;