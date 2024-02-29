import EventListItem from './EventListItem';
import { AppEvent } from '../../../types/event.type';

type Props = {
  events: AppEvent[];
};

function EventList({ events }: Props) {
  return (
    <>
      {events.map((ev) => (
        <EventListItem event={ev} key={ev.id} />
      ))}
    </>
  );
}

export default EventList;
