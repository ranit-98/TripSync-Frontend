'use client';

import CustomDatePicker from '@/ui/Datepicker/CustomDatePicker';
import { Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

interface IFormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  labelName?: string;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  minDate?: Dayjs | null;
}

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label = '',
  minDate,
  errors,
  labelName,
  placeHolder,
  disabled = false,
  className,
}: IFormDatePickerProps<T>) => {
  const error = errors?.[name];
  const errorMessage = error?.message as string;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value: Dayjs | null = field.value ? dayjs(field.value) : null;

          return (
            <CustomDatePicker
              value={value}
              onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
              placeholder={
                placeHolder
                  ? placeHolder
                  : labelName
                    ? `Select ${labelName.toLowerCase()}`
                    : undefined
              }
              disabled={disabled}
              className={className}
              labelName={label}
              minDate={minDate ?? undefined}
            />
          );
        }}
      />

      {errorMessage && (
        <Typography variant='caption' color='error'>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FormDatePicker;
