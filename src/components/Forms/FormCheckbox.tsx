import { IFormCheckboxProps } from '@/typescript/interface/forms.interface';
import CheckedIcon from '@/ui/Icons/CheckedIcon';
import UncheckedIcon from '@/ui/Icons/UncheckedIcon';

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

const FormCheckbox = <T extends FieldValues>({
  name,
  label,
  options,
  control,
  errors,
  required = false,
  onExclusiveCheck,
}: IFormCheckboxProps<T> & { onExclusiveCheck?: () => void }) => {
  const error = errors?.[name];
  const errorMessage = error?.message as string;

  return (
    <>
      {/* Label + required indicator (kept minimal for single checkbox) */}
      {required && (
        <Typography variant='body2' sx={{ mb: 0.5 }}>
          <span style={{ color: 'red' }}>*</span>
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <>
            {options && options.length > 0 ? (
              /* ------------------------------------------------ */
              /* Multi-select checkbox group                      */
              /* ------------------------------------------------ */
              <FormGroup>
                {options.map(option => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        icon={<UncheckedIcon />}
                        checkedIcon={<CheckedIcon />}
                        disableRipple
                        checked={field?.value?.includes(option.value) || false}
                        onChange={e => {
                          const currentValue = field.value || [];
                          if (e.target.checked) {
                            field.onChange([...currentValue, option.value]);
                          } else {
                            field.onChange(
                              currentValue.filter((val: string) => val !== option.value)
                            );
                          }
                        }}
                      />
                    }
                    label={<Typography variant='body2'>{option.label}</Typography>}
                  />
                ))}
              </FormGroup>
            ) : (
              /* ------------------------------------------------ */
              /* Single boolean checkbox (Remember me style)     */
              /* ------------------------------------------------ */
              <FormControlLabel
                sx={{
                  alignItems: 'center',
                  '& .MuiFormControlLabel-label': {
                    marginLeft: '6px',
                  },
                }}
                control={
                  <Checkbox
                    // icon={<UncheckedIcon />}
                    // checkedIcon={<CheckedIcon />}
                    disableRipple
                    checked={!!field.value}
                    onChange={e => {
                      const checked = e.target.checked;
                      field.onChange(checked);

                      if (checked && onExclusiveCheck) {
                        onExclusiveCheck();
                      }
                    }}
                  />
                }
                label={<Typography variant='body2'>{label}</Typography>}
              />
            )}

            {errorMessage && (
              <Typography
                variant='caption'
                color='error'
                sx={{ ml: 0.5, mt: 0.5, display: 'block' }}
              >
                {errorMessage}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
};

export default FormCheckbox;
