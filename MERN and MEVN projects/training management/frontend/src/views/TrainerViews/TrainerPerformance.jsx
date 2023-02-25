import React from 'react'
import { useParams } from "react-router-dom";
import Layout from '../../components/common/Layout';
import { useAxios } from '../../hooks/useAxios'
import TrainerEvalChart from '../../components/charts/TrainerEvalChart';
import BreadCrumb from '../../components/common/BreadCrumb';

function TrainerAssessmentList() {
    const { batchID, courseID } = useParams();
    const { data: assessmentList, error, isLoading } = useAxios(`/trainer/${batchID}/${courseID}/get-assessmentList`);
    const [evaluation, setEvaluation] = React.useState("");
    return (
        <Layout>
            <BreadCrumb to={`/trainer/${batchID}/${courseID}/assessment-list`} prev='Course Assessments' current='View Performance' />

            {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
            {error && <h2 className="text-center text-danger">{error}</h2>}
            {!isLoading && assessmentList && (
                <>
                    {assessmentList.length === 0 ? <h2 className="text-center">No assessments found</h2> : (
                        <>
                            <div className="w-25 mx-auto mb-5">
                                <select className="form-select" value={evaluation} onChange={(e) => setEvaluation(e.target.value)}>
                                    <option value="">Choose assessment</option>
                                    {assessmentList.map(item =>
                                        (<option value={item._id} key={item._id}>{item.title} - {item._id}</option>)
                                    )}
                                </select>
                            </div>
                            {evaluation && <TrainerEvalChart evaluation={evaluation} />}
                        </>
                    )}
                </>
            )}
        </Layout>
    )
}

export default TrainerAssessmentList