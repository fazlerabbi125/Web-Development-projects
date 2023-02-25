import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../store/features/userSlice'

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authUser.userData);
  const userLogout = () => {
    dispatch(logoutUser());
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5" >
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            {auth && auth.role === 'admin' && (
              <>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Training Users
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link to="/admin/create-user" className="dropdown-item">
                        Create Employee
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/userlist" className="dropdown-item">
                        View Employees
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Courses
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link to="/admin/create-course" className="dropdown-item">
                        Create Course
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/courselist" className="dropdown-item">
                        View Courses
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Batches
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link to="/admin/create-batch" className="dropdown-item">
                        Create Batch
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/batch-list" className="dropdown-item">
                        View Batches
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {auth && auth.role === 'trainer' && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/trainer/courselist"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Your Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user/batch-list"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Your Training Batches
                  </NavLink>
                </li>
              </>
            )}
            {auth && auth.role === 'trainee' && (
              <li className="nav-item">
                <NavLink
                  to="/user/batch-list"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Your Training Batches
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {auth && (
              <li className="nav-item dropdown ">
                <span className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth.name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                  <li className="nav-item">
                    <Link
                      to={`/user/${auth._id}`}
                      className="dropdown-item">
                      Your Profile
                    </Link>
                  </li>
                  <li onClick={userLogout}>
                    <button className="dropdown-item">Logout</button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}