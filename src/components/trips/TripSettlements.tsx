import AppSidebar from '@/components/layout/AppSidebar';
import { tripItineraryAssets } from '@/json/assets';
import { TripSettlementsWrapper } from '@/styles/trips/settlements.styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const members = [
  { avatar: tripItineraryAssets.members[0], name: 'Alex' },
  { avatar: tripItineraryAssets.members[1], name: 'Sarah' },
  { avatar: tripItineraryAssets.members[2], name: 'Jordan' },
  { avatar: tripItineraryAssets.profile, name: 'Rahul' },
] as const;

const settlements = [
  {
    amount: '$82.00',
    from: members[0],
    settled: false,
    to: members[3],
  },
  {
    amount: '$32.50',
    from: members[1],
    settled: false,
    to: members[3],
  },
  {
    amount: '$45.00',
    from: members[2],
    settled: true,
    to: members[0],
  },
] as const;

const transactions = [
  {
    amount: '$240.00',
    date: 'Oct 12, 2025',
    description: 'Sunset Dinner',
    all: false,
    icon: RestaurantIcon,
    split: [members[0], members[1], members[2]],
    tone: 'primary',
  },
  {
    amount: '$120.00',
    date: 'Oct 14, 2025',
    description: 'Snorkeling Gear',
    all: false,
    icon: ScubaDivingIcon,
    split: [members[1], members[2]],
    tone: 'tertiary',
  },
  {
    amount: '$45.00',
    date: 'Oct 15, 2025',
    description: 'Scooter Rental',
    all: true,
    icon: DirectionsCarIcon,
    split: [members[0]],
    tone: 'secondary',
  },
] as const;

export default function TripSettlements() {
  return (
    <TripSettlementsWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box className="settlement_main" component="main">
        <Box className="topbar" component="header">
          <Stack className="topbar_title" direction="row">
            <IconButton className="back_btn" aria-label="Go back">
              <ArrowBackIcon />
            </IconButton>
            <Typography component="h1">Bali 2025 - Settlements</Typography>
          </Stack>

          <Stack className="topbar_actions" direction="row">
            <IconButton aria-label="Open notifications">
              <NotificationsIcon />
            </IconButton>
            <Box
              alt="User profile avatar"
              className="profile_avatar"
              component="img"
              src={tripItineraryAssets.profile}
            />
          </Stack>
        </Box>

        <Box className="content_area">
          <Box className="summary_grid" component="section">
            <Box className="summary_card">
              <Typography className="summary_label">Total Trip Spend</Typography>
              <Typography className="summary_value">$4,500.00</Typography>
              <Typography className="summary_hint">
                <TrendingUpIcon />
                8% higher than estimated
              </Typography>
            </Box>

            <Box className="summary_card split_card">
              <Typography className="summary_label">Split Among</Typography>
              <Stack className="split_row" direction="row">
                <Stack className="avatar_stack" direction="row">
                  {members.slice(0, 3).map((member) => (
                    <Box
                      alt={member.name}
                      className="stack_avatar"
                      component="img"
                      key={member.name}
                      src={member.avatar}
                    />
                  ))}
                  <span className="avatar_more">+1</span>
                </Stack>
                <Typography className="member_count">4 Members</Typography>
              </Stack>
            </Box>

            <Box className="summary_card share_card">
              <Typography className="summary_label">Your Share</Typography>
              <Typography className="summary_value">$1,125.00</Typography>
              <Typography className="summary_hint">Balance remaining to pay</Typography>
            </Box>
          </Box>

          <Box className="panel settlement_panel" component="section">
            <Box className="panel_header">
              <Typography className="panel_title" component="h2">
                Who Owes Whom
              </Typography>
              <span className="pending_pill">3 Pending Settlements</span>
            </Box>

            <Box className="settlement_list">
              {settlements.map((settlement) => (
                <Box
                  className={`settlement_row${settlement.settled ? ' settled' : ''}`}
                  key={`${settlement.from.name}-${settlement.to.name}-${settlement.amount}`}
                >
                  <Stack className="people_flow" direction="row">
                    <Stack className="person_block" direction="row">
                      <Box
                        alt={settlement.from.name}
                        className="person_avatar"
                        component="img"
                        src={settlement.from.avatar}
                      />
                      <Box>
                        <Typography className="person_name">{settlement.from.name}</Typography>
                        <Typography className="person_role">Payer</Typography>
                      </Box>
                    </Stack>

                    <ArrowForwardIcon className="flow_arrow" />

                    <Stack className="person_block" direction="row">
                      <Box
                        alt={settlement.to.name}
                        className="person_avatar"
                        component="img"
                        src={settlement.to.avatar}
                      />
                      <Box>
                        <Typography className="person_name">{settlement.to.name}</Typography>
                        <Typography className="person_role">Receiver</Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack className="settlement_action" direction="row">
                    <Typography className="settlement_amount">{settlement.amount}</Typography>
                    {settlement.settled ? (
                      <span className="settled_badge">
                        <CheckCircleIcon />
                        Settled
                      </span>
                    ) : (
                      <Button className="settle_btn">Mark Settled</Button>
                    )}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="tabs" component="section">
            <Button className="tab_btn active" startIcon={<ReceiptLongIcon />}>
              My Transactions
            </Button>
            <Button className="tab_btn" startIcon={<ListAltIcon />}>
              Full Expense Log
            </Button>
          </Box>

          <Box className="panel transaction_panel">
            <Box className="transaction_table">
              <Box className="transaction_row transaction_head">
                <span>Date</span>
                <span>Description</span>
                <span>Amount</span>
                <span>Split With</span>
                <span>Action</span>
              </Box>

              {transactions.map((transaction) => {
                const Icon = transaction.icon;

                return (
                  <Box className="transaction_row" key={transaction.description}>
                    <span className="date_cell">{transaction.date}</span>
                    <Stack className="description_cell" direction="row">
                      <Box className={`transaction_icon ${transaction.tone}`}>
                        <Icon />
                      </Box>
                      <strong>{transaction.description}</strong>
                    </Stack>
                    <strong>{transaction.amount}</strong>
                    <Stack className="mini_avatar_stack" direction="row">
                      {transaction.split.map((member) => (
                        <Box
                          alt={member.name}
                          className="mini_avatar"
                          component="img"
                          key={member.name}
                          src={member.avatar}
                        />
                      ))}
                      {transaction.all && <span className="all_badge">ALL</span>}
                    </Stack>
                    <IconButton aria-label={`Open ${transaction.description} actions`}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Button className="fab_btn" startIcon={<AddIcon />} variant="contained">
          Add Expense
        </Button>
      </Box>
    </TripSettlementsWrapper>
  );
}
