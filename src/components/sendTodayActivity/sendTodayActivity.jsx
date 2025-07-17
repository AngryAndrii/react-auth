import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
// import { getTodayFormattedDay } from "../../helpers/getTodayFormattedDate";
import transformData from '../../helpers/transformData.js';
import { patchData } from '../../helpers/fetch';
import { useAuth } from '../../helpers/authContext';
import { listOfExercises } from '../../helpers/listOfExercises.js';
import DroplistForActivity from '../droplistForActivity/DroplistForActivity.jsx';

function SendTodayActivity({ onSend }) {
  // const { user, uid, token, loading } = useAuth();
  const { uid, token } = useAuth();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      activity: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const formattedData = transformData(data);
      await patchData(uid, token, formattedData);
      console.log('Дані успішно надіслані');
      onSend();
    } catch (error) {
      console.error('Помилка під час надсилання:', error);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#121212',
        width: '300px',
        margin: '0 auto',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DroplistForActivity
          control={control}
          name='activity'
          label='Activity'
          list={listOfExercises}
        />
        <Controller
          name='amount'
          control={control}
          rules={{
            required: 'Введіть кількість повторень',
            min: { value: 1, message: 'Мінімум 1' },
            max: { value: 1000, message: 'Забагато' },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              sx={{
                mt: 2,
                input: { color: '#eee' }, // текст вводу
                label: { color: '#bbb' }, // підпис
                '& label.Mui-focused': { color: '#ccc' }, // колір підпису при фокусі
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#666',
                  color: 'primary.text',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#aaa',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999',
                  color: 'primary.text',
                },
              }}
              label='Кількість повторень'
              type='number'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 2, backgroundColor: '#333', color: '#eee' }}
        >
          Відправить
        </Button>
      </form>
    </Box>
  );
}

export default SendTodayActivity;
