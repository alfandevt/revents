import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { createId } from '@paralleldrive/cuid2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { createEvent, updateEvent } from '../eventSlice';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EventForm() {
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.events.find((ev) => ev.id === id)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  function onSubmit(data: FieldValues) {
    id = id ?? createId();
    if (event) {
      dispatch(updateEvent({ ...event, ...data, date: data.date.toString() }));
    } else {
      dispatch(
        createEvent({
          ...data,
          id,
          hostedBy: 'Bob',
          attendees: [],
          hostPhotoURL: '',
          date: data.date.toString(),
        })
      );
    }
    navigate(`/events/${id}`);
  }

  return (
    <Segment clearing>
      <Header content={'Event detail'} sub color='teal' />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          type='text'
          defaultValue={event?.title || ''}
          placeholder='Event Title'
          {...register('title', { required: true })}
          error={errors.title && 'Title is required'}
        />
        <Controller
          name='category'
          control={control}
          rules={{ required: 'Category is required' }}
          defaultValue={event?.category || ''}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder='Category'
              clearable
              {...field}
              onChange={(_, d) =>
                setValue('category', d.value, { shouldValidate: true })
              }
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.TextArea
          type='text'
          defaultValue={event?.description || ''}
          placeholder='Description'
          {...register('description', { required: 'Description is required' })}
          error={errors.description && errors.description.message}
        />

        <Header content='Location details' sub color='teal' />
        <Form.Input
          type='text'
          defaultValue={event?.city || ''}
          placeholder='City'
          {...register('city', { required: 'City is required' })}
          error={errors.city && errors.city.message}
        />

        <Form.Input
          type='text'
          defaultValue={event?.venue || ''}
          placeholder='Venue'
          {...register('venue', { required: 'Venue is required' })}
          error={errors.venue && errors.venue.message}
        />

        <Form.Field>
          <Controller
            name='date'
            control={control}
            rules={{ required: 'Date is required' }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue('date', value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption='time'
                dateFormat={'MMM d, yyyy h:mm aa'}
                placeholderText='Event date and times'
              />
            )}
          />
        </Form.Field>

        {/* <Form.Input
          type='date'
          defaultValue={event?.date || ''}
          placeholder='Date'
          as={DatePicker}
          {...register('date', { required: 'Date is required' })}
          error={errors.date && errors.date.message}
        /> */}

        <Button
          type='submit'
          floated='right'
          positive
          content='Submit'
          disabled={!isValid}
          loading={isSubmitting}
        />
        <Button
          as={Link}
          to='/events'
          type='submit'
          floated='right'
          content='Cancel'
          disabled={isSubmitting}
        />
      </Form>
    </Segment>
  );
}

export default EventForm;
