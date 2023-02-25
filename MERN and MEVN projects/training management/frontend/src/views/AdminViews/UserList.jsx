import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import paginationButtons from "../../utils/paginationButtons";
import defaultProfile from "../../assets/images/profile.jpg";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeeList } from "../../store/features/employeeListSlice";
import DeleteModal from "../../components/modals/DeleteModal";
import { server_URL } from "../../hooks/useAxios";

function UserList() {
  const dispatch = useDispatch();
  const itemsPerPage = 3;
  const [page, setPage] = React.useState(1);
  const [type, setType] = React.useState("");
  const [modal, setModal] = React.useState({});

  function toggleModal(id) {
    setModal({ ...modal, [id]: !modal[id] });
  }

  const {
    data: employees,
    error,
    isLoading,
    size: total,
  } = useSelector((state) => state.employeeList);

  React.useEffect(() => {
    dispatch(fetchEmployeeList({ page, itemsPerPage, type }));
  }, [page, dispatch, type]);
  React.useEffect(() => {
    setPage(1);
  }, [total]);

  return (
    <Layout>
      <div className="w-25 mx-auto mb-5">
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Employees</option>
          <option value="trainer">Trainers</option>
          <option value="trainee">Trainees</option>
        </select>
      </div>
      {isLoading && (
        <h2 className="text-center">
          Loading <i className="fa fa-spinner fa-spin"></i>
        </h2>
      )}
      {error && <h2 className="text-center text-danger">{error}</h2>}
      {!isLoading && !error && employees && (
        <>
          {employees.length === 0 ? (
            <h2 className="text-center">No employees found</h2>
          ) : (
            <section>
              <div className="card mx-auto w-75 my-5">
                <ul className="list-group list-group-flush">
                  {employees.map((item) => {
                    return (
                      <li className="list-group-item" key={item._id}>
                        <div className="float-end btn-group">
                          <button type="button" className="btn btn-secondary">
                            Actions
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                            id={"dropdownMenuButton" + item._id}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="visually-hidden">
                              Toggle Dropdown
                            </span>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby={"dropdownMenuButton" + item._id}
                          >
                            <Link
                              to={`/admin/${item._id}/edit-user`}
                              state={{ user: item }}
                              className="dropdown-item"
                            >
                              Edit Employee
                            </Link>
                            <li>
                              <span
                                role="button"
                                className="text-danger dropdown-item"
                                onClick={() =>
                                  toggleModal(`delEmployee-${item._id}`)
                                }
                              >
                                Delete{" "}
                              </span>
                            </li>
                          </ul>
                        </div>
                        {modal[`delEmployee-${item._id}`] && (
                          <DeleteModal
                            toggleModal={toggleModal}
                            id={`delEmployee-${item._id}`}
                            url={`/admin/${item._id}/delete-employee`}
                            type={"employee"}
                          />
                        )}

                        <div className="row">
                          <img
                            src={
                              item.photo
                                ? server_URL + item.photo
                                : defaultProfile
                            }
                            alt="Profile"
                            className="mb-2 col-3"
                            style={{ width: "12.5rem", height: "12rem" }}
                          />
                          <div className="col-8">
                            <h3 className="text-break">{item.name} </h3>
                            <div>
                              <span className="text-muted">Employee ID:</span>{" "}
                              {item._id}
                            </div>
                            <div>
                              <span className="text-muted">Email:</span>{" "}
                              {item.email}
                            </div>
                            <div>
                              <span className="text-muted">Gender:</span>{" "}
                              {item.gender}
                            </div>
                            <div>
                              <span className="text-muted">Date of birth:</span>{" "}
                              {new Date(item.birth_date).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="text-muted">Role:</span>{" "}
                              {item.role.charAt(0).toUpperCase() +
                                item.role.slice(1)}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {total > 0 && (
                <nav className="mb-5">
                  <ul className="pagination justify-content-center">
                    {paginationButtons(page, total, itemsPerPage, setPage)}
                  </ul>
                </nav>
              )}
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

export default UserList;
