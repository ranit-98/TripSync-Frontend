'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import MapIcon from '@mui/icons-material/Map';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { CmsPageWrapper } from '@/styles/cms/cms.styles';

const features = [
  { icon: <ChatIcon />, title: 'No more scattered chats', copy: 'Keep decisions and conversations beside the itinerary they belong to.' },
  { icon: <ReceiptLongIcon />, title: 'Zero confusing splits', copy: 'Record expenses, see who owes whom, and confirm each payment clearly.' },
  { icon: <MapIcon />, title: 'No lost details', copy: 'Activities, documents, routes, and memories stay together from planning to home.' },
];

export default function CmsPage() {
  return <CmsPageWrapper>
    <Box className="cms_nav"><Container maxWidth="xl"><Stack className="cms_nav_inner" direction="row"><Link className="cms_brand" href="/"><MapIcon />TripSync</Link><Stack className="cms_links" direction="row"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#settlements">Settlements</a></Stack><Stack direction="row" spacing={1}><Button component={Link} href="/login">Login</Button><Button component={Link} href="/trips/create" variant="contained">Start planning</Button></Stack></Stack></Container></Box>
    <main>
      <section className="cms_hero"><Container maxWidth="xl"><Box className="cms_hero_grid"><Box><Typography className="cms_kicker">COLLABORATIVE TRAVEL, MADE CALM</Typography><Typography className="cms_title" component="h1">Plan trips <i>together.</i><br /><em>Travel better.</em></Typography><Typography className="cms_lead">One beautiful shared space for itineraries, expenses, conversations, photos, and every little travel detail.</Typography><Stack className="cms_ctas" direction="row"><Button component={Link} href="/trips/create" size="large" variant="contained">Create a trip</Button><Button endIcon={<ArrowForwardIcon />} href="#features">Explore features</Button></Stack></Box><Box className="cms_hero_art"><Box className="cms_art_sand" /><Box className="cms_art_photo" component="img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSRAQwBFRRytZqK9otUh3bIrTWoiVkmpfdBU92oNMogmF9mylUd7_dGdHEFonzjIxDoklTCjOBtPfLqWdVC15GArqtpXdNUhd7RV0ybLjUuIEPihp7QH3fLipLk55BGELoyzRbmTt-E_3R8qOEXqOKeMYRFiyS0Y-FAIksEh2gX44bCKUOp0o9PH5r_8WUekExsF0NC6tBIoNfjw8ClD2DIXzg5KGhVFBFLsdL0E7XKauNGTop5F_7Fuf7iF6URdQQs1ZzYJYWCyQ" /><Box className="cms_dashboard"><span>Trip workspace</span><strong>Shantiniketan Trip</strong><Box><b>₹32,600</b><small>shared expenses</small></Box><Box className="cms_lines"><i /><i /><i /></Box></Box></Box></Box></Container></section>
      <section className="cms_feature_section" id="features"><Container maxWidth="xl"><Typography className="cms_kicker gold">CORE PHILOSOPHY</Typography><Typography className="cms_section_title" component="h2">Everything a group trip needs, <i>without the chaos.</i></Typography><Box className="cms_feature_grid">{features.map((feature) => <Box className="cms_feature" key={feature.title}><Box className="cms_feature_icon">{feature.icon}</Box><Typography component="h3">{feature.title}</Typography><Typography>{feature.copy}</Typography></Box>)}</Box></Container></section>
      <section className="cms_steps" id="how-it-works"><Container maxWidth="lg"><Typography className="cms_section_title centered" component="h2">Three steps to <i>trip perfection.</i></Typography>{[['01','Create','Set the destination, dates, and details. Your group starts from one shared plan.'],['02','Invite','Bring everyone in with an invite and give each person the right access.'],['03','Plan & go','Build the itinerary, record expenses, and travel with everyone in sync.']].map(([number,title,copy]) => <Box className="cms_step" key={number}><span>{number}</span><Box><Typography component="h3">{title}</Typography><Typography>{copy}</Typography></Box></Box>)}</Container></section>
      <section className="cms_settlement" id="settlements"><Container maxWidth="lg"><Typography className="cms_kicker">SMART SETTLEMENTS</Typography><Typography className="cms_section_title" component="h2">Every shared payment, <i>made clear.</i></Typography><Typography className="cms_lead">TripSync calculates balances automatically. A member declares that they paid, and the person receiving it confirms—so everyone sees the same truth.</Typography><Box className="cms_flow"><span>Expense added</span><ArrowForwardIcon /><span>Split calculated</span><ArrowForwardIcon /><span>Payment declared</span><ArrowForwardIcon /><span>Receipt confirmed</span></Box></Container></section>
    </main>
  </CmsPageWrapper>;
}
