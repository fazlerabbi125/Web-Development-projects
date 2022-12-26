//One of many components to nest inside root component
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <NavbarWrapper>
      <nav className="navbar">
        <h1 className="navbar-brand">My Blog</h1>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <Link
            to="/create"
            className="btn--red"
            style={{
              color: "white",
              borderRadius: "8px",
            }}
          >
            Add Post
          </Link>
        </div>
      </nav>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  .navbar {
    padding: 20px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    border-bottom: 1px solid #f2f2f2;
  }

  .navbar-brand {
    color: #f1356d;
  }

  .nav-links {
    margin-left: auto;
  }

  .nav-links > a {
    margin-left: 16px;
    text-decoration: none;
    font-weight: bold;
    padding: 6px;
    color: #0a0a0a;
  }

  .nav-links > a.active {
    color: #3d65a6;
  }

  .nav-links > a:hover {
    color: #f1356d;
  }
`;

export default Navbar;
