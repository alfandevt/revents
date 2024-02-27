import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

type Props = {
  setFormOpen: (value: boolean) => void;
};

function NavBar({ setFormOpen }: Props) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <MenuItem header>
          <img src='/logo.png' alt='logo' />
          Re-Vents
        </MenuItem>
        <MenuItem name='Events' />
        <MenuItem>
          <Button
            floated='right'
            positive
            inverted
            content='Create Event'
            onClick={() => setFormOpen(true)}
          />
        </MenuItem>
        <MenuItem position='right'>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Register'
            style={{ marginLeft: '0.5em' }}
          />
        </MenuItem>
      </Container>
    </Menu>
  );
}

export default NavBar;
