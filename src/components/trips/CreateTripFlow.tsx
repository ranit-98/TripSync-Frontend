'use client';

import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormTextField from '@/components/Forms/FormTextField';
import { dashboardAssets } from '@/json/assets';
import { CreateTripPageWrapper } from '@/styles/trips/createTrip.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SavingsIcon from '@mui/icons-material/Savings';
import TerrainIcon from '@mui/icons-material/Terrain';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Controller, FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const tripStyles = [
  { icon: TerrainIcon, label: 'Adventure', value: 'adventure' },
  { icon: RestaurantIcon, label: 'Food', value: 'food' },
  { icon: MapIcon, label: 'Cultural', value: 'cultural' },
  { icon: SavingsIcon, label: 'Relaxed', value: 'relaxed' },
] as const;

const currencies = [
  { label: 'USD ($)', value: 'USD' },
  { label: 'EUR (EUR)', value: 'EUR' },
  { label: 'INR (Rs)', value: 'INR' },
  { label: 'JPY (Yen)', value: 'JPY' },
] as const;

type CreateTripFormValues = {
  budget: number;
  coverPhoto: FileList | null;
  currency: string;
  destination: string;
  endDate: string;
  inviteEmail: string;
  inviteRole: 'collaborator' | 'viewer';
  notes: string;
  startDate: string;
  title: string;
  tripStyles: string[];
};

const schema: yup.ObjectSchema<CreateTripFormValues> = yup.object({
  budget: yup
    .number()
    .typeError('Enter a valid budget')
    .positive('Budget must be greater than 0')
    .required('Budget is required'),
  coverPhoto: yup.mixed<FileList>().nullable().defined(),
  currency: yup.string().required('Currency is required'),
  destination: yup.string().trim().required('Destination is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test('end-after-start', 'End date must be after start date', function validateEndDate(value) {
      const { startDate } = this.parent as { startDate?: string };

      if (!value || !startDate) {
        return true;
      }

      return new Date(value).getTime() >= new Date(startDate).getTime();
    }),
  inviteEmail: yup.string().trim().email('Enter a valid email').defined(),
  inviteRole: yup.mixed<'collaborator' | 'viewer'>().oneOf(['collaborator', 'viewer']).required('Role is required'),
  notes: yup.string().trim().max(300, 'Notes must be 300 characters or less').defined(),
  startDate: yup.string().required('Start date is required'),
  title: yup.string().trim().required('Trip title is required'),
  tripStyles: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Choose at least one trip style')
    .required('Choose at least one trip style'),
});

const defaultValues: CreateTripFormValues = {
  budget: 2500,
  coverPhoto: null,
  currency: 'USD',
  destination: '',
  endDate: '',
  inviteEmail: '',
  inviteRole: 'collaborator',
  notes: '',
  startDate: '',
  title: '',
  tripStyles: ['adventure'],
};

const stepFields: Record<number, FieldPath<CreateTripFormValues>[]> = {
  1: ['title', 'destination', 'startDate', 'endDate'],
  2: ['currency', 'budget', 'tripStyles'],
  3: ['inviteEmail', 'inviteRole', 'notes'],
};

export default function CreateTripFlow() {
  const [step, setStep] = useState(1);

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
  } = useForm<CreateTripFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const coverPhoto = watch('coverPhoto');
  const selectedStyles = watch('tripStyles');
  const destination = watch('destination');
  const budget = watch('budget');
  const progress = `${(step / 3) * 100}%`;

  const coverPhotoName = useMemo(() => {
    if (!coverPhoto?.length) {
      return 'Upload Trip Cover Photo';
    }

    return coverPhoto[0]?.name ?? 'Cover photo selected';
  }, [coverPhoto]);

  const handleNext = async () => {
    const isValid = await trigger(stepFields[step]);

    if (isValid) {
      setStep((currentStep) => Math.min(currentStep + 1, 3));
    }
  };

  const onSubmit: SubmitHandler<CreateTripFormValues> = (values) => {
    const payload = {
      budget: values.budget,
      coverPhotoName: values.coverPhoto?.[0]?.name ?? null,
      currency: values.currency,
      destination: values.destination.trim(),
      endDate: values.endDate,
      invitedMembers: values.inviteEmail
        ? [{ email: values.inviteEmail.trim(), role: values.inviteRole }]
        : [],
      notes: values.notes?.trim() ?? '',
      startDate: values.startDate,
      title: values.title.trim(),
      tripStyles: values.tripStyles,
    };

    console.log('Create trip payload:', payload);
  };

  return (
    <CreateTripPageWrapper>
      <Box className="create_header" component="header">
        <Box className="create_header_inner">
          <Box className="brand_lockup">
            <IconButton className="close_link" component={Link} href="/dashboard" aria-label="Close">
              <ArrowBackIcon />
            </IconButton>
            <Typography className="brand_name">TripSync</Typography>
          </Box>

          <Box className="step_meter">
            <span>Step {step} of 3</span>
            <Box className="progress_track">
              <span className="progress_bar" style={{ width: progress }} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="create_main" component="main">
        <Typography className="eyebrow">New trip</Typography>
        <Typography className="page_title" component="h1">
          Plan your next adventure
        </Typography>
        <Typography className="page_subtitle">
          Start with the essentials, shape the budget, then invite your travel crew.
        </Typography>

        <Box className="wizard_shell" component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="cover_upload">
            <Box component="img" src={dashboardAssets.bali} alt="Tropical coastline at sunset" />
            <Box className="cover_overlay" />
            <Controller
              name="coverPhoto"
              control={control}
              render={({ field: { onChange, ref } }) => (
                <Button className="upload_prompt" component="label" startIcon={<AddAPhotoIcon />}>
                  {coverPhotoName}
                  <input
                    ref={ref}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => onChange(event.target.files)}
                  />
                </Button>
              )}
            />
          </Box>

          <Box className="form_body">
            <Box className={`step_panel${step === 1 ? ' active' : ''}`}>
              <Box className="step_heading">
                <span className="step_number">1</span>
                <Typography className="step_title" component="h2">
                  Destination & Dates
                </Typography>
              </Box>

              <Box className="field_grid">
                <Box className="full_span">
                  <FormTextField
                    control={control}
                    labelName="Trip title"
                    name="title"
                    placeHolder="e.g. Spring in Tokyo"
                    startAdornment={
                      <InputAdornment position="start">
                        <FlightTakeoffIcon color="action" />
                      </InputAdornment>
                    }
                  />
                </Box>
                <FormTextField
                  control={control}
                  labelName="Where to?"
                  name="destination"
                  placeHolder="Search cities, countries..."
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationOnIcon color="action" />
                    </InputAdornment>
                  }
                />
                <Box>
                  <Typography className="form_label" component="label">
                    Start date
                  </Typography>
                  <FormDatePicker
                    control={control}
                    errors={errors}
                    name="startDate"
                    placeHolder="Select start date"
                  />
                </Box>
                <Box>
                  <Typography className="form_label" component="label">
                    End date
                  </Typography>
                  <FormDatePicker
                    control={control}
                    errors={errors}
                    name="endDate"
                    placeHolder="Select end date"
                  />
                </Box>
              </Box>
            </Box>

            <Box className={`step_panel${step === 2 ? ' active' : ''}`}>
              <Box className="step_heading">
                <span className="step_number">2</span>
                <Typography className="step_title" component="h2">
                  Budget & Style
                </Typography>
              </Box>

              <Box className="field_grid">
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Typography className="form_label" component="label">
                        Currency
                      </Typography>
                      <TextField {...field} select fullWidth error={!!errors.currency}>
                        {currencies.map((currency) => (
                          <MenuItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {errors.currency?.message && (
                        <Typography color="error" variant="caption">
                          {errors.currency.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />

                <FormTextField
                  control={control}
                  labelName="Budget"
                  name="budget"
                  placeHolder="Enter amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <WalletIcon color="action" />
                    </InputAdornment>
                  }
                  type="number"
                />

                <Box className="full_span">
                  <Typography className="form_label">Trip type</Typography>
                  <Controller
                    name="tripStyles"
                    control={control}
                    render={({ field }) => (
                      <Box className="category_grid">
                        {tripStyles.map((tripStyle) => {
                          const Icon = tripStyle.icon;
                          const active = field.value?.includes(tripStyle.value);

                          return (
                            <Box
                              className={`category_chip${active ? ' active' : ''}`}
                              component="label"
                              key={tripStyle.value}
                            >
                              <input
                                checked={active}
                                type="checkbox"
                                onChange={() => {
                                  const currentValue = field.value ?? [];
                                  const nextValue = active
                                    ? currentValue.filter((value) => value !== tripStyle.value)
                                    : [...currentValue, tripStyle.value];

                                  field.onChange(nextValue);
                                }}
                              />
                              <Icon fontSize="small" />
                              {tripStyle.label}
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  />
                  {errors.tripStyles?.message && (
                    <Typography color="error" variant="caption">
                      {errors.tripStyles.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Box className={`step_panel${step === 3 ? ' active' : ''}`}>
              <Box className="step_heading">
                <span className="step_number">3</span>
                <Typography className="step_title" component="h2">
                  Invite Members
                </Typography>
              </Box>

              <Box className="invite_stack">
                <Box className="invite_row">
                  <FormTextField
                    control={control}
                    labelName="Invite by email"
                    name="inviteEmail"
                    placeHolder="friend@example.com"
                    type="email"
                  />
                  <Controller
                    name="inviteRole"
                    control={control}
                    render={({ field }) => (
                      <Box className="invite_role">
                        <Typography className="form_label" component="label">
                          Role
                        </Typography>
                        <TextField {...field} select fullWidth error={!!errors.inviteRole}>
                          <MenuItem value="collaborator">Collaborator</MenuItem>
                          <MenuItem value="viewer">Viewer</MenuItem>
                        </TextField>
                      </Box>
                    )}
                  />
                </Box>

                <FormTextField
                  control={control}
                  labelName="Trip notes"
                  multiline
                  name="notes"
                  placeHolder="Add booking references, preferences, or reminders..."
                  textFieldProps={{ minRows: 3 }}
                />
              </Box>

              <Box className="review_grid">
                <Box className="review_tile">
                  <span>Destination</span>
                  <strong>{destination || 'Not set'}</strong>
                </Box>
                <Box className="review_tile">
                  <span>Budget</span>
                  <strong>{budget ? `$${budget}` : 'Not set'}</strong>
                </Box>
                <Box className="review_tile">
                  <span>Style tags</span>
                  <strong>{selectedStyles?.length ?? 0}</strong>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="action_bar">
            <Button color="primary" onClick={() => console.log('Draft trip payload:', watch())}>
              Save Draft
            </Button>
            <Box className="action_group">
              {step > 1 && (
                <Button variant="outlined" onClick={() => setStep((currentStep) => currentStep - 1)}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button variant="contained" endIcon={<DoneIcon />} type="submit">
                  Create Trip
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Box className="help_grid">
          <Box className="help_card">
            <GroupIcon />
            <Box>
              <strong>Collaborative</strong>
              <p>Invite friends to split costs and plan activities together.</p>
            </Box>
          </Box>
          <Box className="help_card">
            <MapIcon />
            <Box>
              <strong>Smart routing</strong>
              <p>Use trip tags to shape local suggestions and daily routes.</p>
            </Box>
          </Box>
          <Box className="help_card">
            <PaymentsIcon />
            <Box>
              <strong>Auto-budget</strong>
              <p>Keep currencies, estimates, and member costs in one place.</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </CreateTripPageWrapper>
  );
}
