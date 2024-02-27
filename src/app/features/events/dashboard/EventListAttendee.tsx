import { Image, List } from 'semantic-ui-react';
import { Attendee } from '../../../types/event.type';

type Props = {
  attendee: Attendee;
};

function EventListAttendee({ attendee }: Props) {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} />
    </List.Item>
  );
}

export default EventListAttendee;
