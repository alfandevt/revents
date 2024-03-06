import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { useEffect } from 'react';
import { actions } from '../eventSlice';
import LoadingComponent from '../../../layout/LoadingComponent';
import { useFirestore } from '../../../hooks/firestore/useFirestore';

function EventDetailedPage() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((ev) => ev.id === id)
  );
  const { status } = useAppSelector((state) => state.events);
  const { loadDocument } = useFirestore('events');

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === 'loading') return <LoadingComponent />;

  return event ? (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar event={event} />
      </Grid.Column>
    </Grid>
  ) : (
    <h1>not found</h1>
  );
}

export default EventDetailedPage;
