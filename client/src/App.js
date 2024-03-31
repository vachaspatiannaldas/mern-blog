import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Clear the token and logout
        setIsLoggedIn(false);
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
                <Route path='/blog' element={<Blog/>} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/register' element={<Register />} />
                <Route path='/blogdetails/:id' element={isLoggedIn ? <BlogDetails /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
