import { Grid } from 'semantic-ui-react';
import { sampleData } from '../../../api/sampeData';
import EventList from './EventList';
import EventForm from '../form/EventForm';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../types/event.type';

type Props = {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectEvent: (value: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

function EventDashboard({
  formOpen,
  selectedEvent,
  setFormOpen,
  selectEvent,
}: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents((prevState) => [...prevState, event]);
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(
      events.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
    selectEvent(null);
    setFormOpen(false);
  }

  function deleteEvent(eventId: string) {
    setEvents(events.filter((ev) => ev.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          deleteEvent={deleteEvent}
          events={events}
          selectEvent={selectEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            selectedEvent={selectedEvent}
            setFormOpen={setFormOpen}
            addEvent={addEvent}
            updateEvent={updateEvent}
            key={selectedEvent ? selectedEvent.id : 'create'}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
