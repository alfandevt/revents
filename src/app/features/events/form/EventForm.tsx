import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent } from '../../../types/event.type';
import { createId } from '@paralleldrive/cuid2';

type Props = {
  setFormOpen: (value: boolean) => void;
  addEvent: (value: AppEvent) => void;
  selectedEvent: AppEvent | null;
  updateEvent: (value: AppEvent) => void;
};

function EventForm({
  setFormOpen,
  addEvent,
  selectedEvent,
  updateEvent,
}: Props) {
  const initalValues: AppEvent = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
    id: '',
    hostedBy: '',
    hostPhotoURL: '',
    attendees: [],
  };
  const [values, setValues] = useState(initalValues);

  function onSubmit() {
    if (selectedEvent) {
      updateEvent({ ...selectedEvent, ...values });
    } else {
      addEvent({
        ...values,
        id: createId(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '',
      });
    }

    setFormOpen(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Update Event' : 'Create Event'} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            type='text'
            name='title'
            value={values.title}
            placeholder='Event Title'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='category'
            value={values.category}
            placeholder='Category'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='description'
            value={values.description}
            placeholder='Description'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='city'
            value={values.city}
            placeholder='City'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='venue'
            value={values.venue}
            placeholder='Venue'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            name='date'
            value={values.date}
            placeholder='Date'
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button type='submit' floated='right' positive content='Submit' />
        <Button
          type='submit'
          floated='right'
          content='Cancel'
          onClick={() => setFormOpen(false)}
        />
      </Form>
    </Segment>
  );
}

export default EventForm;
