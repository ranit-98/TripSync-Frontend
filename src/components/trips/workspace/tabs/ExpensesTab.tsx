'use client';

import {
  useExpensesCreate,
  useExpensesConfirmSettlementPaid,
  useExpensesDelete,
  useExpensesCreateRazorpayOrder,
  useExpensesList,
  useExpensesMarkSettlementPaid,
  useExpensesSendSettlementReminders,
  useExpensesSettlements,
  useExpensesUpdate,
  useExpensesVerifyRazorpayPayment,
} from '@/api/hooks/expenses/useExpenses.hooks';
import { useTripDetails, useTripMembers } from '@/api/hooks/trips/useTrips.hooks';
import { ExpensesSkeleton } from '@/components/skeleton';
import ImageComp from '@/components/image/ImageComp';
import { tripItineraryAssets } from '@/json/assets';
import { useAuthStore } from '@/store/auth/auth.store';
import type {
  ApiId,
  ICreateExpensePayload,
  IExpense,
  ISettlement,
  ITripMember,
  IUser,
} from '@/typescript/interface/api';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import InsightsIcon from '@mui/icons-material/Insights';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  addExpenseSchema,
  expenseCategories,
  type AddExpenseFormValues,
} from '../shared';

type MemberOption = {
  avatar: string;
  label: string;
  userId: ApiId;
};

const fallbackAvatar = tripItineraryAssets.profile;
type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  amount: number;
  currency: string;
  description: string;
  handler: (response: RazorpayPaymentResponse) => void;
  key: string;
  modal?: { ondismiss?: () => void };
  name: string;
  order_id: string;
  prefill?: { email?: string; name?: string };
};

type RazorpayCheckoutInstance = {
  on: (event: 'payment.failed', handler: (response: { error?: { description?: string } }) => void) => void;
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

const loadRazorpayCheckout = () =>
  new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Razorpay Checkout is only available in the browser.'));
      return;
    }

    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Razorpay Checkout.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load Razorpay Checkout.'));
    document.body.appendChild(script);
  });

const categoryConfig = {
  activity: { icon: PaymentsIcon, label: 'Activities', tone: 'primary' },
  flight: { icon: FlightIcon, label: 'Flights', tone: 'secondary' },
  food: { icon: RestaurantIcon, label: 'Food & Dining', tone: 'primary' },
  hotel: { icon: HotelIcon, label: 'Accommodation', tone: 'tertiary' },
  transport: { icon: DirectionsCarIcon, label: 'Transportation', tone: 'secondary' },
} as const;

const toArray = <T,>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidates = [record.expenses, record.settlements, record.items, record.data];
    const arrayValue = candidates.find(Array.isArray);

    if (arrayValue) return arrayValue as T[];
  }

  return [];
};

const formatMoney = (amount = 0, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    currency,
    maximumFractionDigits: 2,
    style: 'currency',
  }).format(amount);

const formatExpenseDate = (value?: string) => {
  const date = value ? new Date(value) : null;

  if (!date || Number.isNaN(date.getTime())) return 'Date not set';

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const normalizeCategory = (category?: string) => {
  const value = (category || '').toLowerCase();

  if (value.includes('food') || value.includes('dining') || value.includes('restaurant')) return 'food';
  if (value.includes('hotel') || value.includes('accommodation') || value.includes('stay')) return 'hotel';
  if (value.includes('transport') || value.includes('car') || value.includes('taxi')) return 'transport';
  if (value.includes('flight')) return 'flight';
  if (value.includes('activity') || value.includes('ticket')) return 'activity';

  return 'activity';
};

const getCategoryMeta = (category?: string) => categoryConfig[normalizeCategory(category)];

const getUserName = (user?: IUser | null) => user?.name || user?.email || 'Trip member';

const getMemberOptionFromUser = (user?: IUser | null, currentUserId?: ApiId): MemberOption | null => {
  if (!user?.id) return null;

  return {
    avatar: user.avatarUrl || fallbackAvatar,
    label: currentUserId === user.id ? 'You' : getUserName(user),
    userId: user.id,
  };
};

const buildMemberOptions = (members: ITripMember[], currentUser: IUser | null): MemberOption[] => {
  const options = new Map<ApiId, MemberOption>();

  if (currentUser?.id) {
    options.set(currentUser.id, {
      avatar: currentUser.avatarUrl || fallbackAvatar,
      label: 'You',
      userId: currentUser.id,
    });
  }

  members.forEach((member, index) => {
    if (!member.user?.id) return;

    options.set(member.user.id, {
      avatar: member.user.avatarUrl || tripItineraryAssets.members[index % tripItineraryAssets.members.length] || fallbackAvatar,
      label: currentUser?.id === member.user.id ? 'You' : getUserName(member.user),
      userId: member.user.id,
    });
  });

  return Array.from(options.values());
};

const getExpensePaidBy = (
  expense: IExpense,
  membersById: Map<ApiId, MemberOption>,
  currentUserId?: ApiId
) => {
  return (
    membersById.get(expense.paidByUserId) ??
    getMemberOptionFromUser(expense.paidBy, currentUserId) ?? {
      avatar: fallbackAvatar,
      label: 'Trip member',
      userId: expense.paidByUserId,
    }
  );
};

const getExpenseSplits = (
  expense: IExpense,
  membersById: Map<ApiId, MemberOption>,
  currentUserId?: ApiId
) => {
  const splits = expense.splits ?? [];

  if (!splits.length) {
    const paidBy = getExpensePaidBy(expense, membersById, currentUserId);

    return paidBy ? [paidBy] : [];
  }

  return splits
    .map((split) => membersById.get(split.userId) ?? getMemberOptionFromUser(split.user, currentUserId))
    .filter((member): member is MemberOption => Boolean(member));
};

const getSettlementText = (
  settlement: ISettlement,
  membersById: Map<ApiId, MemberOption>,
  currentUserId?: string
) => {
  const from = settlement.fromUserId ? membersById.get(settlement.fromUserId) : undefined;
  const to = settlement.toUserId ? membersById.get(settlement.toUserId) : undefined;
  const fromName = settlement.fromUserId === currentUserId ? 'You' : from?.label || 'Someone';
  const toName = settlement.toUserId === currentUserId ? 'you' : to?.label || 'someone';

  if (settlement.fromUserId === currentUserId) {
    return {
      avatar: to?.avatar || fallbackAvatar,
      title: `You owe ${to?.label || 'someone'}`,
    };
  }

  if (settlement.toUserId === currentUserId) {
    return {
      avatar: from?.avatar || fallbackAvatar,
      title: `${from?.label || 'Someone'} owes you`,
    };
  }

  return {
    avatar: from?.avatar || fallbackAvatar,
    title: `${fromName} owes ${toName}`,
  };
};

const isSettlementPaid = (settlement: ISettlement) => settlement.isPaid || settlement.status === 'paid';
const isSettlementOutstanding = (settlement: ISettlement) =>
  !isSettlementPaid(settlement) && Number(settlement.amount || 0) > 0.005;

function AddExpenseModal({
  currency,
  initialExpense,
  isSubmitting,
  members,
  onClose,
  onSubmitExpense,
  tripTitle,
}: {
  currency: string;
  initialExpense?: IExpense | null;
  isSubmitting: boolean;
  members: MemberOption[];
  onClose: () => void;
  onSubmitExpense: (values: AddExpenseFormValues) => void;
  tripTitle?: string;
}) {
  const defaultMemberIds = members.map((member) => member.userId);
  const initialSplitIds = initialExpense?.splits?.map((split) => split.userId) ?? defaultMemberIds;

  const buildEqualAmounts = (ids: string[], total: number): Record<string, number> => {
    if (!ids.length) return {};
    const each = Number((total / ids.length).toFixed(2));
    const result: Record<string, number> = {};
    let assigned = 0;
    ids.forEach((id, i) => {
      if (i === ids.length - 1) {
        result[id] = Number((total - assigned).toFixed(2));
      } else {
        result[id] = each;
        assigned += each;
      }
    });
    return result;
  };

  const initialSplitAmounts: Record<string, number> = (() => {
    if (initialExpense?.splits?.length) {
      return Object.fromEntries(initialExpense.splits.map((s) => [s.userId, s.amount]));
    }
    return buildEqualAmounts(initialSplitIds.length ? initialSplitIds : defaultMemberIds, initialExpense?.amount ?? 0);
  })();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<AddExpenseFormValues>({
    defaultValues: {
      amount: initialExpense?.amount ?? 0,
      category: initialExpense?.category ?? 'food',
      date: initialExpense?.expenseDate ? new Date(initialExpense.expenseDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      description: initialExpense?.description ?? '',
      notes: initialExpense?.notes ?? '',
      paidBy: initialExpense?.paidByUserId ?? defaultMemberIds[0] ?? '',
      splitWith: initialSplitIds.length ? initialSplitIds : defaultMemberIds,
      splitAmounts: initialSplitAmounts,
    },
    mode: 'onBlur',
    resolver: yupResolver(addExpenseSchema),
  });

  const watchedAmount = useWatch({ control, name: 'amount' });
  const watchedSplitWith = useWatch({ control, name: 'splitWith' });

  // Auto-recalculate equal split when member selection or amount changes
  useEffect(() => {
    const ids = getValues('splitWith');
    const total = getValues('amount');
    if (!ids?.length || !total) return;
    setValue('splitAmounts', buildEqualAmounts(ids, total));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedSplitWith, watchedAmount]);

  const onSubmit: SubmitHandler<AddExpenseFormValues> = (values) => {
    onSubmitExpense(values);
  };

  return (
    <Box className="expense_modal_overlay">
      <Box className="expense_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="expense_modal_header">
          <Box>
            <Typography component="h3">{initialExpense ? 'Edit Expense' : 'Add Expense'}</Typography>
            <Typography>
              {initialExpense ? 'Update this shared cost.' : `Add a shared cost to ${tripTitle || 'this trip'}.`}
            </Typography>
          </Box>
          <IconButton aria-label="Close add expense modal" disabled={isSubmitting} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box className="expense_modal_body">
          <Box className="expense_field full">
            <Typography className="expense_modal_label">Description</Typography>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.description}
                  fullWidth
                  helperText={errors.description?.message}
                  placeholder="e.g. Team dinner"
                />
              )}
            />
          </Box>

          <Box className="expense_field">
            <Typography className="expense_modal_label">Category</Typography>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <TextField {...field} error={!!errors.category} fullWidth helperText={errors.category?.message} select>
                  {expenseCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <MenuItem key={category.value} value={category.value}>
                        <Box className="expense_select_option">
                          <Icon fontSize="small" />
                          {category.label}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
          </Box>

          <Box className="expense_field">
            <Typography className="expense_modal_label">Amount</Typography>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.amount}
                  fullWidth
                  helperText={errors.amount?.message}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  placeholder="0.00"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountBalanceWalletIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type="number"
                  value={field.value || ''}
                />
              )}
            />
          </Box>

          <Box className="expense_field">
            <Typography className="expense_modal_label">Paid by</Typography>
            <Controller
              control={control}
              name="paidBy"
              render={({ field }) => (
                <TextField {...field} error={!!errors.paidBy} fullWidth helperText={errors.paidBy?.message} select>
                  {members.map((member) => (
                    <MenuItem key={member.userId} value={member.userId}>
                      {member.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          <Box className="expense_field">
            <Typography className="expense_modal_label">Date</Typography>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.date}
                  fullWidth
                  helperText={errors.date?.message}
                  type="date"
                />
              )}
            />
          </Box>

          {/* ── Split with: member checkboxes ── */}
          <Box className="expense_field full">
            <Typography className="expense_modal_label">Split with</Typography>
            <Controller
              control={control}
              name="splitWith"
              render={({ field }) => (
                <Box className="split_member_grid">
                  {members.map((member) => {
                    const active = field.value.includes(member.userId);

                    return (
                      <Box
                        className={`split_member${active ? ' active' : ''}`}
                        component="label"
                        key={member.userId}
                      >
                        <input
                          checked={active}
                          type="checkbox"
                          onChange={() => {
                            const nextIds = active
                              ? field.value.filter((v) => v !== member.userId)
                              : [...field.value, member.userId];
                            field.onChange(nextIds);
                          }}
                        />
                        <ImageComp alt="" className="split_avatar" isAvatar src={member.avatar} />
                        <span>{member.label}</span>
                      </Box>
                    );
                  })}
                </Box>
              )}
            />
            {errors.splitWith?.message && (
              <Typography className="expense_error" color="error" variant="caption">
                {errors.splitWith.message}
              </Typography>
            )}
          </Box>

          {/* ── Split amounts table (shown after member selection) ── */}
          {watchedSplitWith?.length > 0 && (
            <Box className="expense_field full">
              <Typography className="expense_modal_label">Split amounts</Typography>
              <Controller
                control={control}
                name="splitAmounts"
                render={({ field: amountsField }) => {
                  const selectedMembers = members.filter((m) => watchedSplitWith.includes(m.userId));
                  const currentAmounts = amountsField.value as Record<string, number>;
                  const total = Number(watchedAmount) || 0;
                  const assignedSum = watchedSplitWith.reduce(
                    (acc, id) => acc + (Number(currentAmounts[id]) || 0),
                    0
                  );
                  const remaining = Number((total - assignedSum).toFixed(2));
                  const isBalanced = Math.abs(remaining) < 0.01;

                  return (
                    <Box className="split_amounts_table">
                      <Box className="split_amounts_head">
                        <span>Member</span>
                        <span>Amount ({currency})</span>
                      </Box>
                      {selectedMembers.map((member) => (
                        <Box className="split_amounts_row" key={member.userId}>
                          <Box className="split_amounts_member">
                            <ImageComp alt="" className="split_avatar" isAvatar src={member.avatar} />
                            <span>{member.label}</span>
                          </Box>
                          <TextField
                            className="split_amount_input"
                            size="small"
                            type="number"
                            value={currentAmounts[member.userId] ?? ''}
                            onChange={(e) => {
                              amountsField.onChange({
                                ...currentAmounts,
                                [member.userId]: Number(e.target.value),
                              });
                            }}
                            slotProps={{
                              htmlInput: { min: 0, step: 0.01 },
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">{currency}</InputAdornment>
                                ),
                              },
                            }}
                          />
                        </Box>
                      ))}
                      <Box className={`split_amounts_footer${isBalanced ? ' balanced' : ' unbalanced'}`}>
                        <span>Remaining</span>
                        <strong>
                          {remaining > 0 ? '+' : ''}{remaining.toFixed(2)}
                        </strong>
                        {!isBalanced && (
                          <Typography className="split_remaining_hint" color="error" variant="caption">
                            Split amounts must equal the total ({currency} {total.toFixed(2)})
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                }}
              />
              {errors.splitAmounts?.message && (
                <Typography className="expense_error" color="error" variant="caption">
                  {String(errors.splitAmounts.message)}
                </Typography>
              )}
            </Box>
          )}

          <Box className="expense_field full">
            <Typography className="expense_modal_label">Notes</Typography>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.notes}
                  fullWidth
                  helperText={errors.notes?.message}
                  multiline
                  placeholder="Add receipt notes or settlement details..."
                  rows={3}
                />
              )}
            />
          </Box>
        </Box>

        <Box className="expense_modal_footer">
          <Button disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting || !members.length} type="submit" variant="contained">
            {isSubmitting ? 'Saving...' : initialExpense ? 'Save Changes' : `Save ${currency} Expense`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function ExpensesTab({ tripId }: { tripId: string }) {
  const [showBudget, setShowBudget] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [deleteExpenseCandidate, setDeleteExpenseCandidate] = useState<IExpense | null>(null);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expensePage, setExpensePage] = useState(1);
  const currentUser = useAuthStore((state) => state.user);
  const { data: tripResponse } = useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: expensesResponse, isLoading: isExpensesLoading } = useExpensesList(tripId, expensePage);
  const { data: settlementsResponse, isLoading: isSettlementsLoading } = useExpensesSettlements(tripId);
  const createExpense = useExpensesCreate({ optionalCallback: () => setShowAddExpenseModal(false) });
  const updateExpense = useExpensesUpdate({ optionalCallback: () => setEditingExpense(null) });
  const deleteExpense = useExpensesDelete({
    optionalCallback: () => {
      setSelectedExpense(null);
      setDeleteExpenseCandidate(null);
    },
  });
  const markSettlementPaid = useExpensesMarkSettlementPaid({ optionalCallback: () => undefined });
  const confirmSettlementPaid = useExpensesConfirmSettlementPaid({ optionalCallback: () => undefined });
  const sendReminders = useExpensesSendSettlementReminders({ optionalCallback: () => undefined });
  const createRazorpayOrder = useExpensesCreateRazorpayOrder();
  const verifyRazorpayPayment = useExpensesVerifyRazorpayPayment({ optionalCallback: () => undefined });
  const trip = tripResponse?.data.data ?? null;
  const currency = trip?.currency || 'USD';
  const members = useMemo(
    () => buildMemberOptions(toArray<ITripMember>(membersResponse?.data.data), currentUser),
    [currentUser, membersResponse?.data.data]
  );
  const membersById = useMemo(
    () => new Map(members.map((member) => [member.userId, member])),
    [members]
  );
  const expenses = useMemo(
    () => toArray<IExpense>(expensesResponse?.data.data),
    [expensesResponse?.data.data]
  );
  const expensePagination = expensesResponse?.data.pagination;
  const settlements = useMemo(
    () => toArray<ISettlement>(settlementsResponse?.data.data),
    [settlementsResponse?.data.data]
  );
  const visibleExpenses = useMemo(
    () =>
      categoryFilter === 'all'
        ? expenses
        : expenses.filter((expense) => normalizeCategory(expense.category) === categoryFilter),
    [categoryFilter, expenses]
  );
  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);
  const activeSettlement = settlements.find((settlement) => settlement.status === 'pending' && settlement.fromUserId === currentUser?.id);
  const pendingConfirmation = settlements.find((settlement) => settlement.status === 'payment_declared' && settlement.toUserId === currentUser?.id);
  const hasOutstandingSettlement = Boolean(activeSettlement || pendingConfirmation);
  const netBalance = settlements.reduce((total, settlement) => {
    if (!isSettlementOutstanding(settlement)) return total;

    const amount = Number(settlement.amount || 0);

    if (settlement.toUserId === currentUser?.id) return total + amount;
    if (settlement.fromUserId === currentUser?.id) return total - amount;

    return total;
  }, 0);
  const topCategory = useMemo(() => {
    const totals = expenses.reduce<Record<string, number>>((result, expense) => {
      const category = normalizeCategory(expense.category);
      result[category] = (result[category] ?? 0) + Number(expense.amount || 0);

      return result;
    }, {});

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0];
  }, [expenses]);

  if (isExpensesLoading && isSettlementsLoading) {
    return <ExpensesSkeleton />;
  }

  const getExpensePayload = (values: AddExpenseFormValues): ICreateExpensePayload => {
    // Use custom split amounts; fall back to equal split if amounts map is empty
    const equalAmount = Number((values.amount / values.splitWith.length).toFixed(2));

    return {
      amount: values.amount,
      category: values.category,
      currency,
      description: values.description.trim(),
      expenseDate: values.date,
      notes: values.notes.trim() || undefined,
      paidByUserId: values.paidBy,
      splits: values.splitWith.map((userId) => ({
        amount: Number(values.splitAmounts?.[userId] ?? equalAmount),
        userId,
      })),
    };
  };

  const handleCreateExpense = (values: AddExpenseFormValues) => {
    const body = getExpensePayload(values);

    createExpense.mutate({ body, tripId });
  };

  const handleUpdateExpense = (values: AddExpenseFormValues) => {
    if (!editingExpense?.id) return;

    updateExpense.mutate({ body: getExpensePayload(values), expenseId: editingExpense.id, tripId });
  };

  const handleConfirmDeleteExpense = () => {
    if (!deleteExpenseCandidate?.id) return;

    deleteExpense.mutate({ expenseId: deleteExpenseCandidate.id, tripId });
  };

  const handlePaySettlement = async (settlement: ISettlement) => {
    if (!settlement.id) return;

    try {
      await loadRazorpayCheckout();
      const orderResponse = await createRazorpayOrder.mutateAsync({ settlementId: settlement.id, tripId });
      const order = orderResponse.data.data;
      const Razorpay = window.Razorpay;
      if (!order || !Razorpay) throw new Error('Razorpay Checkout is unavailable.');

      await new Promise<void>((resolve, reject) => {
        const checkout = new Razorpay({
          amount: order.amount,
          currency: order.currency,
          description: 'Trip settlement payment',
          handler: async (response) => {
            try {
              await verifyRazorpayPayment.mutateAsync({
                body: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
                settlementId: settlement.id,
                tripId,
              });
              toast.success('Payment verified successfully.');
              resolve();
            } catch (error) {
              reject(error instanceof Error ? error : new Error('Payment verification failed.'));
            }
          },
          key: order.keyId,
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled.')),
          },
          name: 'TripSync',
          order_id: order.orderId,
          prefill: {
            email: currentUser?.email,
            name: currentUser?.name || currentUser?.email,
          },
        });

        checkout.on('payment.failed', (response) => {
          reject(new Error(response.error?.description || 'Payment failed.'));
        });
        checkout.open();
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to start Razorpay payment.');
    }
  };

  return (
    <Box className="tab_page padded_page">
      {showBudget ? (
        <Box className="budget_banner" component="section">
          <IconButton
            className="banner_toggle"
            aria-label="Collapse budget summary"
            onClick={() => setShowBudget(false)}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <Stack className="budget_content" direction="row">
            <Box>
              <Typography className="eyebrow">Total spent so far</Typography>
              <Stack className="budget_amount" direction="row">
                <Typography component="h2">{formatMoney(totalSpent, currency)}</Typography>
                <span>
                  / {expenses.length} recorded expense{expenses.length === 1 ? '' : 's'}
                </span>
              </Stack>
            </Box>
            <Box className="budget_progress">
              <Stack direction="row">
                <span>Spending activity</span>
                <strong>Live</strong>
              </Stack>
              <Box className="progress_track">
                <span style={{ width: '100%' }} />
              </Box>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Button
          className="budget_restore"
          onClick={() => setShowBudget(true)}
          startIcon={<KeyboardArrowDownIcon />}
        >
          Show Budget Banner
        </Button>
      )}

      <Box className="expense_grid">
        <Box className="expense_list">
          <Stack className="section_row" direction="row">
            <Typography className="section_heading" component="h2">
              Recent Expenses
            </Typography>
            <Button
              className="plain_action"
              endIcon={<FilterListIcon />}
              onClick={(event) => setFilterAnchor(event.currentTarget)}
            >
              {categoryFilter === 'all' ? 'Filter' : getCategoryMeta(categoryFilter).label}
            </Button>
            <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
              <MenuItem
                selected={categoryFilter === 'all'}
                onClick={() => {
                  setCategoryFilter('all');
                  setFilterAnchor(null);
                }}
              >
                All categories
              </MenuItem>
              {expenseCategories.map((category) => (
                <MenuItem
                  key={category.value}
                  selected={categoryFilter === category.value}
                  onClick={() => {
                    setCategoryFilter(category.value);
                    setFilterAnchor(null);
                  }}
                >
                  {category.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          <Box className="expense_table">
            <Box className="expense_row expense_head">
              <span>Description</span>
              <span>Amount</span>
              <span>Paid By</span>
              <span>Date</span>
              <span>Split</span>
              <span>Actions</span>
            </Box>
            {isExpensesLoading ? (
              <Box className="empty_inline">Loading expenses...</Box>
            ) : visibleExpenses.length ? (
              visibleExpenses.map((expense) => {
                const category = getCategoryMeta(expense.category);
                const Icon = category.icon;
                const paidBy = getExpensePaidBy(expense, membersById, currentUser?.id);
                const splits = getExpenseSplits(expense, membersById, currentUser?.id);

                return (
                  <Box className="expense_row" key={expense.id}>
                    <Stack className="expense_desc" direction="row">
                      <Box className={`expense_icon ${category.tone}`}>
                        <Icon />
                      </Box>
                      <Box>
                        <strong>{expense.description}</strong>
                        <span>{category.label}</span>
                      </Box>
                    </Stack>
                    <strong>{formatMoney(expense.amount, expense.currency || currency)}</strong>
                    <Stack className="paid_by_cell" direction="row">
                      <ImageComp alt={paidBy.label} className="paid_avatar" isAvatar src={paidBy.avatar} />
                      <span>{paidBy.label}</span>
                    </Stack>
                    <span className="muted_text">{formatExpenseDate(expense.expenseDate)}</span>
                    <Stack className="mini_stack" direction="row">
                      {splits.slice(0, 3).map((member) => (
                        <ImageComp alt={member.label} className="mini_avatar" isAvatar key={member.userId} src={member.avatar} />
                      ))}
                      {splits.length > 3 && <span className="mini_more">+{splits.length - 3}</span>}
                    </Stack>
                    <Stack className="row_actions" direction="row">
                      <IconButton aria-label="View expense" onClick={() => setSelectedExpense(expense)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="Edit expense" onClick={() => setEditingExpense(expense)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="Delete expense"
                        disabled={deleteExpense.isPending}
                        onClick={() => setDeleteExpenseCandidate(expense)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                );
              })
            ) : (
              <Box className="empty_inline">
                {categoryFilter === 'all' ? 'No expenses yet.' : 'No expenses match this filter.'}
              </Box>
            )}
          </Box>
          {expensePagination && expensePagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination count={expensePagination.totalPages} page={expensePage} onChange={(_, page) => setExpensePage(page)} />
            </Box>
          )}
        </Box>

        <Box className="settlement_summary">
          <Typography className="section_heading" component="h2">
            Settlement Summary
          </Typography>
          <Box className="summary_panel">
            {isSettlementsLoading ? (
              <Box className="empty_inline">Loading settlements...</Box>
            ) : settlements.length ? (
              settlements.map((settlement) => {
                const settlementText = getSettlementText(settlement, membersById, currentUser?.id);
                const positive = settlement.toUserId === currentUser?.id;
                const isPaid = isSettlementPaid(settlement);
                const isOutstanding = isSettlementOutstanding(settlement);

                return (
                  <Box className={`balance_item ${isPaid ? 'settled' : positive ? 'positive' : 'warning'}`} key={settlement.id}>
                    <ImageComp alt="" className="person_avatar" isAvatar src={settlementText.avatar} />
                    <Box className="balance_copy">
                      <strong>{settlementText.title}</strong>
                      <span>{isPaid ? 'Settled' : isOutstanding ? 'Pending settlement' : 'No payment due'}</span>
                    </Box>
                    <Box className={`balance_amount${isPaid ? ' settled' : positive ? '' : ' warning'}`}>
                      <strong>{formatMoney(settlement.amount || 0, settlement.currency || currency)}</strong>
                      <span>{isPaid ? 'Paid' : isOutstanding ? 'Due' : 'Clear'}</span>
                    </Box>
                    {settlement.status === 'pending' && settlement.fromUserId === currentUser?.id && (
                      <>
                        <Button className="settlement_card_action" disabled={markSettlementPaid.isPending} onClick={() => markSettlementPaid.mutate({ tripId, settlementId: settlement.id })} startIcon={<CheckCircleIcon />} variant="outlined">{markSettlementPaid.isPending ? 'Declaring...' : 'Settle manually'}</Button>
                        <Button className="settlement_card_action" disabled={createRazorpayOrder.isPending || verifyRazorpayPayment.isPending} onClick={() => handlePaySettlement(settlement)} startIcon={<PaymentsIcon />} variant="contained">{createRazorpayOrder.isPending || verifyRazorpayPayment.isPending ? 'Processing...' : 'Pay with Razorpay'}</Button>
                      </>
                    )}
                    {settlement.status === 'payment_declared' && settlement.toUserId === currentUser?.id && <Button className="settlement_card_action" onClick={() => confirmSettlementPaid.mutate({ tripId, settlementId: settlement.id })} startIcon={<CheckCircleIcon />} variant="contained">Confirm you received it</Button>}
                    {settlement.status === 'pending' && settlement.toUserId === currentUser?.id && <Button className="settlement_card_action reminder" onClick={() => sendReminders.mutate({ tripId, settlementId: settlement.id })} variant="outlined">Send payment reminder</Button>}
                  </Box>
                );
              })
            ) : (
              <Box className="empty_inline">No settlements to show.</Box>
            )}
            <Box className="net_balance">
              <span>Net Balance</span>
              <strong>
                {netBalance >= 0 ? '+' : '-'}
                {formatMoney(Math.abs(netBalance), currency)}
              </strong>
            </Box>
            {!hasOutstandingSettlement && (
              <Box className="settlement_complete">
                <CheckCircleIcon />
                <Box><strong>All settled</strong><span>No outstanding balances or reminders.</span></Box>
              </Box>
            )}
          </Box>
          <Box className="insight_card">
            <span>
              <InsightsIcon />
            </span>
            <Box>
              <strong>Spending Insight</strong>
              <p>
                {topCategory
                  ? `${getCategoryMeta(topCategory).label} is currently your top spending category.`
                  : 'Add expenses to unlock spending insights.'}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconButton
        className="round_fab"
        aria-label="Add expense"
        disabled={!members.length}
        onClick={() => setShowAddExpenseModal(true)}
      >
        <AddIcon />
      </IconButton>
      {showAddExpenseModal && (
        <AddExpenseModal
          currency={currency}
          isSubmitting={createExpense.isPending}
          members={members}
          onClose={() => setShowAddExpenseModal(false)}
          onSubmitExpense={handleCreateExpense}
          tripTitle={trip?.title}
        />
      )}
      {editingExpense && (
        <AddExpenseModal
          currency={currency}
          initialExpense={editingExpense}
          isSubmitting={updateExpense.isPending}
          members={members}
          onClose={() => setEditingExpense(null)}
          onSubmitExpense={handleUpdateExpense}
          tripTitle={trip?.title}
        />
      )}
      {selectedExpense && (
        <Box className="expense_modal_overlay">
          <Box className="expense_modal details_modal">
            <Box className="expense_modal_header">
              <Box>
                <Typography component="h3">{selectedExpense.description}</Typography>
                <Typography>{getCategoryMeta(selectedExpense.category).label}</Typography>
              </Box>
              <IconButton aria-label="Close expense details" onClick={() => setSelectedExpense(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="detail_body">
              <Box className="detail_row">
                <span>Amount</span>
                <strong>{formatMoney(selectedExpense.amount, selectedExpense.currency || currency)}</strong>
              </Box>
              <Box className="detail_row">
                <span>Paid By</span>
                <strong>{getExpensePaidBy(selectedExpense, membersById, currentUser?.id).label}</strong>
              </Box>
              <Box className="detail_row">
                <span>Date</span>
                <strong>{formatExpenseDate(selectedExpense.expenseDate)}</strong>
              </Box>
              <Box className="detail_row">
                <span>Split With</span>
                <strong>
                  {getExpenseSplits(selectedExpense, membersById, currentUser?.id)
                    .map((member) => member.label)
                    .join(', ') || 'No split members'}
                </strong>
              </Box>
              <Box className="detail_row">
                <span>Notes</span>
                <strong>{selectedExpense.notes || 'No notes added'}</strong>
              </Box>
            </Box>
            <Box className="expense_modal_footer">
              <Button
                onClick={() => {
                  setEditingExpense(selectedExpense);
                  setSelectedExpense(null);
                }}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                color="error"
                disabled={deleteExpense.isPending}
                onClick={() => {
                  setDeleteExpenseCandidate(selectedExpense);
                  setSelectedExpense(null);
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {deleteExpenseCandidate && (
        <Box className="expense_modal_overlay">
          <Box className="expense_modal confirm_modal">
            <Box className="expense_modal_header">
              <Box>
                <Typography component="h3">Delete expense?</Typography>
                <Typography>{deleteExpenseCandidate.description}</Typography>
              </Box>
              <IconButton
                aria-label="Close delete confirmation"
                disabled={deleteExpense.isPending}
                onClick={() => setDeleteExpenseCandidate(null)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="confirm_body">
              <Typography>This expense and its split details will be removed.</Typography>
            </Box>
            <Box className="expense_modal_footer">
              <Button disabled={deleteExpense.isPending} onClick={() => setDeleteExpenseCandidate(null)}>
                Cancel
              </Button>
              <Button
                color="error"
                disabled={deleteExpense.isPending}
                onClick={handleConfirmDeleteExpense}
                startIcon={<DeleteIcon />}
                variant="contained"
              >
                {deleteExpense.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
