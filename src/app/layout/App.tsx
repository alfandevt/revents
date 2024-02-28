import { Container } from 'semantic-ui-react';
import EventDashboard from '../features/events/dashboard/EventDashboard';
import NavBar from './nav/NavBar';
import { useState } from 'react';
import { AppEvent } from '../types/event.type';

function App() {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedvent] = useState<AppEvent | null>(null);

  function handleSelectEvent(event: AppEvent | null) {
    setSelectedvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar onCreateFormOpen={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
      </Container>
    </>
  );
}

export default App;
