import type { ReactNode } from 'react';
import type { Control, FieldErrors, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import type { SxProps, Theme } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';

type BaseFormFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  labelName?: string;
  className?: string;
  disabled?: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type IFormTextFieldProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  containerSx?: SxProps<Theme>;
  helperAction?: ReactNode;
  inputSx?: SxProps<Theme>;
  type?: string;
  labelText?: string;
  labelSx?: SxProps<Theme>;
  placeHolder?: string;
  isPassword?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  multiline?: boolean;
  isDisable?: boolean;
  rules?: RegisterOptions<T, FieldPath<T>>;
  textFieldProps?: Omit<TextFieldProps, 'name' | 'type' | 'label' | 'error' | 'placeholder'>;
};

export type IFormSelectProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  initialvalue?: string;
  children?: ReactNode;
  iconButton?: ReactNode;
  startAdornment?: ReactNode;
  fullWidth?: boolean;
};

export type IFormCheckboxProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  label: string;
  options?: SelectOption[];
  required?: boolean;
};

export type IFormPhoneInputProps<T extends FieldValues> = BaseFormFieldProps<T> & {
  countryCodeName?: FieldPath<T>;
  placeHolder?: string;
  isDisable?: boolean;
};
