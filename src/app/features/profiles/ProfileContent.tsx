import { Tab, TabPane } from 'semantic-ui-react';
import ProfileAbout from './ProfileAbout';
import { Profile } from '../../types/profile';
import ProfilePhotos from './ProfilePhotos';
import ProfileEvents from './ProfileEvents';

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <ProfileEvents profile={profile}/> },
    { menuItem: 'Followers', render: () => <TabPane>Followers</TabPane> },
    { menuItem: 'Following', render: () => <TabPane>Following</TabPane> },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
}

export default ProfileContent;
