import AlbumGalleryPage from '@/components/albums/AlbumGalleryPage';

type AlbumGalleryRoutePageProps = {
  params: Promise<{
    tripId: string;
  }>;
};

export default async function AlbumGalleryRoutePage({ params }: AlbumGalleryRoutePageProps) {
  const { tripId } = await params;

  return <AlbumGalleryPage tripId={tripId} />;
}
