import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <div className="logo">
          <Link
            to="/"
            style={{
              color: "#edefef",
              textDecoration: "none",
            }}
          >
            <h2 className="p-0">Expense Tracker</h2>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item" key="1">
              <Link
                style={{
                  color: "#edefef",
                  textDecoration: "none",
                  marginRight: "25px",
                }}
                to="/login"
              >
                <FaSignInAlt className="mx-1" />
                Login
              </Link>
            </li>
            <li className="nav-item" key="2">
              <Link
                style={{ color: "#edefef", textDecoration: "none" }}
                to="/register"
              >
                <FaUser className="mx-1" />
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
