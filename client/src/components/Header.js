import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Header = ({ isLoggedIn, handleLogout }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">My Blog</NavLink>
                    <Nav className="ml-auto">
                        {isLoggedIn ? (
                            <>
                                <Button variant="light" onClick={handleLogout} className='m-1'>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></Button>
                                <Button variant="primary" className='m-1'><NavLink to="/blog" className="text-decoration-none text-light">Add Blog</NavLink></Button>
                            </>
                        ) : (
                            <Button variant="secondary"><NavLink to="/login" className="text-decoration-none text-light mx-2">Login <i class="fa fa-sign-in" aria-hidden="true"></i></NavLink></Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
