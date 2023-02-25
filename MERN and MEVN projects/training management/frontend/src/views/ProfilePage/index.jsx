import React from "react";
import Layout from "../../components/common/Layout";
import defaultProfile from "../../assets/images/profile.jpg";
import { useAxios, axInstance, server_URL } from "../../hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";

function ProfilePage() {
    const navigate = useNavigate();
    const { setMessage } = React.useContext(MessageContext);
    const { userID } = useParams();
    const { data: user, error, isLoading } = useAxios(`/${userID}/get-profile`);
    const sendEmailVerificationExpired = async () => {
        try {
            const res = await axInstance.patch(`/email-on-expire-mail/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!res.data || !res.data.success) {
                console.log(res.response.data.errors);
                throw new Error(res.response.data.message);
            }
            setMessage("An email has been sent to your account");
            navigate(0);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Layout>
            <section>
                {isLoading && (
                    <h2 className="text-center">
                        Loading <i className="fa fa-spinner fa-spin"></i>
                    </h2>
                )}
                {error && <h2 className="text-center text-danger">{error}</h2>}
                {!isLoading && user && (
                    <div className="card mx-auto profile">
                        <img
                            src={user.photo ? server_URL + user.photo : defaultProfile}
                            className="img-fluid profile__img rounded-circle"
                            alt="Profile"
                        />

                        <div className="card-body profile__details">
                            <h2 className="card-title mb-3">{user.name}</h2>
                            <div className="card-text">
                                <span className="text-white">ID:</span> {user._id}
                            </div>
                            <div className="card-text">
                                <span className="text-white">Email:</span> {user.email}
                            </div>
                            <div className="card-text">
                                <span className="text-white">Gender:</span> {user.gender}
                            </div>
                            <div className="card-text">
                                <span className="text-white">Date of birth:</span>{" "}
                                {user.birth_date.split("T")[0]}
                            </div>
                            <div className="d-grid gap-2 mt-2">
                                <Link
                                    to={`/user/${userID}/update`}
                                    state={{ user }}
                                    className="btn btn-dark"
                                >
                                    Update account info
                                </Link>
                                {user.emailVerificationExpire &&
                                    new Date(`${user.emailVerificationExpire}`).getTime() <=
                                    Date.now() && (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={sendEmailVerificationExpired}
                                        >
                                            Verify Email
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default ProfilePage;
