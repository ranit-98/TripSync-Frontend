'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';

type CustomDatePickerProps = {
  className?: string;
  disabled?: boolean;
  labelName?: string;
  minDate?: Dayjs;
  onChange: (value: Dayjs | null) => void;
  placeholder?: string;
  value: Dayjs | null;
};

export default function CustomDatePicker({
  className,
  disabled = false,
  labelName,
  minDate,
  onChange,
  value,
}: CustomDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={className}
        disabled={disabled}
        label={labelName}
        minDate={minDate}
        onChange={onChange}
        slotProps={{ textField: { fullWidth: true } }}
        value={value}
      />
    </LocalizationProvider>
  );
}
