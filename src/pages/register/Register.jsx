import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useRedirect from '../../hooks/useRedirect';
import { useAuth } from '../../helpers/authContext';

function Register() {
  const goTo = useRedirect();
  const { setUser } = useAuth(); // дістаємо setUser з контексту
  const fieldStyle = {
    backgroundColor: 'primary.light',
    '.MuiFilledInput-root': {
      input: {
        color: 'black',
      },
    },
  };
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
      .then(async (userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Оновлюємо глобальний user у контексті з новим displayName
            setUser({ ...user, displayName: name });
            console.log('Нікнейм збережено:', name);
            // const token = await user.getIdToken();
            // console.log(token);
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
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'secondary.light',
        margin: '0 auto',
        width: 'fit-content',
        maxWidth: '100vw',
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        {...register('nickname')}
        label='Nickname'
        variant='filled'
        type='text'
        sx={fieldStyle}
      />
      <TextField
        {...register('email', { required: true })}
        label='Email'
        type='email'
        variant='filled'
        sx={fieldStyle}
      />
      <TextField
        {...register('password', { required: true })}
        label='Password'
        type='password'
        autoComplete='current-password'
        variant='filled'
        sx={fieldStyle}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <Button variant='contained' type='submit' sx={{ backgroundColor: 'primary.main' }}>
        Submit
      </Button>
    </Box>
  );
}

export default Register;
