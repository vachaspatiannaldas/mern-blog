import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom"
import axios from "axios"
import Alert from 'react-bootstrap/Alert';

const Home = ({ isLoggedIn }) => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const getUserData = async () => {
        try {
            const res = await axios.get("/getdata", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.status === 401 || !res.data) {
                console.log("error")
            } else {
                setData(res.data.getUser)
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const dltUser = async (id) => {
        try {
            const res = await axios.delete(`/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.status === 401 || !res.data) {
                console.log("error")
            } else {
                getUserData();
                setShow(true);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const shortDesc = (description) => {
        if (description.length > 60) {
            return description.slice(0, 60) + '...';
        }
        return description;
    }

    return (
        <>
            {
                show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    Blog Deleted
                </Alert>
            }
            <div className='container mt-2'>
                <div className="col-md-12" style={{backgroundColor:"#DCDCDC", borderRadius:"10px"}}>
                 <h1 className='text-center m-2 p-2'>Blog app using MERN</h1>
                </div>
                <div className="col-md-12">
                <div className='row d-flex justify-content-between align-iteams-center mt-5'>
                    {data.map((el, i) => (
                        <div key={i} className="col-lg-3 col-md-6 mb-4">
                        <Card  style={{ width: '100%', height: "26rem" }} className="mb-3">
                            <div style={{marginTop:"-8px"}}>
                            <Card.Img variant="top" style={{ width: "100%", height:"200px", textAlign: "center", margin: "auto", }} src={`/uploads/${el.imgpath}`} className='mt-2' />
                            </div>
                            <Card.Body className='text-center'>
                                <Card.Title>{el.title}</Card.Title>
                                <Card.Text>{shortDesc(el.description)}</Card.Text>
                                <p>Posted by <span style={{fontWeight:"650"}}>{el.fname}</span></p>
                                <Button variant="success"><NavLink to={`/blogdetails/${el._id}`} className="text-decoration-none text-light">Read More</NavLink></Button>
                                {isLoggedIn &&<Button variant="danger" className='m-1 col-lg-6 text-center' onClick={() => dltUser(el._id)}>Delete</Button>}
                            </Card.Body>
                        </Card>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}

export default Home;
