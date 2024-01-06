import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const handleSave = async () => {
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

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1 className='text-center'>Vguru</h1>
            <h2 className='mb-4 text-center text-primary fw-bold text-uppercase'>{user.role} Dashboard</h2>
            {isEditing ? (
                <form onSubmit={handleSave} className="border p-4 rounded shadow">
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
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            ) : (
                <div className="border p-4 rounded shadow">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Subjects:</strong> {user.subjects?.join(', ')}</p>
                    <button onClick={handleEdit} className="btn btn-outline-primary">Edit</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
