import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import withHOC from "../components/withHoc";
import MessageContext from "../contexts/MessageContext";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

  const forgetPasswordHandler = (event) => {
    event.preventDefault();
    console.log({
      email: email,
    });
    fetch("http://localhost:8000/send-reset-password-mail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setMessage('An email has been sent to your registered email address')
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="data text-center mx-auto w-50 mb-4 py-2">
      <h5 className="mt-2">Enter your email address and we will send you a new password</h5>
      <form onSubmit={forgetPasswordHandler}>
        <p className="my-4 row justify-content-center">
          <label className="col-sm-1 col-form-label">Email:</label>
          <div className="col-auto">
            <input className="form-control" type="email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }} />
          </div>
        </p>
        <p>
          <button className="btn btn-primary" type="submit">
            Send password reset email
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register" className="link-info">Create an account</Link>
        </p>
      </footer>
    </div>
  );
}
const EnhancedComponent = withHOC(ForgetPasswordPage, "Reset your password");
export default EnhancedComponent;