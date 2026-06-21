import CreateTripFlow from '@/components/trips/CreateTripFlow';

export default async function EditTripPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;

  return <CreateTripFlow tripId={tripId} />;
}
