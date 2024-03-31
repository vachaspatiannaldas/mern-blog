import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "react-bootstrap"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [fname, setFName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setdata = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fname':
        setFName(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  }
  

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  }

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);
    formData.append("title", title);
    formData.append("description", description);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    try {
      const res = await axios.post("/blog", formData, config);

      if (res.status === 201) {
        navigate("/");
      } else {
        setError("Error occurred while registering user.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); 
      } else {
        setError("Error occurred while adding blog.");
      }
    }
  }

  return (
    <div className="container mt-3">
          <Card style={{ width: '19rem', margin: 'auto', marginTop: '60px' }}>
      <Card.Body>
      <div style={{textAlign:"center"}}>
          <i className="fas fa-file" style={{fontSize:"80px"}}></i>
        </div>
      {error && <p>{error}</p>}
      <Form className='mt-3' onSubmit={addUserData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author Name</Form.Label>
          <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name='title' onChange={setdata} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name='description' onChange={setdata} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
        </Form.Group>
        <div style={{textAlign:"center"}}>
        <Button variant="primary" type="submit">
          Add Blog
        </Button>
        </div>
      </Form>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Blog;
