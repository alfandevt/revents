import { Segment, Item, Label } from 'semantic-ui-react';
import { AppEvent } from '../../../types/event';
import { Link } from 'react-router-dom';

type Props = {
  event: AppEvent;
};

function EventDetailedSidebar({ event }: Props) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {event.attendees.length > 0
          ? `${event.attendees.length} People Going`
          : 'No Attendee Yet'}
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {event.attendees.map((at) => (
            <Item key={at.id} style={{ position: 'relative' }}>
              {event.hostUid === at.id && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Host
                </Label>
              )}
              <Item.Image size='tiny' src={at.photoURL ?? '/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as={Link} to={`/profiles/${at.id}`}>
                  <span>{at.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}

export default EventDetailedSidebar;
