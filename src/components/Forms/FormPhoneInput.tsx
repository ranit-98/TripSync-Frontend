import { IFormPhoneInputProps } from '@/typescript/interface/forms.interface';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import { Autocomplete, Grid, Typography } from '@mui/material';

import allCountriesData from 'country-telephone-data';
import { Controller, FieldValues, Path } from 'react-hook-form';

const { allCountries } = allCountriesData;

const countries = allCountries.map((country: { name: string; dialCode: string }) => ({
  name: country.name,
  dialCode: country.dialCode,
}));

const FormPhoneInput = <T extends FieldValues>({
  name,
  countryCodeName,
  labelName,
  placeHolder,
  control,
  isDisable = false,
}: IFormPhoneInputProps<T>) => {
  const actualCountryCodeName = (countryCodeName || 'countryCode') as Path<T>;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
        <Controller
          name={actualCountryCodeName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Autocomplete
                options={countries}
                getOptionLabel={option => `${option.name} (${option.dialCode})`}
                isOptionEqualToValue={(option, value) => option.dialCode === value.dialCode}
                value={
                  field.value
                    ? countries.find(
                        (c: { dialCode: string }) =>
                          String(c.dialCode).trim() === String(field.value).trim()
                      )
                    : undefined
                }
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.dialCode : '');
                }}
                disabled={isDisable}
                disableClearable
                slotProps={{
                  listbox: {
                    sx: { maxHeight: 200 },
                  },
                }}
                renderInput={params => {
                  return (
                    <InputFieldCommon
                      {...params}
                      fullWidth
                      labelName={labelName || 'Country'}
                      placeholder={'Code'}
                      error={!!error}
                      disabled={isDisable}
                    />
                  );
                }}
              />
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
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 9 }}>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <InputFieldCommon
                {...field}
                type='tel'
                placeholder={placeHolder ? placeHolder : 'Enter phone number'}
                error={!!error}
                disabled={isDisable}
                labelName={'Phone Number'}
                onChange={e => {
                  const onlyDigits = e.target.value.replace(/\D/g, '');
                  field.onChange(onlyDigits);
                }}
              />
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
      </Grid>
    </Grid>
  );
};

export default FormPhoneInput;
