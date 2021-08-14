import React, {  } from 'react';
// import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './authentication/CenteredContainer';
import Navbar from '../components/google-drive/Navbar'
import '@blueprintjs/core/lib/css/blueprint.css';
import { Card, Elevation, Button, Icon, IconSize } from '@blueprintjs/core';


export default function Dashboard() {
    const { currentUser } = useAuth();
    
    return (
        <>
        <Navbar />
        <CenteredContainer>
            <Card elevation={Elevation.THREE}> 
                <div className='profile-edit'>
                    <div style={{display: 'inherit', alignItems: 'center'}}>
                        <Icon icon="user" size={40} style={{marginRight: '10px'}}  />
                        <h2 className='bp3-heading'>Profile</h2>
                    </div>
                    <Link to='/update-profile' className='button-link'>
                        <Button className="bp3-minimal" icon="edit" />
                    </Link>
                </div>
                <p><strong>Username: </strong> {currentUser.displayName}</p>
                <p><strong>Email: </strong> {currentUser.email}</p>
            </Card>
        </CenteredContainer>
        </>
    )
    
}
