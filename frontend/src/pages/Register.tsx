import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {
    name,
    email,
    password,
    password2,
  }: { name: string; email: string; password: string; password2: string } =
    formData;

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
            <FaUser /> Register
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 mt-3">
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mb-1 border border-secondary"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
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
              <Form.Group controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={handleChange}
                  placeholder="Confirm password"
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

export default Register;
