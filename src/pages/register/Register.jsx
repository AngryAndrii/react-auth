import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useRedirect from '../../hooks/useRedirect';
import { useAuth } from '../../helpers/authContext';
import { ErrorMessage } from '@hookform/error-message';
import { NavLink } from 'react-router-dom';

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
  } = useForm({ mode: 'onChange' });

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
    <Box sx={{ paddingTop: '100px' }}>
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
          {...register('nickname', {
            required: 'This field is required',
            maxLength: { value: 20, message: 'max lenght is 20 symbols' },
            minLength: { value: 3, message: 'min lenght is 3 symbols' },
            pattern: {
              value: /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9]+$/,
              message: 'Only letters and numbers are allowed',
            },
          })}
          label='Nickname'
          variant='filled'
          type='text'
          sx={fieldStyle}
        />
        {errors.nickname && (
          <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.nickname.message}</p>
        )}
        <TextField
          {...register('email', {
            required: 'Email field is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'invalid email',
            },
          })}
          label='Email'
          type='email'
          variant='filled'
          sx={fieldStyle}
        />
        {errors.email && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.email.message}</p>}
        <TextField
          {...register('password', {
            required: 'This field is required',
            maxLength: { value: 25, message: 'max lenght is 25 symbols' },
            minLength: { value: 6, message: 'min lenght is 6 symbols' },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Only letters and numbers are allowed',
            },
          })}
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
          sx={fieldStyle}
        />
        {errors.password && (
          <p style={{ color: 'red', fontSize: '0.9rem' }}>{errors.password.message}</p>
        )}

        <Button variant='contained' type='submit' sx={{ backgroundColor: 'primary.main' }}>
          Submit
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant='p' sx={{ color: 'primary.text', fontSize: '16px' }}>
          Already registered?
          <NavLink className='page-link underform' to='/login'>
            Log in
          </NavLink>
          to your account
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
