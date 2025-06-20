import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useRedirect from '../../hooks/useRedirect';
import { useAuth } from '../../helpers/authContext';

function Register() {
  const goTo = useRedirect();
  const { setUser } = useAuth(); // дістаємо setUser з контексту

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.nickname;
    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Оновлюємо глобальний user у контексті з новим displayName
            setUser({ ...user, displayName: name });
            console.log('Нікнейм збережено:', name);

            goTo('/profile'); // переходимо на профіль
          })
          .catch((error) => {
            console.error('Помилка при оновленні профілю:', error.message);
          });

        console.log('User created:', user);
      })
      .catch((error) => {
        console.error('Error:', error.code, error.message);
      });
  };

  return (
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
        type='email'
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
  );
}

export default Register;
