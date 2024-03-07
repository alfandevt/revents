import { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useFirestore } from '../../hooks/firestore/useFirestore';
import { useAppDispatch } from '../../store/store';
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { Timestamp } from 'firebase/firestore';
import { closeModal } from '../../common/modals/modalSlices';

function SocialLogin() {
  const [status, setStatus] = useState<{
    loading: boolean;
    provider: string | null;
  }>({
    loading: false,
    provider: null,
  });

  const { set } = useFirestore('profiles');
  const dispatch = useAppDispatch();

  async function handleSocialLogin(selectedProvider: string) {
    setStatus({ loading: true, provider: selectedProvider });
    let provider: AuthProvider;
    if (selectedProvider === 'github') {
      provider = new GithubAuthProvider();
    } else if (selectedProvider === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      return;
    }
    try {
      if (provider) {
        const userCreds = await signInWithPopup(auth, provider);
        console.log(userCreds);
        if (
          userCreds.user.metadata.creationTime ===
          userCreds.user.metadata.lastSignInTime
        ) {
          await set(userCreds.user.uid, {
            displayName: userCreds.user.displayName,
            email: userCreds.user.email,
            createdAt: Timestamp.now(),
            photoURL: userCreds.user.photoURL,
          });
        }
        dispatch(closeModal());
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStatus({ loading: false, provider: null });
    }
  }
  return (
    <>
      <Button
        type='button'
        fluid
        color='black'
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === 'github'}
        onClick={() => handleSocialLogin('github')}
      >
        <Icon name='github' /> Login with Github
      </Button>
      <Button
        type='button'
        fluid
        color='google plus'
        style={{ marginBottom: 10 }}
        loading={status.loading && status.provider === 'google'}
        onClick={() => handleSocialLogin('google')}
      >
        <Icon name='google' /> Login with Google
      </Button>
    </>
  );
}

export default SocialLogin;
