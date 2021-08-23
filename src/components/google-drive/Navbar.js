import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Navbar, Alignment, Button, Menu, MenuItem } from '@blueprintjs/core';
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function NavBarComponent() {
    const { logout } = useAuth();

    const menu = (
      <>
        <Menu>
          <Link to='/workouts'>
            <MenuItem text="Workouts" />
          </Link>
          <MenuItem text="Profile" />
          <MenuItem text="Sign Out" />
        </Menu>
      </>
    );

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
          <Link to="/" className="button-link navbar-link">
            <Navbar.Heading>UX Hawk Files</Navbar.Heading>
          </Link>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {/* <Link to='/user' className='button-link'>
                    <Button className="bp3-minimal" icon="user" text="Profile" />
                </Link>
                <Button className="bp3-minimal" icon="log-out" text="Sign Out" onClick={handleLogout} /> */}
          <Popover2
            interactionKind="hover"
            popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
            placement="auto"
            content={menu}
            renderTarget={({ isOpen, ref, ...targetProps }) => (
              <Button
                {...targetProps}
                elementRef={ref}
                minimal={true}
                icon={'menu'}
              />
            )}
          />
        </Navbar.Group>
      </Navbar>
    );
}
