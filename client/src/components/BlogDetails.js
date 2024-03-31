import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { NavLink, useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"

const BlogDetails = () => {
    const { id } = useParams(); 
    const [blog, setBlog] = useState(null); 
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // fetch details of the blog post by ID
        const fetchBlogDetails = async () => {
            try {
                const res = await axios.get(`/${id}`);
                setBlog(res.data.blog);
            } catch (error) {
                console.log("Error fetching blog details:", error);
            }
        };
        
        fetchBlogDetails(); 
    }, [id]); 


    return (
        <>
           
            <div className='container mt-2'>
                {blog ? (
                    <div>
                    <h2 className='text-center m-3' style={{fontFamily:"source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif"}}>{blog.title}</h2>
                    <Card style={{ width: '100%', height: "100%" }} className="mb-3">
                        <Card.Img variant="top" src={`/uploads/${blog.imgpath}`} className="img-fluid" style={{ maxWidth: '600px', margin: 'auto', marginTop:"5px" }}  />

                        <Card.Body className='text-center'>
                            {isDesktop ? (
                                    <h5 style={{ textAlign: 'justify' }}>{blog.description}</h5>
                                ) : (
                                    <p style={{ fontSize: '15px', textAlign: 'justify', fontFamily:"source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif" }}>{blog.description}</p>
                                )}
                            <Card.Text>Posted by <span style={{fontWeight:"650"}}>{blog.fname}</span>  <br /> Date: {moment(blog.date).format("L")}</Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogDetails;
