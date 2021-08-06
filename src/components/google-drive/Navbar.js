import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBarComponent() {
    return (
        <Navbar bg='light' expand='lg' className='px-4'>
            <Navbar.Brand as={Link} to='/'>
                UX Hawk Web Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to='/user'>
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
