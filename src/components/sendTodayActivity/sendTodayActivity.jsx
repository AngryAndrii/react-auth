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
import { getTodayFormattedDay } from '../../helpers/getTodayFormattedDate';
import transformData from '../../helpers/transformData,js';
import { patchData } from '../../helpers/fetch';
import { useAuth } from '../../helpers/authContext';

function SendTodayActivity() {
  const { user, uid, token, loading } = useAuth();
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
    } catch (error) {
      console.error('Помилка під час надсилання:', error);
    }
  };
  // patchData(uid, token,);

  return (
    <Box sx={{ p: 2, backgroundColor: '#121212' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel
            id='select-label'
            sx={{
              color: '#bbb',
              '&.Mui-focused': {
                color: '#ccc',
              },
            }}
          >
            Activity
          </InputLabel>
          <Controller
            name='activity'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                inputProps={{
                  sx: {
                    color: '#eee',
                  },
                }}
                sx={{
                  '& label.Mui-focused': { color: '#ccc' }, // колір підпису при фокусі
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#aaa',
                    color: 'primary.text',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
                  '.MuiSvgIcon-root': { color: '#eee' }, // колір стрілочки
                }}
                labelId='select-label'
                label='Activity'
                {...field}
              >
                <MenuItem value={'pullups'}>Pullups</MenuItem>
                <MenuItem value={'pushups'}>Pushups</MenuItem>
                <MenuItem value={'crunches'}>Crunches</MenuItem>
              </Select>
            )}
          />
        </FormControl>
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
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#666', color: 'primary.text' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
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
