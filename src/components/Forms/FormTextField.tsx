import { IFormTextFieldProps } from '@/typescript/interface/forms.interface';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import { Box, Stack, Typography } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

const FormTextField = <T extends FieldValues>({
  containerSx,
  helperAction,
  inputSx,
  className,
  name,
  type = 'text',
  labelName,
  labelText,
  labelSx,
  placeHolder,
  isPassword = false,
  startAdornment,
  control,
  multiline = false,
  isDisable = false,
  endAdornment,
  rules,
  textFieldProps,
  ...rest
}: IFormTextFieldProps<T>) => {
  return (
    <Box className={className} sx={containerSx}>
      {(labelName || helperAction) && (
        <Stack className="form_field_header" direction="row">
          {labelName && (
            <Typography
              className="form_field_label"
              color="text.secondary"
              sx={labelSx ?? { fontWeight: 800 }}
              variant="caption"
            >
              {labelName}
            </Typography>
          )}
          {helperAction}
        </Stack>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputFieldCommon
              {...field}
              {...textFieldProps}
              {...(type === 'number' ? { type: 'number' } : { type })}
              placeholder={
                placeHolder ?? (labelName ? `Enter ${labelName.toLowerCase()}` : undefined)
              }
              error={!!error}
              labelName={labelText}
              inputSx={inputSx}
              isPassword={isPassword}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              disabled={isDisable}
              multiline={multiline}
              {...rest}
            />
            {error?.message && (
              <Typography className="form_field_error" color="error" variant="caption">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default FormTextField;
