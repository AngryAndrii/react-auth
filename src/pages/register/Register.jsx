import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // const name = data.nickname;
    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);
        // Here i can save user name in database
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
        <TextField {...register('nickname')} label='Nickname' variant='filled' type='text' />
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
          Submit
        </Button>
      </Box>
    </>
  );
}

export default Register;
