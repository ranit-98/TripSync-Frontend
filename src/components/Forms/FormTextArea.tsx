import { Box, TextField, Typography } from '@mui/material';
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';

interface IFormTextAreaProps<T extends FieldValues> {
  name: FieldPath<T>;
  placeHolder?: string;
  labelName: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  rows?: number;
  className?: string;
}

const FormTextArea = <T extends FieldValues>({
  name,
  labelName,
  placeHolder,
  control,
  errors,
  required = false,
  rows = 4,
  className,
}: IFormTextAreaProps<T>) => {
  const error = errors?.[name];
  const errorMessage = error?.message as string;
  return (
    <Box className={className}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        {labelName} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${labelName} is required` : false }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            rows={rows}
            placeholder={placeHolder}
            variant='outlined'
          />
        )}
      />
      {errorMessage && (
        <Typography variant='caption' color='error' sx={{ ml: 0.5, mt: 0.5, display: 'block' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default FormTextArea;
