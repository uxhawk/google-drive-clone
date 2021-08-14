import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


export default function NavBarComponent() {
    const { logout, currentUser } = useAuth();



    async function handleLogout() {
        try {
            await logout();
        } catch {
            // setError('Failed to sign out');
        }
    }

    return (
        <Navbar bg='light' expand='lg' className='px-4'>
            <Navbar.Brand as={Link} to='/'>
                UX Hawk Web Drive
            </Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <Nav.Link as={Link} to='/user'> 
                        <FontAwesomeIcon icon={faUserCircle} /> {currentUser.displayName}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
