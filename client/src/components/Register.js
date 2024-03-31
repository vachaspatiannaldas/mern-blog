import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8005/register", {
        name,
        email,
        password
      });
      console.log(res.data);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: ""
      });
      setSuccessMessage("User registered successfully");
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage("Registration failed. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '100px' }}>
      <Card.Body>
        <div style={{textAlign:"center"}}>
          <i className="fa-regular fa-user" style={{fontSize:"80px"}}></i>
        </div>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicName" className="mt-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mt-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit" className="mt-2">
            Register
          </Button>
          </div>
          {successMessage && <p style={{ color: "green", textAlign:"center" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red", textAlign:"center" }}>{errorMessage}</p>}
        </Form>
        <Card.Text style={{textAlign:"center"}}>
          <Link to={"/login"}>Already have an account? Sign In</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Register;
