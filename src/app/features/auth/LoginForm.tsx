import ModalWrapper from '../../common/modals/ModalWrapper';
import { Form, FormButton } from 'semantic-ui-react';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/store';
import { closeModal } from '../../common/modals/modalSlices';
import { signIn } from './authSlice';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: 'onTouched' });
  const dispatch = useAppDispatch();

  function onSubmit(data: FieldValues) {
    dispatch(signIn(data));
    dispatch(closeModal());
  }
  return (
    <ModalWrapper header={'Sign into re-vents'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          defaultValue=''
          placeholder='Email address'
          {...register('email', {
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
          error={
            (errors.email?.type === 'required' && 'Email is required') ||
            (errors.email?.type === 'pattern' && 'Email is invalid')
          }
        />
        <Form.Input
          defaultValue=''
          placeholder='Password'
          {...register('password', { required: true })}
          error={errors.password && 'Password is required'}
        />
        <FormButton
          type='submit'
          content='Login'
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          fluid
          size='large'
          color='teal'
        />
      </Form>
    </ModalWrapper>
  );
}

export default LoginForm;
