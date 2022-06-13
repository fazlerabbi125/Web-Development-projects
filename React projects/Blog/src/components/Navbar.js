import { NavLink } from "react-router-dom";

const Navbar = () => {
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
      </ul>
    </div>
  </div>
</nav>
     );
}
 
export default Navbar;