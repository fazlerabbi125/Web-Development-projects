import React, { useContext,useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import Layout from "../components/Layout";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {setMessage}=useContext(MessageContext);

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
        if (data.success){
          setMessage('An email has been sent to your registered email address')
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <section className='guest'>
      <div className="guest__form text-center">
        <h5 className="mt-2">Enter your email address and we will send you a new password</h5>
        <form onSubmit={forgetPasswordHandler}>
        <p className="my-4 row justify-content-center">
                <label className="col-auto col-form-label">Email:</label>
                <div className="col-auto">
                    <input className="form-control" type="email"
                    name="email"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}/>
                </div>
            </p>
          <p>
            <button className="btn btn-dark" type="submit">
              Send password reset email
            </button>
          </p>
        </form>
        <p> 
            Already have an account? <Link to="/login" className="link-light">Sign in here</Link>
        </p>
      </div>
      </section>
    </Layout>
  );
}
export default ForgetPasswordPage;