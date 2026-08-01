'use client';

import { useTripDetails, useTripMembers, useTripsCreate, useTripsUpdate, useTripsUploadCover } from '@/api/hooks/trips/useTrips.hooks';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormFileUpload from '@/components/Forms/FormFileUpload';
import FormSelect from '@/components/Forms/FormSelect';
import FormTextField from '@/components/Forms/FormTextField';
import { CreateTripPageWrapper } from '@/styles/trips/createTrip.styles';
import { canManageTrip } from '@/lib/functions/tripPermissions';
import { useAuthStore } from '@/store/auth/auth.store';
import type { ICreateTripPayload } from '@/typescript/interface/api';
import { yupResolver } from '@hookform/resolvers/yup';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SavingsIcon from '@mui/icons-material/Savings';
import TerrainIcon from '@mui/icons-material/Terrain';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
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

type TripFormValues = {
  coverPhoto: File | null;
  currency: string;
  destination: string;
  endDate: string;
  startDate: string;
  title: string;
  tripStyles: string[];
};

const schema: yup.ObjectSchema<TripFormValues> = yup.object({
  coverPhoto: yup.mixed<File>().nullable().defined(),
  currency: yup.string().required('Currency is required'),
  destination: yup.string().trim().required('Destination is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test('end-after-start', 'End date must be on or after the start date', function validateEndDate(value) {
      const { startDate } = this.parent as { startDate?: string };
      return !value || !startDate || !dayjs(value).isBefore(dayjs(startDate), 'day');
    }),
  startDate: yup.string().required('Start date is required'),
  title: yup.string().trim().required('Trip title is required'),
  tripStyles: yup.array().of(yup.string().required()).min(1, 'Choose at least one trip category').required(),
});

const defaultValues: TripFormValues = {
  coverPhoto: null,
  currency: 'USD',
  destination: '',
  endDate: '',
  startDate: '',
  title: '',
  tripStyles: ['adventure'],
};

export default function CreateTripFlow({ tripId }: { tripId?: string }) {
  const router = useRouter();
  const isEditing = Boolean(tripId);
  const currentUser = useAuthStore((state) => state.user);
  const { data: tripResponse, isLoading: isLoadingTrip } = useTripDetails(tripId);
  const { data: membersResponse, isLoading: isLoadingMembers } = useTripMembers(tripId);
  const trip = tripResponse?.data.data;
  const members = membersResponse?.data.data ?? [];
  const canEditTrip = !isEditing || canManageTrip(members, currentUser);
  const { mutateAsync: createTrip, isPending: isCreating } = useTripsCreate({ optionalCallback: () => undefined });
  const { mutateAsync: updateTrip, isPending: isUpdating } = useTripsUpdate({ optionalCallback: () => undefined });
  const { mutateAsync: uploadCover, isPending: isUploadingCover } = useTripsUploadCover({ optionalCallback: () => undefined });
  const { control, formState: { errors }, handleSubmit, reset, watch } = useForm<TripFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const coverPhoto = watch('coverPhoto');
  const startDate = watch('startDate');
  const isSubmitting = isCreating || isUpdating || isUploadingCover;
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const coverImageSrc = coverPreviewUrl ?? trip?.coverUrl;

  useEffect(() => {
    if (!trip) return;

    reset({
      coverPhoto: null,
      currency: trip.currency ?? 'USD',
      destination: trip.destination,
      endDate: trip.endDate.slice(0, 10),
      startDate: trip.startDate.slice(0, 10),
      title: trip.title,
      tripStyles: trip.styles?.length ? trip.styles : [],
    });
  }, [reset, trip]);

  useEffect(() => {
    if (!coverPhoto) {
      setCoverPreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(coverPhoto);
    setCoverPreviewUrl(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [coverPhoto]);

  const coverPhotoName = useMemo(
    () => coverPhoto?.name ?? 'Add a cover photo (optional)',
    [coverPhoto],
  );

  const onSubmit: SubmitHandler<TripFormValues> = async (values) => {
    if (!canEditTrip) return;
    const payload: ICreateTripPayload = {
      cover: values.coverPhoto ?? undefined,
      currency: values.currency,
      destination: values.destination.trim(),
      endDate: values.endDate,
      startDate: values.startDate,
      styles: values.tripStyles,
      title: values.title.trim(),
    };

    if (tripId) {
      await updateTrip({
        body: {
          currency: payload.currency,
          destination: payload.destination,
          endDate: payload.endDate,
          startDate: payload.startDate,
          styles: payload.styles,
          title: payload.title,
        },
        tripId,
      });
      if (values.coverPhoto) {
        await uploadCover({ body: { cover: values.coverPhoto }, tripId });
      }
      router.push(`/trips/${tripId}/itinerary`);
      return;
    }

    const response = await createTrip(payload);
    router.push(response.data.data?.id ? `/trips/${response.data.data.id}/itinerary` : '/trips');
  };

  if (isEditing && (isLoadingTrip || isLoadingMembers)) {
    return <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>Loading trip permissions...</Box>;
  }

  if (!canEditTrip && tripId) {
    return (
      <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center', p: 3 }}>
        <Box sx={{ maxWidth: 460, textAlign: 'center' }}>
          <Typography component="h1" sx={{ fontSize: 28, fontWeight: 800 }}>Viewer access</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>You can view this trip and join its conversation, but only collaborators can edit trip details.</Typography>
          <Button component={Link} href={`/trips/${tripId}/itinerary`} sx={{ mt: 3 }} variant="contained">Back to trip</Button>
        </Box>
      </Box>
    );
  }

  return (
    <CreateTripPageWrapper>
      <Box className="create_header" component="header">
        <Box className="create_header_inner">
          <Box className="brand_lockup">
            <IconButton className="close_link" component={Link} href={isEditing && tripId ? `/trips/${tripId}/itinerary` : '/dashboard'} aria-label="Close">
              <ArrowBackIcon />
            </IconButton>
            <Typography className="brand_name">TripSync</Typography>
          </Box>
          <Typography className="create_mode">{isEditing ? 'Edit trip' : 'New trip'}</Typography>
        </Box>
      </Box>

      <Box className="create_main" component="main">
        <Typography className="eyebrow">{isEditing ? 'Edit trip' : 'New trip'}</Typography>
        <Typography className="page_title" component="h1">{isEditing ? 'Update your trip details' : 'Plan your next adventure'}</Typography>
        <Typography className="page_subtitle">Add the destination, dates, currency, and travel categories in one place.</Typography>

        <Box className="wizard_shell" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box className={`cover_upload${coverImageSrc ? ' has_image' : ''}`}>
            {coverImageSrc && <Box alt="Trip cover preview" component="img" src={coverImageSrc} />}
            <FormFileUpload
              acceptedFormats="image/*"
              control={control}
              name="coverPhoto"
              overlayClassName="cover_overlay"
              showPreview={false}
              uploadButtonClassName="upload_prompt"
              uploadButtonLabel={coverPhotoName}
              uploadButtonStartIcon={<AddAPhotoIcon />}
            />
          </Box>

          <Box className="form_body">
            <Box className="step_panel active">
              <Box className="step_heading">
                <span className="step_number">1</span>
                <Typography className="step_title" component="h2">Trip details</Typography>
              </Box>

              <Box className="field_grid">
                <Box className="full_span">
                  <FormTextField control={control} labelName="Trip title" name="title" placeHolder="e.g. Spring in Tokyo" startAdornment={<InputAdornment position="start"><FlightTakeoffIcon color="action" /></InputAdornment>} />
                </Box>
                <FormTextField className="full_span" control={control} labelName="Where to?" name="destination" placeHolder="Search cities, countries..." startAdornment={<InputAdornment position="start"><LocationOnIcon color="action" /></InputAdornment>} />
                <Box>
                  <Typography className="form_label" component="label">Start date</Typography>
                  <FormDatePicker control={control} errors={errors} minDate={dayjs().startOf('day')} name="startDate" placeHolder="Select start date" />
                </Box>
                <Box>
                  <Typography className="form_label" component="label">End date</Typography>
                  <FormDatePicker control={control} disabled={!startDate} errors={errors} minDate={startDate ? dayjs(startDate) : null} name="endDate" placeHolder={startDate ? 'Select end date' : 'Select a start date first'} />
                </Box>
                <FormSelect className="currency_select" control={control} initialvalue="Select currency" labelClassName="form_label" labelName="Currency" name="currency" showStaticLabel>
                  {currencies.map((currency) => <MenuItem key={currency.value} value={currency.value}>{currency.label}</MenuItem>)}
                </FormSelect>
                <Box className="full_span">
                  <Typography className="form_label">Trip categories</Typography>
                  <Controller control={control} name="tripStyles" render={({ field }) => (
                    <Box className="category_grid">
                      {tripStyles.map((tripStyle) => {
                        const Icon = tripStyle.icon;
                        const active = field.value.includes(tripStyle.value);
                        return <Box className={`category_chip${active ? ' active' : ''}`} component="label" key={tripStyle.value}><input checked={active} type="checkbox" onChange={() => field.onChange(active ? field.value.filter((value) => value !== tripStyle.value) : [...field.value, tripStyle.value])} /><Icon fontSize="small" />{tripStyle.label}</Box>;
                      })}
                    </Box>
                  )} />
                  {errors.tripStyles?.message && <Typography color="error" variant="caption">{errors.tripStyles.message}</Typography>}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="action_bar">
            <Box className="action_group">
              <Button disabled={isSubmitting || (isEditing && isLoadingTrip)} endIcon={isEditing ? <DoneIcon /> : <ArrowForwardIcon />} type="submit" variant="contained">
                {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Trip'}
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="help_grid">
          <Box className="help_card"><FlightTakeoffIcon /><Box><strong>Ready to plan</strong><p>Add people anytime from your trip workspace.</p></Box></Box>
          <Box className="help_card"><MapIcon /><Box><strong>Smart routing</strong><p>Use trip categories to shape local suggestions and daily routes.</p></Box></Box>
          <Box className="help_card"><PaymentsIcon /><Box><strong>Expense tracking</strong><p>Track shared costs directly in your trip workspace.</p></Box></Box>
        </Box>
      </Box>
    </CreateTripPageWrapper>
  );
}
