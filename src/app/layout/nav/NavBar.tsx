import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutButtons from './SignedOutButtons';
import { useAppSelector } from '../../store/store';
import { sampleData } from '../../api/sampeData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

function NavBar() {
  const { authenticated } = useAppSelector((state) => state.auth);

  function seedData() {
    sampleData.forEach(async (event) => {
      const { id, ...rest } = event;
      await setDoc(doc(db, 'events', id), rest);
    });
  }
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
        {import.meta.env.DEV && (
          <MenuItem>
            <Button
              inverted
              color='teal'
              content='Seed Data'
              onClick={seedData}
            />
          </MenuItem>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}
      </Container>
    </Menu>
  );
}

export default NavBar;
