import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Navbar from './components/navbar';
import Register from './components/register';
import Users from './components/users';

class App extends Component {
    state = {}
    render() {
        return (
            <>
                <Navbar />
                <div className='container mt-3'>
                    <Routes>
                        <Route path='/users' element={<Users />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/' exact element={<Home />} />
                    </Routes>
                </div>
            </>
        );
    }
}

export default App;