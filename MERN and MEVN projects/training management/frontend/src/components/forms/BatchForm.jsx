import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCourseList } from "../../store/features/courseListSlice";
import { fetchEmployeeList } from "../../store/features/employeeListSlice";

function BatchForm({
  batch,
  submitForm,
  mode,
  courselist,
  isCourseLoading,
  traineelist,
  isTraineeLoading,
  fetchCourseList,
  fetchEmployeeList,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: batch.name || "",
      startDate: batch.startDate
        ? batch.startDate.split("T")[0]
        : new Date().toISOString().split("T")[0],
      endDate: batch.endDate
        ? batch.endDate.split("T")[0]
        : new Date().toISOString().split("T")[0],
      trainees: batch.trainees || [],
      assignedCourses: batch.assignedCourses || [],
    },
  });

  const onSubmit = (data) => {
    if (
      data.trainees &&
      batch &&
      JSON.stringify(data.trainees) === JSON.stringify(batch.trainees)
    )
      data.trainees = undefined;
    if (
      data.assignedCourses &&
      batch &&
      JSON.stringify(data.assignedCourses) ===
      JSON.stringify(batch.assignedCourses)
    )
      data.assignedCourses = undefined;
    submitForm(data);
  };

  React.useEffect(() => {
    fetchCourseList();
    fetchEmployeeList();
  }, []);

  return (
    <section className="card auth__form">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="mb-3">
          <div className="row justify-content-center ">
            <div className="col-auto">
              <label className="col-form-label">Name:</label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                {...register("name", {
                  required: "name is required",
                  minLength: {
                    value: 3,
                    message: "name must be at least 3 characters long.",
                  },
                })}
              />
            </div>
          </div>
          {errors.name && (
            <div className="text-center text-danger fw-bolder">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="row justify-content-center ">
            <div className="col-auto">
              <label className="col-form-label">Start Date:</label>
            </div>
            <div className="col-auto">
              <input
                type="date"
                className="form-control"
                {...register("startDate", {
                  required: "Start date is required",
                  validate: (value) =>
                    value < watch("endDate") ||
                    "Start date should be less than end date",
                })}
              />
            </div>
          </div>
          {errors.startDate && (
            <div className="text-center text-danger fw-bolder">
              {errors.startDate.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="row justify-content-center ">
            <div className="col-auto">
              <label className="col-form-label">End Date:</label>
            </div>
            <div className="col-auto">
              <input
                type="date"
                className="form-control"
                {...register("endDate", {
                  required: "End date is required",
                  validate: (value) =>
                    value > watch("startDate") ||
                    "End date should be greater than start date",
                })}
              />
            </div>
          </div>
          {errors.endDate && (
            <div className="text-center text-danger fw-bolder">
              {errors.endDate.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="col-10 mx-auto">
            <div>
              <label className="col-form-label">Assign Trainees:</label>
            </div>
            {isTraineeLoading ? (
              <h5 className="text-muted text-center">
                Loading trainees <i className="fa fa-spinner fa-spin"></i>
              </h5>
            ) : (
              <div>
                <select
                  className="form-select"
                  multiple
                  {...register("trainees")}
                >
                  {traineelist.length === 0 ? (
                    <option value="" disabled>
                      No trainees found
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Choose trainees
                      </option>
                      {traineelist.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.name} - {item._id}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
          {errors.trainees && (
            <div className="text-center text-danger fw-bolder">
              {errors.trainees.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="col-10 mx-auto">
            <div>
              <label className="col-form-label">Assign Courses:</label>
            </div>
            {isCourseLoading ? (
              <h5 className="text-muted text-center">
                Loading courses <i className="fa fa-spinner fa-spin"></i>
              </h5>
            ) : (
              <div>
                <select
                  className="form-select"
                  multiple
                  {...register("assignedCourses")}
                >
                  {courselist.length === 0 ? (
                    <option value="" disabled>
                      No courses available
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Choose courses
                      </option>
                      {courselist.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.title}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
          {errors.assignedCourses && (
            <div className="text-center text-danger fw-bolder">
              {errors.assignedCourses.message}
            </div>
          )}
        </div>
        <div className="row justify-content-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              className="col-4 btn btn-secondary"
              onClick={() => navigate("/user/batch-list")}
            >
              Back
            </button>
          )}
          <input className="col-4 btn btn-dark" type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
  courselist: state.courseList.data,
  isCourseLoading: state.courseList.isLoading,
  traineelist: state.employeeList.data,
  isTraineeLoading: state.employeeList.isLoading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseList: () => dispatch(fetchCourseList({})),
    fetchEmployeeList: () => dispatch(fetchEmployeeList({ type: "trainee" })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchForm);
