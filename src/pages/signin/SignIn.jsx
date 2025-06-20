import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useRedirect from '../../hooks/useRedirect';

function SignIn() {
  const goTo = useRedirect();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Успішний вхід:', user.displayName);
        goTo('/profile');
      })
      .catch((error) => {
        console.error('Error:', error.code, error.message);
      });
  };

  return (
    <>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          {...register('email', { required: true })}
          label='Email'
          type='mail'
          variant='filled'
        />
        <TextField
          {...register('password', { required: true })}
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <Button variant='outlined' type='submit'>
          Sign In
        </Button>
      </Box>
    </>
  );
}

export default SignIn;
