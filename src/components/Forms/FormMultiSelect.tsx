import { IFormSelectProps } from '@/typescript/interface/forms.interface';
import CustomSelect from '@/ui/CustomSelect.tsx/CustomSelect';
import { Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

const FormMultiSelect = <T extends FieldValues>({
  name,
  control,
  errors,
  labelName,
  initialvalue = 'Select options',
  children,
  className,
  iconButton,
  disabled = false,
}: IFormSelectProps<T>) => {
  const error = errors?.[name];
  const errorMessage = error?.message as string;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomSelect
            {...field}
            labelName={labelName}
            initialvalue={initialvalue}
            className={className}
            iconButton={iconButton}
            disabled={disabled}
            multiple
            value={field.value || []}
            onChange={event => field.onChange(event.target.value)}
          >
            {children}
          </CustomSelect>
        )}
      />
      {errorMessage && (
        <Typography variant='caption' color='error' sx={{ ml: 0.5, mt: 0.5, display: 'block' }}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FormMultiSelect;
