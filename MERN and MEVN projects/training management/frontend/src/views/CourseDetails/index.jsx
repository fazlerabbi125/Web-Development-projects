import React from 'react'
import Layout from '../../components/common/Layout'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import DeleteModal from '../../components/modals/DeleteModal'
import BreadCrumb from '../../components/common/BreadCrumb'
import "./CourseDetails.scss"

function CourseDetails() {
    const { courseSlug } = useParams();
    const { data: course, error, isLoading } = useAxios(`/${courseSlug}/course-details`);
    const auth = useSelector((state) => state.authUser.userData);
    const [modal, setModal] = React.useState({});
    function toggleModal(id) {
        setModal({ ...modal, [id]: !modal[id] });
    }
    return (
        <Layout>
            {auth.role === "trainee" && <BreadCrumb prev='Batch Details' current='Course Details' />}

            {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
            {error && <h2 className="text-center text-danger">{error}</h2>}
            {course && (
                <section className="course-details mx-auto">
                    <div className="course-details__content">
                        <h2 className='display-6 mb-3'>{course.title}</h2>
                        <div className="mb-3">
                            <h4 className="text-muted">Description</h4>
                            <div>{course.details}</div>
                        </div>
                        <div className="accordion" id="courseDetailsContent">
                            {course.lessons.length === 0 ? <h5>No lessons have been added</h5> : (
                                <>
                                    {course.lessons.map(item => (
                                        <div className="accordion-item" key={item._id}>
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" style={{ backgroundColor: "#F3F3F3" }} type="button" data-bs-toggle="collapse" data-bs-target={"#lesson" + item._id} aria-expanded="true" aria-controls="collapseOne">
                                                    {item.title}
                                                </button>
                                            </h2>
                                            <div id={"lesson" + item._id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#courseDetailsContent">
                                                <div className="accordion-body">
                                                    <ul className='course-details__content__list'>
                                                        <li><Link to={`/user/${course.slug}/course-details/${item._id}`} state={{ pageTitle: course.title }} className="link-secondary text-decoration-none">View Lesson</Link></li>
                                                        {auth.role === "admin" && (
                                                            <>
                                                                <li><Link to={`/admin/${course.slug}/${item._id}/edit-lesson`} state={{ courseID: course._id, lesson: item }} className="link-secondary text-decoration-none">Edit Lesson</Link></li>
                                                                <li><span role="button" className="link-danger text-decoration-none" onClick={() => toggleModal(item._id)}>Delete Lesson</span></li>
                                                                {modal[item._id] && <DeleteModal toggleModal={toggleModal} id={item._id} url={`/${course.slug}/${item._id}/delete-lesson`} type={'lesson'} />}
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='course-details__sidemenu mx-auto'>
                        <div className='row align-items-center justify-content-center gap-2 w-100'>
                            <div className='course-details__sidemenu__icons col-auto'>
                                <span > <i className='fa-solid fa-clock text-secondary'></i></span>
                            </div>
                            <div className="col-7">
                                <h5 className="fw-bold">Timing</h5>
                                <div >{course.timing}</div>
                            </div>
                        </div>
                        <div className='row align-items-center justify-content-center gap-2 w-100' >
                            <div className='course-details__sidemenu__icons col-auto'>
                                <span > <i className='fa-solid fa-user text-secondary'></i></span>
                            </div>
                            <div className="col-7">
                                <h5 className="fw-bold">Trainer</h5>
                                <div >{course.trainer ? course.trainer.name : "TBA"}</div>
                            </div>
                        </div>
                        <div className='row align-items-center justify-content-center gap-2 w-100'>
                            <div className='course-details__sidemenu__icons col-auto'>
                                <span > <i className='fa-solid fa-calendar-days text-secondary'></i></span>
                            </div>
                            <div className="col-7">
                                <h5 className="fw-bold">Created on</h5>
                                <div >{course.createdAt.split('T')[0]}</div>
                            </div>
                        </div>
                        {auth.role === "admin" && (<>
                            <div><Link to={`/admin/${course.slug}/edit-course`} state={{ course }} className="btn btn-dark">Edit Course</Link></div>
                            <div><Link to={`/admin/${course.slug}/add-lesson`} state={{ course }} className="btn btn--sapphire-blue">Add Lesson</Link></div>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={() => toggleModal(course.slug)}>
                                    Delete Course
                                </button>
                            </div>
                            {modal[course.slug] && <DeleteModal toggleModal={toggleModal} id={course.slug} url={`/${course.slug}/delete-course`} redirect={'/admin/courselist'} type={'course'} />}
                        </>)}
                    </div>

                    {/* <DeleteModal/> */}
                </section>
            )}
        </Layout>
    );
}

export default CourseDetails