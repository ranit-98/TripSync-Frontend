import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

type InputFieldCommonProps = Omit<TextFieldProps, 'label'> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputSx?: SxProps<Theme>;
  isPassword?: boolean;
  labelName?: string;
};

export default function InputFieldCommon({
  labelName,
  isPassword = false,
  startAdornment,
  endAdornment,
  inputSx,
  sx,
  type,
  slotProps,
  ...props
}: InputFieldCommonProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordEndAdornment = isPassword ? (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        edge="end"
        onClick={() => setShowPassword((currentValue) => !currentValue)}
        onMouseDown={(event) => event.preventDefault()}
        type="button"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  ) : (
    endAdornment
  );

  return (
    <TextField
      fullWidth
      label={labelName}
      sx={inputSx ?? sx}
      type={isPassword && !showPassword ? 'password' : type}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          startAdornment,
          endAdornment: passwordEndAdornment,
        },
      }}
      {...props}
    />
  );
}
