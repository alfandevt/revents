import EventListItem from './EventListItem';
import { AppEvent } from '../../../types/event.type';

type Props = {
  events: AppEvent[];
  selectEvent: (value: AppEvent) => void;
  deleteEvent: (value: string) => void;
};

function EventList({ events, selectEvent, deleteEvent }: Props) {
  return (
    <>
      {events.map((ev) => (
        <EventListItem
          event={ev}
          key={ev.id}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}

export default EventList;
