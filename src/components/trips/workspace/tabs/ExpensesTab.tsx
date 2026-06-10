'use client';

import {
  useExpensesCreate,
  useExpensesDelete,
  useExpensesList,
  useExpensesMarkSettlementPaid,
  useExpensesSendSettlementReminders,
  useExpensesSettlements,
  useExpensesUpdate,
} from '@/api/hooks/expenses/useExpenses.hooks';
import { useTripDetails, useTripMembers } from '@/api/hooks/trips/useTrips.hooks';
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
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddExpenseFormValues>({
    defaultValues: {
      amount: initialExpense?.amount ?? 0,
      category: initialExpense?.category ?? 'food',
      date: initialExpense?.expenseDate ? new Date(initialExpense.expenseDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      description: initialExpense?.description ?? '',
      notes: initialExpense?.notes ?? '',
      paidBy: initialExpense?.paidByUserId ?? defaultMemberIds[0] ?? '',
      splitWith: initialSplitIds.length ? initialSplitIds : defaultMemberIds,
    },
    mode: 'onBlur',
    resolver: yupResolver(addExpenseSchema),
  });

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
                            const nextValue = active
                              ? field.value.filter((value) => value !== member.userId)
                              : [...field.value, member.userId];

                            field.onChange(nextValue);
                          }}
                        />
                        <Box alt="" className="split_avatar" component="img" src={member.avatar} />
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
  const currentUser = useAuthStore((state) => state.user);
  const { data: tripResponse } = useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: expensesResponse, isLoading: isExpensesLoading } = useExpensesList(tripId);
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
  const sendReminders = useExpensesSendSettlementReminders({ optionalCallback: () => undefined });
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
  const plannedBudget = Number(trip?.budget || 0);
  const utilization = plannedBudget > 0 ? Math.round((totalSpent / plannedBudget) * 100) : 0;
  const activeSettlement = settlements.find((settlement) => !isSettlementPaid(settlement));
  const netBalance = settlements.reduce((total, settlement) => {
    if (isSettlementPaid(settlement)) return total;

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

  const getExpensePayload = (values: AddExpenseFormValues): ICreateExpensePayload => {
    const splitAmount = Number((values.amount / values.splitWith.length).toFixed(2));

    return {
      amount: values.amount,
      category: values.category,
      currency,
      description: values.description.trim(),
      expenseDate: values.date,
      notes: values.notes.trim() || undefined,
      paidByUserId: values.paidBy,
      splits: values.splitWith.map((userId) => ({
        amount: splitAmount,
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

  const handleMarkSettled = () => {
    if (!activeSettlement?.id) return;

    markSettlementPaid.mutate({ settlementId: activeSettlement.id, tripId });
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
              <Typography className="eyebrow">Total Trip Budget</Typography>
              <Stack className="budget_amount" direction="row">
                <Typography component="h2">{formatMoney(totalSpent, currency)}</Typography>
                <span>
                  / {plannedBudget ? `${formatMoney(plannedBudget, currency)} planned` : 'Budget not set'}
                </span>
              </Stack>
            </Box>
            <Box className="budget_progress">
              <Stack direction="row">
                <span>Budget Utilization</span>
                <strong>{plannedBudget ? `${utilization}%` : '--'}</strong>
              </Stack>
              <Box className="progress_track">
                <span style={{ width: `${Math.min(utilization, 100)}%` }} />
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
                      <Box
                        alt={paidBy.label}
                        className="paid_avatar"
                        component="img"
                        src={paidBy.avatar}
                      />
                      <span>{paidBy.label}</span>
                    </Stack>
                    <span className="muted_text">{formatExpenseDate(expense.expenseDate)}</span>
                    <Stack className="mini_stack" direction="row">
                      {splits.slice(0, 3).map((member) => (
                        <Box alt={member.label} className="mini_avatar" component="img" key={member.userId} src={member.avatar} />
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
        </Box>

        <Box className="settlement_summary">
          <Typography className="section_heading" component="h2">
            Settlement Summary
          </Typography>
          <Box className="summary_panel">
            {isSettlementsLoading ? (
              <Box className="empty_inline">Loading settlements...</Box>
            ) : settlements.length ? (
              settlements.slice(0, 3).map((settlement) => {
                const settlementText = getSettlementText(settlement, membersById, currentUser?.id);
                const positive = settlement.toUserId === currentUser?.id;

                return (
                  <Box className={`balance_item ${positive ? 'positive' : 'warning'}`} key={settlement.id}>
                    <Box alt="" className="person_avatar" component="img" src={settlementText.avatar} />
                    <Box className="balance_copy">
                      <strong>{settlementText.title}</strong>
                      <span>{isSettlementPaid(settlement) ? 'Settled' : 'Pending settlement'}</span>
                    </Box>
                    <Box className={`balance_amount${positive ? '' : ' warning'}`}>
                      <strong>{formatMoney(settlement.amount || 0, settlement.currency || currency)}</strong>
                      <span>{isSettlementPaid(settlement) ? 'Paid' : 'Pending'}</span>
                    </Box>
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
            <Button
              className="primary_wide"
              disabled={!activeSettlement || markSettlementPaid.isPending}
              onClick={handleMarkSettled}
              startIcon={<CheckCircleIcon />}
            >
              {markSettlementPaid.isPending ? 'Settling...' : 'Mark Settled'}
            </Button>
            <Button
              className="outline_wide"
              disabled={!settlements.length || sendReminders.isPending}
              onClick={() => sendReminders.mutate({ tripId })}
            >
              {sendReminders.isPending ? 'Sending...' : 'Send Reminders'}
            </Button>
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
