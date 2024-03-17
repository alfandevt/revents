import { useEffect, useState } from 'react';
import {
  TabPane,
  Grid,
  Header,
  Button,
  Card,
  Image,
  ButtonGroup,
} from 'semantic-ui-react';
import { Photo, Profile } from '../../types/profile';
import { auth, storage } from '../../config/firebase';
import PhotoUpload from './PhotoUpload';
import { useAppSelector } from '../../store/store';
import { useFirestore } from '../../hooks/firestore/useFirestore';
import { action } from './photoSlice';
import { updateProfile } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';

type Props = {
  profile: Profile;
};

function ProfilePhotos({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const { data: photos, status } = useAppSelector((state) => state.photo);
  const { loadCollection, remove } = useFirestore(
    `profiles/${profile.id}/photos`
  );
  const { update } = useFirestore('profiles');

  useEffect(() => {
    loadCollection(action);
  }, [loadCollection]);

  async function handleSetMain(photo: Photo) {
    await update(profile.id, {
      photoURL: photo.url,
    });

    await updateProfile(auth.currentUser!, {
      photoURL: photo.url,
    });
  }

  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='photo'
            content={`About ${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUpload profile={profile} setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <ButtonGroup>
                      <Button
                        basic
                        color='green'
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleSetMain(photo)}
                      >
                        Main
                      </Button>
                      <Button
                        basic
                        color='red'
                        icon='trash'
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleDeletePhoto(photo)}
                      />
                    </ButtonGroup>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  );
}

export default ProfilePhotos;
