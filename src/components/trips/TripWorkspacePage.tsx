"use client";

import {
  useTripDetails,
  useTripMembers,
  useTripsArchive,
  useTripsLeave,
} from "@/api/hooks/trips/useTrips.hooks";
import { useExpensesSettlements } from "@/api/hooks/expenses/useExpenses.hooks";
import AppSidebar from "@/components/layout/AppSidebar";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import { PageLoader } from "@/components/skeleton";
import { useTripWorkspaceUiStore } from "@/store";
import { useAuthStore } from "@/store/auth/auth.store";
import { canManageTrip } from "@/lib/functions/tripPermissions";
import type { ISettlement } from "@/typescript/interface/api";
import { TripItineraryWrapper } from "@/styles/trips/itinerary.styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaymentsIcon from "@mui/icons-material/Payments";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ActiveTab from "./workspace/ActiveTab";
import TripHero from "./workspace/TripHero";
import TripTabBar from "./workspace/TripTabBar";
import type { TripWorkspaceTab } from "./workspace/shared";

const InviteModal = dynamic(() => import("./workspace/InviteModal"), { ssr: false });

export default function TripWorkspacePage({
  activeTab,
  expensesView,
}: {
  activeTab: TripWorkspaceTab;
  expensesView?: "expenses" | "settlements" | "insights";
}) {
  const params = useParams<{ tripId?: string }>();
  const router = useRouter();
  const tripId = params.tripId ?? "";
  const showHero = useTripWorkspaceUiStore((state) =>
    state.isTripHeroExpanded(tripId),
  );
  const setTripHeroExpanded = useTripWorkspaceUiStore(
    (state) => state.setTripHeroExpanded,
  );
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [isPaymentBannerDismissed, setIsPaymentBannerDismissed] = useState(false);
  const [isHeroMounted, setIsHeroMounted] = useState(showHero);
  const currentUser = useAuthStore((state) => state.user);
  const { data: tripResponse, isLoading: isTripLoading } =
    useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: settlementsResponse } = useExpensesSettlements(tripId);
  const trip = tripResponse?.data.data ?? null;
  const members = membersResponse?.data.data ?? [];
  const canEditTrip = canManageTrip(members, currentUser);
  const settlementData = settlementsResponse?.data.data;
  const settlements = Array.isArray(settlementData)
    ? (settlementData as ISettlement[])
    : [];
  const paymentsDue = settlements.filter(
    (settlement) =>
      settlement.fromUserId === currentUser?.id &&
      settlement.status === "pending" &&
      Number(settlement.amount || 0) > 0.005,
  );
  const totalPaymentDue = paymentsDue.reduce(
    (total, settlement) => total + Number(settlement.amount || 0),
    0,
  );
  const paymentCurrency = paymentsDue[0]?.currency || trip?.currency || "USD";
  const archiveTrip = useTripsArchive({ optionalCallback: () => router.push("/trips") });
  const leaveTrip = useTripsLeave({ optionalCallback: () => router.push("/trips") });
  const unsettledLeaveBalances = settlements.filter(
    (settlement) =>
      (settlement.fromUserId === currentUser?.id || settlement.toUserId === currentUser?.id) &&
      settlement.status !== "paid" &&
      !settlement.isPaid &&
      Number(settlement.amount || 0) > 0.005,
  );
  const leaveBlockedAmount = unsettledLeaveBalances.reduce(
    (total, settlement) => total + Number(settlement.amount || 0),
    0,
  );
  const leaveBlockedCurrency = unsettledLeaveBalances[0]?.currency || trip?.currency || "USD";
  const isLeaveBlocked = unsettledLeaveBalances.length > 0;

  useEffect(() => {
    if (showHero) {
      setIsHeroMounted(true);
      return;
    }

    const timer = window.setTimeout(() => setIsHeroMounted(false), 280);
    return () => window.clearTimeout(timer);
  }, [showHero]);

  return (
    <TripItineraryWrapper>
      <AppSidebar active="trips" showNewTrip />

      <Box
        className={`trip_main ${showHero ? "hero_expanded" : "hero_collapsed"}`}
        component="main"
      >
        {isHeroMounted ? (
          <Box className={showHero ? "hero_transition is_expanded" : "hero_transition is_collapsing"}>
            <TripHero
            canManage={canEditTrip}
            isLoading={isTripLoading}
            members={members}
            onCollapse={() => setTripHeroExpanded(tripId, false)}
            onDelete={() => setShowDeleteDialog(true)}
            onEdit={() => router.push(`/trips/${tripId}/edit`)}
            onInvite={() => setShowInviteModal(true)}
            onLeave={() => setShowLeaveDialog(true)}
            trip={trip}
          />
          </Box>
        ) : (
          <Box className="collapsed_trip_header">
            <IconButton
              className="collapsed_back_btn"
              component={Link}
              href="/trips"
              aria-label="Back to trips"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box className="collapsed_trip_copy">
              <Typography component="h1">
                {isTripLoading
                  ? "Loading trip..."
                  : trip?.title || "Untitled trip"}
              </Typography>
              <span>Trip workspace</span>
            </Box>
            <Button
              className="hero_restore"
              startIcon={<KeyboardArrowDownIcon />}
              onClick={() => setTripHeroExpanded(tripId, true)}
            >
              Show Trip Banner
            </Button>
          </Box>
        )}
        <TripTabBar activeTab={activeTab} tripId={tripId} />
        {paymentsDue.length > 0 && !isPaymentBannerDismissed && (
          <Box className="payment_due_banner" role="alert">
            <Box className="payment_due_icon"><PaymentsIcon /></Box>
            <Box className="payment_due_copy">
              <strong>You have a payment due</strong>
              <span>
                You need to pay {new Intl.NumberFormat("en-US", { currency: paymentCurrency, style: "currency" }).format(totalPaymentDue)} across {paymentsDue.length} {paymentsDue.length === 1 ? "balance" : "balances"}.
              </span>
            </Box>
            <Button
              className="payment_due_action"
              component={Link}
              href={`/trips/${tripId}/expenses/balances`}
              variant="contained"
            >
              Review payment
            </Button>
            <IconButton
              aria-label="Close payment due banner"
              className="payment_due_close"
              onClick={() => setIsPaymentBannerDismissed(true)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        <ErrorBoundary fallbackClassName="trip_tab_error">
          <Suspense fallback={<PageLoader wrapperCls="page-loader" />}>
            <ActiveTab
              activeTab={activeTab}
              canManage={canEditTrip}
              expensesView={expensesView}
              onInvite={canEditTrip ? () => setShowInviteModal(true) : undefined}
              tripId={tripId}
            />
          </Suspense>
        </ErrorBoundary>
      </Box>

      {canEditTrip && showInviteModal && (
        <InviteModal
          members={members}
          onClose={() => setShowInviteModal(false)}
          trip={trip}
          tripId={tripId}
        />
      )}

      <Dialog onClose={() => setShowDeleteDialog(false)} open={canEditTrip && showDeleteDialog}>
        <DialogTitle>Delete trip?</DialogTitle>
        <DialogContent>This will permanently remove {trip?.title || "this trip"} and its shared trip data.</DialogContent>
        <DialogActions>
          <Button disabled={archiveTrip.isPending} onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button color="error" disabled={archiveTrip.isPending} onClick={() => archiveTrip.mutate({ tripId })} variant="contained">{archiveTrip.isPending ? "Deleting..." : "Delete trip"}</Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={() => setShowLeaveDialog(false)} open={showLeaveDialog}>
        <DialogTitle>{isLeaveBlocked ? "Settle payments first" : "Leave trip?"}</DialogTitle>
        <DialogContent>
          {isLeaveBlocked ? (
            <Box>
              <Typography>
                You have {unsettledLeaveBalances.length} unsettled {unsettledLeaveBalances.length === 1 ? "balance" : "balances"} totaling{" "}
                {new Intl.NumberFormat("en-US", { currency: leaveBlockedCurrency, style: "currency" }).format(leaveBlockedAmount)}.
                Settle them before leaving {trip?.title || "this trip"}.
              </Typography>
            </Box>
          ) : (
            <Typography>
              You will be removed from {trip?.title || "this trip"} and it will no longer appear in your trips.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={leaveTrip.isPending} onClick={() => setShowLeaveDialog(false)}>Cancel</Button>
          {isLeaveBlocked ? (
            <Button component={Link} href={`/trips/${tripId}/expenses/balances`} onClick={() => setShowLeaveDialog(false)} variant="contained">
              Review balances
            </Button>
          ) : (
            <Button color="error" disabled={leaveTrip.isPending} onClick={() => leaveTrip.mutate({ tripId })} variant="contained">
              {leaveTrip.isPending ? "Leaving..." : "Leave trip"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </TripItineraryWrapper>
  );
}
