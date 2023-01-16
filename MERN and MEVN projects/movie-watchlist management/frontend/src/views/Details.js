import withHOC from "../components/withHoc";
import { useAxios, SERVER_URL } from "../hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Delete from "../components/DeleteModal";
import poster from "../assets/poster-not-available.jpg";
import { useSelector } from "react-redux";

const Details = () => {
    const { id } = useParams();
    const [modal, setModal] = useState(false);
    const auth = useSelector((state) => state.authUser.userData);
    const { data, error, isLoading } = useAxios(`/movie-details/${id}`);
    function toggleModal() {
        setModal(!modal);
    }

    return (
        <section className="mt-5">
            {isLoading && (
                <h2 className="text-center">
                    Loading <i className="fa fa-spinner fa-spin"></i>
                </h2>
            )}
            {error && <h2 className="text-center text-danger">{error}</h2>}
            {!error && data && (
                <div className="data card w-75 mx-auto mb-5">
                    <div className="card-header">
                        {auth && auth.isAdmin && (
                            <div>
                                <div className="d-flex justify-content-space-around float-end">
                                    <Link
                                        to={`edit`}
                                        className="btn btn-warning me-1 rounded-pill"
                                        state={{ data }}
                                    >
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-danger rounded-pill"
                                        onClick={toggleModal}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                {modal && (
                                    <Delete
                                        id={data._id}
                                        toggleModal={toggleModal}
                                        className="text-dark"
                                    />
                                )}
                            </div>
                        )}
                        <div className="row align-items-center">
                            <img
                                src={
                                    !data.imgUrl
                                        ? poster
                                        : (data.imgUrl.startsWith("/uploads/")
                                            ? SERVER_URL + data.imgUrl
                                            : data.imgUrl)
                                }
                                alt="Poster"
                                className="data__img mb-2 col-2 img-fluid"
                            />
                            <h2 className="card-title mb-4 col-8">{data.title}</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        <h6 className="data__property--muted">Description:</h6>
                        <div>{data.description}</div>
                        <div className="row justify-content-around mt-4">
                            <div className="col-auto">
                                <div>
                                    <span className="data__property--muted">Genre:</span>{" "}
                                    {data.genre}
                                </div>
                                <div>
                                    <span className="data__property--muted">Year:</span>{" "}
                                    {data.year}
                                </div>
                                <div>
                                    <span className="data__property--muted">Rating:</span>{" "}
                                    {data.rating ? data.rating : "Unrated"}
                                </div>
                            </div>
                            <div className="col-auto">
                                <div>
                                    <span className="data__property--muted">Country:</span>{" "}
                                    {data.country}
                                </div>
                                <div>
                                    <span className="data__property--muted">Language:</span>{" "}
                                    {data.language}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default withHOC(Details);
