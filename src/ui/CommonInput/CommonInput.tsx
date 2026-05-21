import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';
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
  return (
    <TextField
      fullWidth
      label={labelName}
      sx={inputSx ?? sx}
      type={isPassword ? 'password' : type}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          startAdornment,
          endAdornment,
        },
      }}
      {...props}
    />
  );
}
