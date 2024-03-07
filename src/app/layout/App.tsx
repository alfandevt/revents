import { Container } from 'semantic-ui-react';
import NavBar from './nav/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ModalManager from '../common/modals/ModalManager';
import { useAppDispatch } from '../store/store';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { logOut, signIn } from '../features/auth/authSlice';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next(user) {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logOut());
        }
      },
      error(error) {
        console.log(error);
      },
      complete() {},
    });
  }, [dispatch]);

  return (
    <>
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <ModalManager />
          <NavBar />
          <Container className='main'>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
