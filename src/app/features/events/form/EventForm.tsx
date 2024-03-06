import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppEvent } from '../../../types/event.type';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useFirestore } from '../../../hooks/firestore/useFirestore';
import { useEffect } from 'react';
import { actions } from '../eventSlice';
import LoadingComponent from '../../../layout/LoadingComponent';

function EventForm() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data?.find((ev) => ev.id === id)
  );
  const { status } = useAppSelector((state) => state.events);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    async defaultValues() {
      if (event) return { ...event, date: new Date(event.date) };
    },
  });
  const { loadDocument, create, update } = useFirestore('events');

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  async function updateEvent(data: AppEvent) {
    if (!event) return;
    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }

  async function createEvent(data: FieldValues) {
    const newEventRef = await create({
      ...data,
      hostedBy: 'Bob',
      attendees: [],
      hostPhotoURL: '',
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
    return newEventRef;
  }

  async function handleCancelToggle(event: AppEvent) {
    await update(event.id, { isCancelled: !event.isCancelled });
    toast.success(
      `Event has been ${event.isCancelled ? 'Scheduled' : 'Cancelled'}`
    );
  }

  async function onSubmit(data: FieldValues) {
    try {
      if (event) {
        await updateEvent({ ...event, ...data });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  if (status === 'loading') return <LoadingComponent />;

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

        {event && (
          <Button
            type='button'
            floated='left'
            color={event.isCancelled ? 'green' : 'red'}
            onClick={() => handleCancelToggle(event)}
            content={event.isCancelled ? 'Schedule' : 'Cancel'}
          />
        )}

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
