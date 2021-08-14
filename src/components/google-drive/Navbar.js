import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


export default function NavBarComponent() {
    const { currentUser } = useAuth();

    return (
        <Navbar bg='light' expand='lg' className='px-4'>
            <Navbar.Brand as={Link} to='/'>
                UX Hawk Web Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to='/user'>
                    <FontAwesomeIcon icon={faUserCircle} /> {currentUser.displayName}
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
