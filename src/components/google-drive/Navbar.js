import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';




export default function NavBarComponent() {
    const { logout } = useAuth();



    async function handleLogout() {
        try {
            await logout();
        } catch {
            // setError('Failed to sign out');
        }
    }

    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
            <Link to='/' className='button-link navbar-link'>
                <Navbar.Heading>UX Hawk Files</Navbar.Heading>
            </Link> 
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Link to='/user' className='button-link'>
                    <Button className="bp3-minimal" icon="user" text="Profile" />
                </Link>
                <Button className="bp3-minimal" icon="log-out" text="Sign Out" onClick={handleLogout} />
            </Navbar.Group>
        </Navbar>
    )
}
