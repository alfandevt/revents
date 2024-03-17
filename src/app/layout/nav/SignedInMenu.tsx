import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { useAppSelector } from '../../store/store';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate('/');
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUser?.photoURL || '/user.png'} />
      <Dropdown pointing='top left' text={currentUser?.displayName as string}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvents'
            text='Create event'
            icon='plus'
          />
          <Dropdown.Item
            text='My profile'
            icon='user'
            as={Link}
            to={`/profiles/${currentUser?.uid}`}
          />
          <Dropdown.Item
            text='My account'
            icon='settings'
            as={Link}
            to='/account'
          />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
