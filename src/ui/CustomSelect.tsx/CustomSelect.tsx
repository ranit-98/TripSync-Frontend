import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ReactNode } from 'react';

type CustomSelectProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  iconButton?: ReactNode;
  initialvalue?: string;
  labelName?: string;
  multiple?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  startAdornment?: ReactNode;
  value?: unknown;
};

export default function CustomSelect({
  children,
  className,
  disabled = false,
  error = false,
  fullWidth = true,
  iconButton,
  initialvalue = 'Select an option',
  labelName,
  multiple = false,
  name,
  onBlur,
  onChange,
  startAdornment,
  value,
}: CustomSelectProps) {
  const labelId = labelName ? `${name ?? labelName}-label` : undefined;

  return (
    <FormControl className={className} disabled={disabled} error={error} fullWidth={fullWidth}>
      {labelName && <InputLabel id={labelId}>{labelName}</InputLabel>}
      <Select
        displayEmpty
        label={labelName}
        labelId={labelId}
        multiple={multiple}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value ?? (multiple ? [] : '')}
        startAdornment={
          startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null
        }
      >
        <MenuItem disabled value="">
          {initialvalue}
        </MenuItem>
        {children}
      </Select>
      {iconButton}
    </FormControl>
  );
}
