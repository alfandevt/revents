import { Grid } from 'semantic-ui-react';
import { sampleData } from '../../../api/sampeData';
import EventList from './EventList';
import { useEffect, useState } from 'react';
import { AppEvent } from '../../../types/event.type';

function EventDashboard() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filter</h2>
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
