import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withHOC from "../components/withHoc";
import MessageContext from "../contexts/MessageContext";
import { useForm } from "react-hook-form";


function ResetPasswordPage() {
  const { token, id } = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const {setMessage}=useContext(MessageContext);

  const loginHandler = (data) => {

    fetch("http://localhost:8000/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: id,
        token: token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success){
          setMessage('Your password has been reset successfully')
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="data text-center mx-auto mb-4 w-50 py-4">
      <form onSubmit={handleSubmit(loginHandler)}>
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
        <div className="mb-2">
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
          <button className="btn btn-primary" type="submit">
            Reset Password
          </button>
        </p>
      </form>
    </div>
  );
}
const EnhancedComponent=withHOC("Set New Password",ResetPasswordPage);
export default EnhancedComponent;