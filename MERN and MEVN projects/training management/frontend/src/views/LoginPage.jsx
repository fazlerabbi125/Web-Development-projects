import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessageContext from "../contexts/MessageContext";
import { useDispatch } from 'react-redux'
import { signinUser } from '../store/features/userSlice'
import Layout from '../components/common/Layout';

function LoginPage() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setMessage } = useContext(MessageContext);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value })
    }

    const loginHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputs),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    //To store object in localStorage/sessionStorage, use JSON.stringify(object)
                    localStorage.setItem('token', data.results.access_token);
                    localStorage.setItem('refresh', data.results.refresh_token);
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
        <Layout>
            <section className='guest'>
                <form onSubmit={loginHandler} className="guest__form">
                    <h1 className="guest__form__heading">Sign in to your account </h1>
                    {error && <h4 className="text-danger">{error}</h4>}
                    <div className="mb-3 row justify-content-center">
                        <label className="col-auto col-form-label">Email</label>
                        <div className="col-auto">
                            <input className="form-control" type="email"
                                name="email"
                                required
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3 row justify-content-center">
                        <label className="col-auto col-form-label">Password</label>
                        <div className="col-auto">
                            <input className="form-control" type="password"
                                name="password"
                                required
                                onChange={handleChange} />
                        </div>
                    </div>
                    <p>
                        <button className="btn btn-dark" type="submit">Login</button>
                    </p>
                    <div><Link to="/forgot-password" className="link-light">Forgot password?</Link></div>
                </form>
            </section>
        </Layout>
    )
}

export default LoginPage;