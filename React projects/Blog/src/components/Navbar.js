//One of many components to nest inside root component
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>My Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          New Blog
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
