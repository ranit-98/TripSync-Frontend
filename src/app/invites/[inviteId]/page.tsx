import InviteResponsePage from '@/components/trips/InviteResponsePage';

type InvitePageProps = {
  params: Promise<{
    inviteId?: string;
  }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { inviteId = '' } = await params;

  return <InviteResponsePage inviteId={inviteId} />;
}
