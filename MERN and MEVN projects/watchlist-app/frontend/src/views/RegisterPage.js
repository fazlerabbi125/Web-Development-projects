import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import withHOC from "../components/withHoc";
import MessageContext from "../contexts/MessageContext";
import {signinUser} from '../store/features/userSlice'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";

function SignUpPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const {setMessage}=useContext(MessageContext);
  const dispatch = useDispatch();
  const [err,setErr]=useState(null);

  const registerHandler = (data) => { 

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(!data.success) throw new Error(data.message)
        localStorage.setItem('token',data.results.access_token);
        localStorage.setItem('refresh',data.results.refresh_token);
        dispatch(signinUser());
        setMessage("You are now signed in!");
        navigate('/');
      })
      .catch((e) => {
        setErr(e.message);
      });
  };

  return (
    <div className="data text-center mx-auto w-50 mb-5">
      <h2 className="pt-2">Join us today!</h2>
      <form onSubmit={handleSubmit(registerHandler)}>
        
        {err && <h4 className="text-danger">{err}</h4>}

        <div className="mb-2">
          <label>Full Name</label>
          <br />
          <input
            type="text"
            {...register("name", { required: "Name is required", 
                        minLength:{
                        value:3,
                        message: "Name must be at least 3 characters long."
            } })}
          />
          {errors.name && <div className="text-danger fw-bolder">{errors.name.message}</div>}
        </div>
        <div className="mb-2">
          <label>Email Address</label>
          <br />
          <input
            type="email"
            {...register("email", { required: "Email is required",
              pattern:{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }})}
          />
          {errors.email && <div className="text-danger fw-bolder">{errors.email.message}</div>}
        </div>
        <div className="mb-2">
          <label>Password</label>
          <br />
          <input
            type="password"
            {...register("password", { required: "Password is required", 
                        minLength:{
                        value:6,
                        message: "Password must be at least 6 characters long."
            } })}
          />
          {errors.password && <div className="text-danger fw-bolder">{errors.password.message}</div>}
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            {...register("confirmPassword", { required: "You need to confirm your password", 
                validate: value => value === watch("password")||"Your passwords don't match"
            })}
          />
          {errors.confirmPassword && <div className="text-danger fw-bolder">{errors.confirmPassword.message}</div>}
        </div>
        <p>
          <button className="btn btn-primary mb-3" type="submit">
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
const EnhancedComponent=withHOC("Create your account",SignUpPage);
export default EnhancedComponent;