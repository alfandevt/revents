import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Image, Tab, TabPane } from 'semantic-ui-react';
import { useFirestore } from '../../hooks/firestore/useFirestore';
import { useAppSelector } from '../../store/store';
import { CollectionOptions } from '../../hooks/firestore/types';
import { Profile } from '../../types/profile';
import { actions } from '../events/eventSlice';

type Props = {
  profile: Profile;
};

function ProfileEvents({ profile }: Props) {
  const { loadCollection } = useFirestore('events');
  const { data: events, status } = useAppSelector((state) => state.events);
  const panes = [
    { menuItem: 'Future events', pane: { key: 'future' } },
    { menuItem: 'Past events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ];

  const initialOptions: CollectionOptions = {
    queries: [
      {
        attribute: 'attendeeIds',
        operator: 'array-contains',
        value: profile.id,
      },
      { attribute: 'date', operator: '>=', value: new Date() },
    ],
    sort: { attribute: 'date', order: 'asc' },
  };

  const options = useRef<CollectionOptions>(initialOptions);

  function handleSetQuery(tab: number) {
    let options: CollectionOptions = {} as CollectionOptions;
    switch (tab) {
      case 1:
        options.queries = [
          {
            attribute: 'attendeeIds',
            operator: 'array-contains',
            value: profile.id,
          },
          { attribute: 'date', operator: '>=', value: new Date() },
        ];
        options.sort = { attribute: 'date', order: 'asc' };
        break;
      case 2:
        options.queries = [
          {
            attribute: 'hostUid',
            operator: '==',
            value: profile.id,
          },
          { attribute: 'date', operator: '>=', value: new Date() },
        ];
        options.sort = { attribute: 'date', order: 'asc' };
        break;
      default:
        options = initialOptions;
    }
  }

  useEffect(() => {
    loadCollection(actions, options.current);
  }, [loadCollection, options]);

  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Events' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(_e, data) =>
              handleSetQuery(data.activeIndex as number)
            }
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map((event) => (
              <Card as={Link} to='/' key={event.id}>
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign='center' />
                  <Card.Meta textAlign='center'>
                    <span>{event.date}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </TabPane>
  );
}

export default ProfileEvents;
