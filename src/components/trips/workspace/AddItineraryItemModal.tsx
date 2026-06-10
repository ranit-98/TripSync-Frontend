'use client';

import {
  useItineraryCreateActivity,
  useItineraryCreateDay,
  useItineraryUpdateActivity,
} from '@/api/hooks/itinerary/useItinerary.hooks';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormTextArea from '@/components/Forms/FormTextArea';
import FormTextField from '@/components/Forms/FormTextField';
import type { IActivity } from '@/typescript/interface/api';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TitleIcon from '@mui/icons-material/Title';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type AddItineraryMode = 'activity' | 'day';

type AddItineraryItemModalProps = {
  dayId?: string;
  initialActivity?: IActivity;
  mode: AddItineraryMode;
  onClose: () => void;
  tripId: string;
};

type AddItineraryFormValues = {
  date: string;
  description: string;
  endTime: string;
  location: string;
  startTime: string;
  title: string;
};

const defaultValues: AddItineraryFormValues = {
  date: '',
  description: '',
  endTime: '',
  location: '',
  startTime: '',
  title: '',
};

const daySchema: yup.ObjectSchema<AddItineraryFormValues> = yup.object({
  date: yup.string().required('Date is required'),
  description: yup.string().defined(),
  endTime: yup.string().defined(),
  location: yup.string().defined(),
  startTime: yup.string().defined(),
  title: yup.string().trim().max(80, 'Title must be 80 characters or less').defined(),
});

const activitySchema: yup.ObjectSchema<AddItineraryFormValues> = yup.object({
  date: yup.string().defined(),
  description: yup.string().trim().max(240, 'Description must be 240 characters or less').defined(),
  endTime: yup.string().defined(),
  location: yup.string().trim().max(120, 'Location must be 120 characters or less').defined(),
  startTime: yup.string().defined(),
  title: yup.string().trim().required('Activity title is required').max(96, 'Title must be 96 characters or less'),
});

export type { AddItineraryMode };

export default function AddItineraryItemModal({
  dayId,
  initialActivity,
  mode,
  onClose,
  tripId,
}: AddItineraryItemModalProps) {
  const isDayMode = mode === 'day';
  const isEditingActivity = Boolean(initialActivity?.id);
  const { mutate: createDay, isPending: isCreatingDay } = useItineraryCreateDay({
    optionalCallback: onClose,
  });
  const { mutate: createActivity, isPending: isCreatingActivity } = useItineraryCreateActivity({
    optionalCallback: onClose,
  });
  const { mutate: updateActivity, isPending: isUpdatingActivity } = useItineraryUpdateActivity({
    optionalCallback: onClose,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddItineraryFormValues>({
    defaultValues: initialActivity
      ? {
          date: '',
          description: initialActivity.description ?? '',
          endTime: initialActivity.endTime ?? '',
          location: initialActivity.location ?? '',
          startTime: initialActivity.startTime ?? '',
          title: initialActivity.title ?? '',
        }
      : defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(isDayMode ? daySchema : activitySchema),
  });
  const isSubmitting = isCreatingDay || isCreatingActivity || isUpdatingActivity;

  const onSubmit: SubmitHandler<AddItineraryFormValues> = (values) => {
    if (isDayMode) {
      createDay({
        tripId,
        body: {
          date: values.date,
          title: values.title.trim() || undefined,
        },
      });
      return;
    }

    const body = {
      dayId: dayId ?? initialActivity?.dayId,
      description: values.description.trim() || undefined,
      endTime: values.endTime || undefined,
      location: values.location.trim() || undefined,
      startTime: values.startTime || undefined,
      title: values.title.trim(),
    };

    if (initialActivity?.id) {
      updateActivity({
        activityId: initialActivity.id,
        tripId,
        body,
      });
      return;
    }

    createActivity({
      tripId,
      body,
    });
  };

  return (
    <Box className="document_modal_overlay">
      <Box className="document_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="document_modal_header">
          <Box>
            <Typography component="h3">
              {isDayMode ? 'Add itinerary day' : isEditingActivity ? 'Edit activity' : 'Add activity'}
            </Typography>
            <Typography>
              {isDayMode
                ? 'Create a day before adding activities.'
                : 'Add the details needed for this activity.'}
            </Typography>
          </Box>
          <IconButton aria-label="Close modal" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="document_modal_body itinerary_modal_body">
          {isDayMode ? (
            <>
              <Box>
                <Typography className="form_label" component="label">
                  Date
                </Typography>
                <FormDatePicker
                  control={control}
                  errors={errors}
                  name="date"
                  placeHolder="Select day date"
                />
              </Box>
              <FormTextField
                control={control}
                labelName="Day title"
                name="title"
                placeHolder="e.g. Arrival in Paris"
                startAdornment={
                  <InputAdornment position="start">
                    <EventIcon color="action" />
                  </InputAdornment>
                }
              />
            </>
          ) : (
            <>
              <FormTextField
                control={control}
                labelName="Activity title"
                name="title"
                placeHolder="e.g. Guided museum tour"
                startAdornment={
                  <InputAdornment position="start">
                    <TitleIcon color="action" />
                  </InputAdornment>
                }
              />
              <FormTextField
                control={control}
                labelName="Location"
                name="location"
                placeHolder="e.g. Louvre Museum"
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOnIcon color="action" />
                  </InputAdornment>
                }
              />
              <Box className="itinerary_time_grid">
                <FormTextField
                  control={control}
                  labelName="Start time"
                  name="startTime"
                  type="time"
                />
                <FormTextField
                  control={control}
                  labelName="End time"
                  name="endTime"
                  type="time"
                />
              </Box>
              <FormTextArea
                control={control}
                labelName="Description"
                name="description"
                placeHolder="Add notes, booking details, or reminders..."
                rows={3}
              />
            </>
          )}
        </Box>

        <Box className="document_modal_footer">
          <Button disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit" variant="contained">
            {isSubmitting ? 'Saving...' : isDayMode ? 'Add Day' : isEditingActivity ? 'Save Activity' : 'Add Activity'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
