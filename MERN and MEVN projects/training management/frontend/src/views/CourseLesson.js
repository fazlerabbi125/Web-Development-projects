import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header'
import { useParams,useLocation} from 'react-router-dom';
import {useAxios} from '../hooks/useAxios';
import BreadCrumb from '../components/BreadCrumb';

function CourseLesson() {
  const {courseSlug,lessonID} = useParams();
  const {data:lesson, error, isLoading}= useAxios(`/${lessonID}/get-lesson`)
  const {state}= useLocation();
  console.log(lesson);
  return (
    <>
    <Header header={state.pageTitle}/>
    <Navbar/>
    {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
    {error && <h2 className="text-center text-danger">{error}</h2>}
    {lesson && <section>
      <BreadCrumb to={`/user/${courseSlug}/course-details`} prev={state.pageTitle} current={lesson.title}/>
      <div className="card lesson-details">
        <h2 className="card-header text-center">{lesson.title}</h2>
        <div className="card-body mx-4">
          <div className="card-text">{lesson.content}</div>
        </div>
      </div>
    </section>
    
    }
    <Footer/>
    </>
  )
}

export default CourseLesson