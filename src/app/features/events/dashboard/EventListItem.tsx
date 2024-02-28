import {
  Button,
  Icon,
  Item,
  ItemGroup,
  List,
  Segment,
  SegmentGroup,
} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { AppEvent } from '../../../types/event.type';

type Props = {
  event: AppEvent;
  selectEvent: (value: AppEvent) => void;
  deleteEvent: (value: string) => void;
};

function EventListItem({ event, selectEvent, deleteEvent }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={event.hostPhotoURL || '/user.png'}
            />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {event.date}
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((at) => (
            <EventListAttendee attendee={at} key={at.id} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          color='red'
          floated='right'
          content='Delete'
          onClick={() => deleteEvent(event.id)}
        />
        <Button
          color='teal'
          floated='right'
          content='View'
          onClick={() => selectEvent(event)}
        />
      </Segment>
    </SegmentGroup>
  );
}

export default EventListItem;
