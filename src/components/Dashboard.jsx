import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '', email: '', role: '', subjects: '' });
    const API_URL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : 'https://vguru-server.vercel.app';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
                setEditData({ name: response.data.name, email: response.data.email, role: response.data.role, subjects: response.data.subjects?.join(', ') });
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error appropriately
            }
        };
        fetchUser();
    }, [API_URL]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async e => {
        e.preventDefault();
        try {
            const updatedUser = { ...editData, subjects: editData.subjects.split(',').map(subject => subject.trim()) };
            const response = await axios.patch(`${API_URL}/api/users/update`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error appropriately
        }
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    if (!user) return <div className="text-center mt-5"><strong>Loading...</strong></div>;

    return (
        <div className="container mt-5">
            <h1 className='text-center mb-3'>Vguru</h1>
            <h2 className='mb-4 text-center text-primary fw-bold text-uppercase'>{user.role} Dashboard</h2>
            
            <div className='d-flex flex-column align-items-center'>

<div className='d-flex flex-row gap-3 align-items-center'>

            <div className='mb-4' style={{backgroundColor: 'teal', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', color: 'white'}}>
                    <Link to={'/game/wordmatch'} className='' style={{color: 'white', textDecoration: 'none'}}>Word Match Game</Link>
                </div>
            <div className='mb-4' style={{backgroundColor: 'teal', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', color: 'white'}}>
                    <Link to={'/game/shapematch'} className='' style={{color: 'white', textDecoration: 'none'}}>Shape Match Game</Link>
                </div>
            <div className='mb-4' style={{backgroundColor: 'teal', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', color: 'white'}}>
                    <Link to={'/game/colormatch'} className='' style={{color: 'white', textDecoration: 'none'}}>Shape Match Game</Link>
                </div>

                </div>



                {isEditing ? (
                    <form onSubmit={handleSave} className="border p-4 rounded shadow w-100 w-md-50">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="name"
                                value={editData.name} 
                                onChange={handleChange} 
                                name="name" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control"
                                id="email"
                                value={editData.email} 
                                onChange={handleChange} 
                                name="email" 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjects" className="form-label">Subjects</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="subjects"
                                value={editData.subjects} 
                                onChange={handleChange} 
                                name="subjects" 
                                placeholder="Subjects (comma separated)" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Save</button>
                    </form>
                ) : (
                    <div className="border p-4 rounded shadow w-100 w-md-50 text-center">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Subjects:</strong> {user.subjects?.join(', ')}</p>
                        <button onClick={handleEdit} className="btn btn-outline-primary w-100 mt-3">Edit</button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Dashboard;
