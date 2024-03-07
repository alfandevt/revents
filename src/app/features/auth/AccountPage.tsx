import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  FormButton,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import { useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

function AccountPage() {
  const {
    register,
    getValues,
    watch,
    trigger,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const { currentUser } = useAppSelector((state) => state.auth);

  const password1 = watch('password1');
  const password2 = watch('password2');

  useEffect(() => {
    if (password2) trigger('password2');
  }, [password1, password2, trigger]);

  async function onSubmit(data: FieldValues) {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, data.password1);
        toast.success('Password updated successfully');
        reset();
      }
    } catch (error: any) {
      setError('root.serverError', { message: error.message });
    }
  }

  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      {currentUser?.providerId?.includes('password') && (
        <div>
          <Header color='teal' sub content='Change Password' />
          <p>Use this form to change your password</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
              type='password'
              defaultValue=''
              placeholder='Password'
              {...register('password1', { required: true })}
              error={errors.password1 && 'Password is required'}
            />
            <Form.Input
              type='password'
              defaultValue=''
              placeholder='Confirm Password'
              {...register('password2', {
                required: true,
                validate: {
                  passwordMatch: (value) =>
                    value === getValues().password1 ||
                    'Password does not match',
                },
              })}
              error={
                (errors.password2?.type === 'required' &&
                  'Confirm Password is required') ||
                (errors.password2?.type === 'passwordMatch' &&
                  errors.password2.message)
              }
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
              loading={isSubmitting}
              color='teal'
              size='large'
              content='Update Password'
              type='submit'
              disabled={!isValid || isSubmitting}
            />
          </Form>
        </div>
      )}
      {currentUser?.providerId?.includes('github') && (
        <div>
          <Header color='teal' sub content='GitHub Account' />
          <p>Please visit GitHub to update your account settings</p>
          <Button color='black' as={Link} to='https://github.com'>
            <Icon name='github' /> GitHub
          </Button>
        </div>
      )}
      {currentUser?.providerId?.includes('google') && (
        <div>
          <Header color='teal' sub content='Google Account' />
          <p>Please visit Google to update your account settings</p>
          <Button color='google plus' as={Link} to='https://google.com'>
            <Icon name='google' /> Google
          </Button>
        </div>
      )}
    </Segment>
  );
}

export default AccountPage;
