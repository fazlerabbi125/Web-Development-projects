import { NavLink,useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {logoutUser} from '../store/features/userSlice'

const Navbar = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const auth= useSelector((state) => state.authUser.userData);
  const userLogout=()=>{
    dispatch(logoutUser());
    navigate('/');
  }
    return ( 
<nav className="navbar navbar-expand-lg navbar-dark  mt-2 mb-5" style={{backgroundColor:"rgb(125, 55, 235)"}}>
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
        
        <li className="nav-item">
        <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>
        {auth && auth.isAdmin && (
        <li className="nav-item">
        <NavLink
            to="/movie-series/create"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Create
          </NavLink>
        </li>
        )}
        {auth  && (
        <li className="nav-item">
        <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Watchlist
          </NavLink>
        </li>
        )}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {!auth && (
          <li className="nav-item">
          <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </li>
        )}
      
        {!auth && (
          <li className="nav-item">
          <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Register
            </NavLink>
          </li>
        )}
        {auth && (
          <li className="nav-item dropdown ">
          <span className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth.name}
          </span>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
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
 
export default Navbar;