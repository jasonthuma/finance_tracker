import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { login, resetAuthResponse } from "../redux/auth/authSlice";
import { LoginUser } from "../redux/auth/models/LoginUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const [alertText, setAlertText] = useState("");

  const dispatch = useAppDispatch();
  const { user, authLoading, authSuccess, authError, authMessage } =
    useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (authError) {
      setAlertText(authMessage);
      dispatch(resetAuthResponse());
    }

    if (authSuccess || user) {
      navigate("/");
    }
  }, [user, authError, authSuccess, authMessage, navigate, dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setAlertText("Please fill out all fields");

      return;
    }

    const loginUser: LoginUser = {
      email,
      password,
    };
    dispatch(login(loginUser));
  };

  if (authLoading) {
    return (
      <div className="container app-body py-5">
        <div className="container">
          <div className="text-center">
            <h1>
              <Spinner animation="border" /> Logging In
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container app-body py-5">
      <div className="container">
        <div className="text-center">
          <h1>
            <FaSignInAlt /> Log In
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-6 mt-3">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>

              <div className="d-grid my-3">
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            {alertText && <Alert variant="danger">{alertText}</Alert>}
            <div className="text-center">
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
