import { Image, List } from 'semantic-ui-react';
import { Attendee } from '../../../types/event';
import { Link } from 'react-router-dom';

type Props = {
  attendee: Attendee;
};

function EventListAttendee({ attendee }: Props) {
  return (
    <List.Item as={Link} to={`/profiles/${attendee.id}`}>
      <Image size='mini' circular src={attendee.photoURL ?? '/user.png'} />
    </List.Item>
  );
}

export default EventListAttendee;
