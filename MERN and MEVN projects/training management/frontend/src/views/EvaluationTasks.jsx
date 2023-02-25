import React from 'react'
import { useAxios } from '../hooks/useAxios'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import DeleteModal from '../components/modals/DeleteModal';
import BreadCrumb from '../components/common/BreadCrumb';
import Layout from "../components/common/Layout";

const EvaluationTasks = () => {
  const { evalID } = useParams();
  const auth = useSelector((state) => state.authUser.userData);
  const url = auth.role === "trainer" ? `/trainer/${evalID}/get-assessment` : `/trainee/${evalID}/get-assessment`
  const { data, error, isLoading } = useAxios(url);
  const [modal, setModal] = React.useState({});

  function toggleModal(id) {
    setModal({ ...modal, [id]: !modal[id] });
  }
  return (
    <Layout>

      <BreadCrumb prev='Course Assessments' current='Assessment Details' />

      {auth.role === "trainer" &&
        <div className='text-center'>
          <Link to={`/trainer/${evalID}/add-task`} className="btn btn-dark py-2 px-4 fs-5 rounded-pill">Add Task/Question</Link>
        </div>}
      {error && <h2 className="text-center text-danger">{error}</h2>}
      {isLoading ? <h2 className="text-center mt-3">Loading <i className="fa fa-spinner fa-spin"></i></h2> : (
        <>
          {!data?.assessment ? <h2 className="text-center">No assessment found</h2> : (
            <section className="eval-details card">
              <h3 className="card-header eval-details__header">
                {data.assessment.title}
              </h3>
              <div className="card-body">
                {data.assessment.tasks.length === 0 ? <p className="card-text text-center h5">No tasks/questions added</p> : (
                  <>
                    <p className="card-text text-center h5">Total score: {data.total}</p>
                    <p className='card-text ms-2 mt-4'><strong>Submission method:</strong> Email your answers at <em>{data.assessment.course.trainer.email}</em>.
                      Make sure your email subject is in the form <em>Batch-Course-Assessment</em> and mention your name and ID in the email body.</p>
                    <ol className="mt-3">
                      {data.assessment.tasks.map(task =>
                        <div key={task._id}>
                          {auth.role === "trainer" &&
                            <>
                              <div className="btn-group float-end mt-2">
                                <button className="btn text-primary btn-sm fs-5 dropdown-toggle ms-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li><Link to={`/trainer/${evalID}/${task._id}/edit-task`} state={{ task }} className="dropdown-item">Edit</Link></li>
                                  <li className="dropdown-item text-danger" role="button" onClick={() => toggleModal("task-" + task._id)}>Delete
                                  </li>
                                </ul>
                              </div>
                              {modal["task-" + task._id] && <DeleteModal toggleModal={toggleModal} id={"task-" + task._id} url={`/trainer/${task._id}/delete-task`} />}
                            </>
                          }

                          <li className="p-3">
                            <div>{task.content} (score: {task.score})</div>
                          </li>

                        </div>
                      )}

                    </ol>
                  </>

                )}

              </div>
            </section>)}
        </>
      )}
    </Layout>
  )
}

export default EvaluationTasks