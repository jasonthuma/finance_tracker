import {
  FaChartPie,
  FaListAlt,
  FaSignInAlt,
  FaSignOutAlt,
  FaUniversity,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux/hooks";
import { resetAuth } from "../redux/auth/authSlice";
import { resetTransactions } from "../redux/transactions/transactionSlice";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetTransactions());
    navigate("/");
  };

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
            <h2 className="p-0">
              <FaUniversity className="mx-1" /> Expense Tracker
            </h2>
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
            {!user && (
              <li className="nav-item mx-1" key="1">
                <Link
                  style={{
                    color: "#edefef",
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  <FaSignInAlt className="mx-1" />
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item mx-1" key="2">
                <Link
                  style={{ color: "#edefef", textDecoration: "none" }}
                  to="/register"
                >
                  <FaUser className="mx-1" />
                  Register
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item mx-1" key="3">
                <Link
                  style={{ color: "#edefef", textDecoration: "none" }}
                  to="/history"
                >
                  <FaListAlt className="mx-1" />
                  History
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item mx-1" key="4">
                <Link
                  style={{ color: "#edefef", textDecoration: "none" }}
                  to="/graphs"
                >
                  <FaChartPie className="mx-1" />
                  Graphs
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item mx-1" key="5">
                <button
                  className="btn btn-link p-0"
                  style={{ color: "#edefef", textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mx-1" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
