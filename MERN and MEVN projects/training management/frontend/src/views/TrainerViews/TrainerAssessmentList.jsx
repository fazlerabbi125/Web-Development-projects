import React from 'react'
import { Link, useParams } from "react-router-dom";
import Layout from '../../components/common/Layout';
import { useAxios } from '../../hooks/useAxios'
import DeleteModal from '../../components/modals/DeleteModal';
import BreadCrumb from '../../components/common/BreadCrumb';

function TrainerAssessmentList() {
  const { batchID, courseID } = useParams();
  const [modal, setModal] = React.useState({});
  function toggleModal(id) {
    setModal({ ...modal, [id]: !modal[id] });
  }
  const { data: assessmentList, error, isLoading } = useAxios(`/trainer/${batchID}/${courseID}/get-assessmentList`);
  return (
    <Layout>
      <BreadCrumb to={`/user/${batchID}/batch-details`} prev='Batch Details' current='Course Assessments' />

      <div className='text-center mb-4'>
        <Link to={`/trainer/${batchID}/${courseID}/create-assessment`} className="btn btn--sapphire-blue rounded-pill py-2 px-4 fs-5"> Add Assessment</Link>
      </div>
      {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
      {error && <h2 className="text-center text-danger">{error}</h2>}
      {!isLoading && assessmentList && (
        <>
          {assessmentList.length === 0 ? <h2 className="text-center">No assessments found</h2> : (<>
            <table className="table table-bordered w-75 mx-auto text-center my-3">
              <thead className="table-info">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessmentList.map(item => (
                  <tr key={item._id}>
                    <th scope="row">{item.title}&nbsp;<Link to={`/trainer/${item._id}/assessment-details`} className="text-decoration-none">(View details)</Link></th>
                    <td>{new Date(item.startTime).toString().split(':00 GMT')[0]} to {new Date(item.endTime).toString().split(':00 GMT')[0]}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 flex-column flex-md-row">
                      <Link to={`/trainer/${item._id}/edit-assessment`} state={{ assessment: item }} className='btn btn-dark '> Edit</Link>
                      <Link to={`/trainer/${item._id}/set-scores`} className='btn btn-secondary'>Set Scores</Link>
                      <button type="button" className='btn btn-danger' onClick={() => toggleModal("eval-" + item._id)}>Delete</button></td>
                    {modal["eval-" + item._id] && <DeleteModal toggleModal={toggleModal} id={"eval-" + item._id} url={`/trainer/${item._id}/delete-assessment`} />}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='text-center mt-4'>To see overall trainee performance for each assessment of this course, <Link to={`/trainer/${batchID}/${courseID}/performance`} className="link-info">click here</Link></p>
          </>
          )}
        </>
      )}
    </Layout>
  )
}

export default TrainerAssessmentList