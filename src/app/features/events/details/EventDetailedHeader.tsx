import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { AppEvent } from '../../../types/event';
import { useAppSelector } from '../../../store/store';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFirestore } from '../../../hooks/firestore/useFirestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

type Props = {
  event: AppEvent;
};

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

function EventDetailedHeader({ event }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { update } = useFirestore('events');
  async function toggleAttendance() {
    if (!currentUser) {
      toast.error('Must be logged in to do this');
      return;
    }
    setLoading(true);
    if (event.isGoing) {
      const attendee = event.attendees.find((at) => at.id === currentUser.uid);
      await update(event.id, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser.uid),
      });
      setLoading(false);
    } else {
      await update(event.id, {
        attendees: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        attendeeIds: arrayUnion(currentUser.uid),
      });
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          style={eventImageStyle}
          src={`/categoryImages/${event.category}.jpg`}
          fluid
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {event.isHost ? (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        ) : (
          <Button
            content={event.isGoing ? 'Cancel my place' : 'Join this event'}
            color={event.isGoing ? 'grey' : 'teal'}
            onClick={toggleAttendance}
            loading={loading}
          />
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
