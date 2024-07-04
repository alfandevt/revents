import { Header, Menu } from 'semantic-ui-react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useRef, useState } from 'react';
import { QueryOptions } from '../../../hooks/firestore/types';
import { useAppSelector } from '../../../store/store';

type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

function EventFilters({ setQuery }: Props) {
  const startDate = useRef(new Date());
  const { currentUser } = useAppSelector((state) => state.auth);
  const [filter, setFilter] = useState('all');
  const { status } = useAppSelector((state) => state.events);

  function handleSetFilter(filter: string) {
    if (!currentUser?.uid) {
      return;
    }

    let q: QueryOptions[] = [];
    switch (filter) {
      case 'isGoing':
        q = [
          {
            attribute: 'attendeeIds',
            operator: 'array-contains',
            value: currentUser.uid,
          },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      case 'isHost':
        q = [
          {
            attribute: 'hostUid',
            operator: '==',
            value: currentUser.uid,
          },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      default:
        q = [{ attribute: 'date', operator: '>=', value: startDate.current }];
        break;
    }

    setFilter(filter);
    setQuery(q);
  }
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header attached content='Filters' color='teal' />
        <Menu.Item
          onClick={() => handleSetFilter('all')}
          active={filter === 'all'}
          content='All events'
          disabled={status === 'loading'}
        />
        <Menu.Item
          onClick={() => handleSetFilter('isGoing')}
          active={filter === 'all'}
          disabled={status === 'loading'}
          content="I'm going"
        />
        <Menu.Item
          onClick={() => handleSetFilter('isHost')}
          active={filter === 'all'}
          disabled={status === 'loading'}
          content="I'm hosting"
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select Date' />
      <Calendar
        onChange={(date) => {
          startDate.current == (date as Date);
          handleSetFilter(filter);
        }}
        value={startDate.current}
      />
    </>
  );
}

export default EventFilters;
