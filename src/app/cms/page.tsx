'use client';

import ProtectedCreateTripButton from '@/components/auth/ProtectedCreateTripButton';
import PublicNavbar from '@/components/layout/PublicNavbar';
import { CmsPageWrapper } from '@/styles/cms/cms.styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FolderIcon from '@mui/icons-material/Folder';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const featureCards = [
  {
    icon: <DashboardIcon />,
    title: 'Dashboard overview',
    copy: 'See active trips, upcoming plans, invite activity, and recent updates from one calm home base.',
  },
  {
    icon: <EventNoteIcon />,
    title: 'Shared itinerary',
    copy: 'Plan days, activities, timings, and notes so everyone follows the same schedule.',
  },
  {
    icon: <PaymentsIcon />,
    title: 'Expenses & splits',
    copy: 'Add shared costs, split them across members, and keep every amount traceable.',
  },
  {
    icon: <ReceiptLongIcon />,
    title: 'Settlements',
    copy: 'Track who owes whom, declare payments, confirm receipts, and close balances clearly.',
  },
  {
    icon: <ChatIcon />,
    title: 'Trip chat',
    copy: 'Keep decisions, voice notes, and attachments inside the trip instead of scattered across apps.',
  },
  {
    icon: <PhotoLibraryIcon />,
    title: 'Gallery albums',
    copy: 'Upload and browse trip photos so memories stay connected to the journey.',
  },
  {
    icon: <FolderIcon />,
    title: 'Files & documents',
    copy: 'Store tickets, IDs, PDFs, folders, and travel documents where the group can find them.',
  },
  {
    icon: <GroupAddIcon />,
    title: 'Invites & access',
    copy: 'Invite members, accept or decline trip invitations, and collaborate with the right group.',
  },
  {
    icon: <NotificationsIcon />,
    title: 'Notifications',
    copy: 'Stay aware of invites, trip activity, expenses, and updates without constantly checking.',
  },
];

const workspaceTabs = ['Itinerary', 'Expenses', 'Chat', 'Gallery', 'Files'];

const steps = [
  ['01', 'Create the trip', 'Set destination, dates, category, cover image, and the details your group needs.'],
  ['02', 'Invite your people', 'Bring friends into the workspace and keep everyone looking at the same source of truth.'],
  ['03', 'Plan every layer', 'Build the itinerary, upload files, chat with members, and collect photos.'],
  ['04', 'Settle cleanly', 'Record expenses, calculate balances, declare payments, and confirm receipts.'],
];

export default function CmsPage() {
  return (
    <CmsPageWrapper>
      <PublicNavbar />

      <main>
        <section className="cms_hero">
          <Container maxWidth="xl">
            <Box className="cms_hero_grid">
              <Box className="cms_hero_copy">
                <Typography className="cms_kicker">COLLABORATIVE TRAVEL, WITHOUT THE MESS</Typography>
                <Typography className="cms_title" component="h1">
                  TripSync keeps every group trip <i>in sync.</i>
                </Typography>
                <Typography className="cms_lead">
                  Plan itineraries, split expenses, chat with members, store files, collect photos, and track every
                  settlement from one shared workspace.
                </Typography>
                <Stack className="cms_ctas" direction="row">
                  <ProtectedCreateTripButton size="large" variant="contained">
                    Start planning
                  </ProtectedCreateTripButton>
                  <Button endIcon={<ArrowForwardIcon />} href="#features">
                    See functionality
                  </Button>
                </Stack>
              </Box>

              <Box className="cms_product_scene" aria-label="TripSync workspace preview">
                <Box className="cms_scene_photo" component="img" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" />
                <Box className="cms_workspace_card">
                  <Stack className="cms_card_top" direction="row">
                    <Box>
                      <span>Trip workspace</span>
                      <strong>Himalayan Road Trip</strong>
                    </Box>
                    <Box className="cms_status">Live</Box>
                  </Stack>
                  <Box className="cms_tab_row">
                    {workspaceTabs.map((tab) => (
                      <span key={tab}>{tab}</span>
                    ))}
                  </Box>
                  <Box className="cms_preview_grid">
                    <Box className="cms_metric primary">
                      <small>Shared expenses</small>
                      <b>Rs 32,600</b>
                    </Box>
                    <Box className="cms_metric">
                      <small>Members</small>
                      <b>6</b>
                    </Box>
                    <Box className="cms_activity">
                      <CheckCircleIcon />
                      <span>Payment receipt confirmed</span>
                    </Box>
                    <Box className="cms_activity soft">
                      <EventNoteIcon />
                      <span>Day 2 itinerary updated</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </section>

        <section className="cms_feature_section" id="features">
          <Container maxWidth="xl">
            <Box className="cms_section_head">
              <Typography className="cms_kicker gold">WHAT TRIPSYNC HANDLES</Typography>
              <Typography className="cms_section_title" component="h2">
                One workspace for the whole trip lifecycle.
              </Typography>
              <Typography className="cms_section_copy">
                From the first invite to the final settlement, every feature is connected to the trip instead of living
                in separate chats, spreadsheets, folders, and payment screenshots.
              </Typography>
            </Box>
            <Box className="cms_feature_grid">
              {featureCards.map((feature) => (
                <Box className="cms_feature" key={feature.title}>
                  <Box className="cms_feature_icon">{feature.icon}</Box>
                  <Typography component="h3">{feature.title}</Typography>
                  <Typography>{feature.copy}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </section>

        <section className="cms_workspace_section">
          <Container maxWidth="xl">
            <Box className="cms_workspace_layout">
              <Box>
                <Typography className="cms_kicker">BUILT FOR REAL GROUP PLANNING</Typography>
                <Typography className="cms_section_title compact" component="h2">
                  Decisions, documents, money, and memories stay together.
                </Typography>
                <Typography className="cms_lead">
                  Every trip has a dedicated workspace with tabs for itinerary, expenses, chat, gallery, and files.
                  Members can move through the trip without losing context.
                </Typography>
              </Box>
              <Box className="cms_workspace_panel">
                <Box className="cms_panel_nav">
                  <span className="active">Itinerary</span>
                  <span>Expenses</span>
                  <span>Chat</span>
                  <span>Gallery</span>
                  <span>Files</span>
                </Box>
                <Box className="cms_panel_body">
                  <Box className="cms_day_card">
                    <span>Day 01</span>
                    <strong>Arrival, hotel check-in, lakeside dinner</strong>
                    <small>3 activities | 2 files attached | 5 members updated</small>
                  </Box>
                  <Box className="cms_day_card">
                    <span>Day 02</span>
                    <strong>Cafe stop, documents, group photos</strong>
                    <small>Chat notes, file uploads, and gallery memories connected.</small>
                  </Box>
                  <Box className="cms_chat_strip">
                    <ChatIcon />
                    <span>Rahul: Uploaded tickets and added the dinner expense.</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </section>

        <section className="cms_steps" id="how-it-works">
          <Container maxWidth="lg">
            <Typography className="cms_section_title centered" component="h2">
              Four steps from idea to settled.
            </Typography>
            {steps.map(([number, title, copy]) => (
              <Box className="cms_step" key={number}>
                <span>{number}</span>
                <Box>
                  <Typography component="h3">{title}</Typography>
                  <Typography>{copy}</Typography>
                </Box>
              </Box>
            ))}
          </Container>
        </section>

        <section className="cms_settlement" id="settlements">
          <Container maxWidth="lg">
            <Typography className="cms_kicker">SMART SETTLEMENTS</Typography>
            <Typography className="cms_section_title compact" component="h2">
              Every shared payment, <i>made clear.</i>
            </Typography>
            <Typography className="cms_lead">
              TripSync calculates balances automatically. A member declares that they paid, and the receiver confirms
              the payment so everyone sees the same truth.
            </Typography>
            <Box className="cms_flow">
              <span>Expense added</span>
              <ArrowForwardIcon />
              <span>Split calculated</span>
              <ArrowForwardIcon />
              <span>Payment declared</span>
              <ArrowForwardIcon />
              <span>Receipt confirmed</span>
            </Box>
          </Container>
        </section>

        <section className="cms_final_cta">
          <Container maxWidth="md">
            <Typography className="cms_kicker">READY WHEN YOUR GROUP IS</Typography>
            <Typography className="cms_section_title centered compact" component="h2">
              Create the trip once. Keep everyone aligned until you are home.
            </Typography>
            <ProtectedCreateTripButton size="large" variant="contained">
              Start planning
            </ProtectedCreateTripButton>
          </Container>
        </section>
      </main>
    </CmsPageWrapper>
  );
}
