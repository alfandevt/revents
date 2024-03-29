import ModalWrapper from '../../common/modals/ModalWrapper';
import { Divider, Form, FormButton, Label } from 'semantic-ui-react';
import { FieldValues, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAppDispatch } from '../../store/store';
import { closeModal } from '../../common/modals/modalSlices';
import SocialLogin from './SocialLogin';

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: 'onTouched' });
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
    } catch (error: any) {
      setError('root.serverError', { type: '400', message: error.message });
    }
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
          type='password'
          {...register('password', { required: true })}
          error={errors.password && 'Password is required'}
        />
        {errors.root && (
          <Label
            basic
            color='red'
            style={{ display: 'block', marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}
        <FormButton
          type='submit'
          content='Login'
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          fluid
          size='large'
          color='teal'
        />
        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Form>
    </ModalWrapper>
  );
}

export default LoginForm;
