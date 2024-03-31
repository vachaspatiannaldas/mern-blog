import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap"; 

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password
      });
      console.log(res.data);
      // Store token in local storage
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      setError("Invalid email or password");
    }
  };

  return (
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '100px' }}>
      <Card.Body>
        <div style={{textAlign:"center"}}>
          <i className="fas fa-user" style={{fontSize:"80px"}}></i>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mt-2">
            <Form.Label>Email</Form.Label>
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
            Login
          </Button>
          </div>
          {error && <p style={{ color: "red", textAlign:"center", marginTop:"2px" }}>{error}</p>} 
        </Form>
        <Card.Text style={{textAlign:"center"}}>
          <Link to={"/register"}>Don't have an account? Sign Up</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Login;
