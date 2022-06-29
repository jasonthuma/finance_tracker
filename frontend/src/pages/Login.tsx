import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password }: { email: string; password: string } = formData;

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="container app-body py-5">
      <div className="container">
        <div className="text-center">
          <h1>
            <FaSignInAlt /> Log In
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 mt-3">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>

              <div className="d-grid my-3">
                <Button variant="secondary">Submit</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
