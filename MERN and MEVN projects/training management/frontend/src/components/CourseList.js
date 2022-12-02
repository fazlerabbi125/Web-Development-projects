import React from "react";
import defaultcourse from "../assets/images/defaultcourse.jpg";
import { Link } from "react-router-dom";

const CourseList = ({
  isLoading,
  error,
  courseList,
  title,
  setTitle,
  size,
  pageBtns,
}) => {
  return (
    <>
      <div className="w-25 mx-auto mb-5">
        <input
          className="form-control"
          type="search"
          placeholder="Search courses by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {isLoading && (
        <h2 className="text-center">
          Loading <i className="fa fa-spinner fa-spin"></i>
        </h2>
      )}
      {error && <h2 className="text-center text-danger">{error}</h2>}
      {!isLoading && !error && courseList && (
        <section>
          {courseList.length === 0 ? (
            <h2 className="text-center">No courses found</h2>
          ) : (
            <>
              <div className="card mx-auto w-75 my-5">
                <ul className="list-group list-group-flush">
                  {courseList.map((item) => {
                    return (
                      <li className="list-group-item" key={item._id}>
                        <div className="row">
                          <img
                            src={item.image || defaultcourse}
                            alt="Course"
                            className="mb-2 img-fluid col-3"
                            style={{ width: "15rem", height: "12rem" }}
                          />
                          <div className="col-8">
                            <h3 className="text-break">{item.title} </h3>
                            <div>
                              <span className="text-muted">Trainer:</span>{" "}
                              {item.trainer ? item.trainer.name : "TBA"}{" "}
                            </div>
                            <div>
                              <span className="text-muted">Timing:</span>{" "}
                              {item.timing}
                            </div>
                            <div>
                              <span className="text-muted">Created:</span>{" "}
                              {item.createdAt.split("T")[0]}
                            </div>
                            <div>
                              <Link
                                to={`/user/${item.slug}/course-details`}
                                className="btn btn--deep-blue"
                              >
                                View Course Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {size > 0 && (
                <nav className="mb-5">
                  <ul className="pagination justify-content-center">
                    {pageBtns}
                  </ul>
                </nav>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
};

export default CourseList;
