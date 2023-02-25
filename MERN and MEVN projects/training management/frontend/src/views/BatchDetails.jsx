import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import Layout from "../components/common/Layout";

function BatchDetails() {
    const { batchID } = useParams();
    const {
        data: batch,
        error,
        isLoading,
    } = useAxios(`/${batchID}/get-batch-details`);
    const auth = useSelector((state) => state.authUser.userData);
    return (
        <Layout>
            <section className="w-75 mx-auto">
                {isLoading && (
                    <h2 className="text-center">
                        Loading <i className="fa fa-spinner fa-spin"></i>
                    </h2>
                )}
                {error && <h2 className="text-center text-danger">{error}</h2>}
                {!isLoading && batch && (
                    <>
                        <div className="my-4">
                            <h2>{batch.name}</h2>
                            <div className="text-muted">
                                Duration: {batch.startDate.split("T")[0]} to{" "}
                                {batch.endDate.split("T")[0]}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-center">Assigned Courses</h4>
                            {batch.assignedCourses.length === 0 ? (
                                <div className="text-center">No courses have been added</div>
                            ) : (
                                <table className="table table-bordered w-75 mx-auto text-center my-3">
                                    <thead className="table-info">
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Timing</th>
                                            <th scope="col">Trainer</th>
                                            {auth.role !== "admin" && (
                                                <th scope="col">Assessments</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batch.assignedCourses.map((item) => (
                                            <tr key={item._id}>
                                                <th scope="row">
                                                    {item.title}{" "}
                                                    <Link
                                                        to={`/user/${item.slug}/course-details`}
                                                        className="link-primary text-decoration-none"
                                                    >
                                                        (View details)
                                                    </Link>
                                                </th>
                                                <td>{item.timing}</td>
                                                <td>{item.trainer ? item.trainer.name : "TBA"}</td>
                                                {auth.role !== "admin" && (
                                                    <td>
                                                        {item.trainer &&
                                                            auth._id === item?.trainer._id &&
                                                            auth.role === "trainer" && (
                                                                <Link
                                                                    to={`/trainer/${batch._id}/${item._id}/assessment-list`}
                                                                    className="link-info"
                                                                >
                                                                    View Assessments
                                                                </Link>
                                                            )}
                                                        {auth.role === "trainee" && (
                                                            <Link
                                                                to={`/trainee/${batch._id}/${item._id}/assessment-list`}
                                                                className="link-info"
                                                            >
                                                                View Assessments
                                                            </Link>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="mb-4">
                            <h4 className="text-center">Assigned Trainees</h4>
                            {batch.trainees.length === 0 ? (
                                <div className="text-center">No trainees have been added</div>
                            ) : (
                                <table className="table table-bordered w-75 mx-auto text-center my-3">
                                    <thead className="table-info">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {batch.trainees.map((item) => (
                                            <tr key={item._id}>
                                                <th scope="row">{item._id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}
            </section>
        </Layout>
    );
}

export default BatchDetails;
