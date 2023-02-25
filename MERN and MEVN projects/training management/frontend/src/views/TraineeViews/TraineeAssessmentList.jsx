import React from 'react'
import { Link, useParams } from "react-router-dom";
import Layout from '../../components/common/Layout';
import { useAxios } from '../../hooks/useAxios'
import TraineeChart from '../../components/charts/TraineeEvalChart';
import BreadCrumb from '../../components/common/BreadCrumb';

function TraineeAssessmentList() {
    const { batchID, courseID } = useParams();
    const { data: assessmentList, error, isLoading } = useAxios(`/trainee/${batchID}/${courseID}/get-assessmentList`);

    return (
        <Layout>

            <BreadCrumb to={`/user/${batchID}/batch-details`} prev='Batch Details' current='Course Assessments' />

            {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
            {error && <h2 className="text-center text-danger">{error}</h2>}
            {!isLoading && assessmentList && (
                <>
                    {assessmentList.length === 0 ? <h2 className="text-center">No assessments found</h2> : (<>
                        <TraineeChart assessmentList={assessmentList} />

                        <table className="table table-bordered w-75 mx-auto text-center my-5">
                            <thead className="table-info">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessmentList.map(item => (
                                    <tr key={item._id}>
                                        <th scope="row">{item.title}&nbsp;<Link to={`/trainee/${item._id}/assessment-details`} className="text-decoration-none">(View details)</Link></th>
                                        <td>{new Date(item.startTime).toString().split(':00 GMT')[0]} to {new Date(item.endTime).toString().split(':00 GMT')[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                    )}
                </>
            )}
        </Layout>
    )
}

export default TraineeAssessmentList

