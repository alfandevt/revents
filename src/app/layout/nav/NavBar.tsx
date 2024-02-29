import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import { useState } from 'react';
import SignedOutButtons from './SignedOutButtons';

function NavBar() {
  const [auth, setAuth] = useState(false);
  return (
    <Menu inverted fixed='top'>
      <Container>
        <MenuItem header as={NavLink} to='/'>
          <img src='/logo.png' alt='logo' />
          Re-Vents
        </MenuItem>
        <MenuItem name='Events' as={NavLink} to='/events' />
        <MenuItem name='Scratch' as={NavLink} to='/scratch' />
        <MenuItem>
          <Button
            floated='right'
            positive
            inverted
            content='Create Event'
            as={NavLink}
            to='/createEvent'
          />
        </MenuItem>
        {auth ? (
          <SignedInMenu setAuth={setAuth} />
        ) : (
          <SignedOutButtons setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
}

export default NavBar;
