import { IFormSelectProps } from '@/typescript/interface/forms.interface';
import CustomSelect from '@/ui/CustomSelect.tsx/CustomSelect';
import { Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

const FormSelect = <T extends FieldValues>({
  name,
  control,
  labelName,
  initialvalue = 'Select an option',
  children,
  className,
  iconButton,
  disabled = false,
  startAdornment,
  fullWidth = true,
}: IFormSelectProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomSelect
              {...field}
              labelName={labelName}
              initialvalue={initialvalue}
              value={field.value ?? ''}
              className={className}
              iconButton={iconButton}
              disabled={disabled}
              startAdornment={startAdornment}
              fullWidth={fullWidth}
              error={!!error}
            >
              {children}
            </CustomSelect>
            {error?.message && (
              <Typography
                variant='caption'
                color='error'
                sx={{ ml: 0.5, mt: 0.5, display: 'block' }}
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
};

export default FormSelect;
