import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const user = { email, password };
            const config = { headers: { 'Content-Type': 'application/json' } };
            const body = JSON.stringify(user);
            const response = await axios.post(`${API_URL}/api/users/login`, body, config);
            // const response = await axios.post('http://localhost:5000/api/users/login', body, config);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error(error.response.data); // Handle errors
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
