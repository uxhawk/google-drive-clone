import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './authentication/CenteredContainer';
import Navbar from '../components/google-drive/Navbar'

export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    // const history = useHistory();
    
    async function handleLogout() {
        setError('');

        try {
            await logout();
        } catch {
            setError('Failed to sign out');
        }
    }
    
    return (
        <>
        <Navbar />
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className='mb-4'>
                        <strong>Username: </strong> {currentUser.displayName}
                    </div>
                    <div className='mb-2'>
                        <strong>Email: </strong> {currentUser.email}
                    </div>
                    

                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
            <Button variant='link' onClick={handleLogout}>Sign Out</Button>
            </div> 
        </CenteredContainer>
        </>
    )
    
}
