import { Box, Typography } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import OtpInput from 'react-otp-input';

interface IFormOtpInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  numInputs?: number;
}

const FormOtpInput = <T extends FieldValues>({
  name,
  control,

  numInputs = 4,
}: IFormOtpInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box className='otpInputWrap'>
          <Box className='otpInputBox'>
            <OtpInput
              value={value}
              onChange={onChange}
              numInputs={numInputs}
              renderInput={props => <input {...props} placeholder='-' />}
            />
          </Box>
          {error && (
            <Typography variant='caption' color='error' sx={{ mt: 1, display: 'block' }}>
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default FormOtpInput;
