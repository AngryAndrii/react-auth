import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const DroplistForActivity = ({ control, name, label, value, onChange, list = [], sx = {} }) => {
  const commonProps = {
    inputProps: {
      sx: {
        color: '#eee',
      },
    },
    sx: {
      '& label.Mui-focused': { color: '#ccc' },
      '.MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#aaa',
        color: 'primary.text',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#999',
      },
      '.MuiSvgIcon-root': { color: '#eee' },
      ...sx, // дозволяє кастомізувати ззовні
    },
    MenuProps: {
      PaperProps: {
        sx: {
          backgroundColor: '#222',
          color: '#fff',
          padding: 0,
          '& .MuiMenuItem-root': {
            padding: '8px 12px',
            '&:hover': {
              backgroundColor: '#8884d8',
            },
            '&.Mui-selected': {
              backgroundColor: 'secondary.dark',
            },
          },
        },
      },
    },
    labelId: `${name}-label`,
    label,
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel
        id={`${name}-label`}
        sx={{
          color: '#bbb',
          '&.Mui-focused': {
            color: '#ccc',
          },
        }}
      >
        {label}
      </InputLabel>

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...commonProps} {...field}>
              {list.map((el) => (
                <MenuItem key={el} value={el.toLowerCase()}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      ) : (
        <Select {...commonProps} value={value} onChange={onChange}>
          {list.map((el) => (
            <MenuItem key={el} value={el.toLowerCase()}>
              {el}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};
export default DroplistForActivity;
