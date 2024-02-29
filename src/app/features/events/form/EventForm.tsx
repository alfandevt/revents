import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { AppEvent } from '../../../types/event.type';
import { createId } from '@paralleldrive/cuid2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { createEvent, updateEvent } from '../eventSlice';

function EventForm() {
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((ev) => ev.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initalValues: AppEvent = event ?? {
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
    id = id ?? createId();
    if (event) {
      dispatch(updateEvent({ ...event, ...values }));
    } else {
      dispatch(
        createEvent({
          ...values,
          id,
          hostedBy: 'Bob',
          attendees: [],
          hostPhotoURL: '',
        } as AppEvent)
      );
    }
    navigate(`/events/${id}`);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header content={event ? 'Update Event' : 'Create Event'} />
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
          as={Link}
          to='/events'
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}

export default EventForm;
