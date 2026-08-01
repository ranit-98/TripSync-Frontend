'use client';

import {
  useExpensesCreate,
  useExpensesConfirmSettlementPaid,
  useExpensesDelete,
  useExpensesList,
  useExpensesInfiniteList,
  useExpensesMarkSettlementPaid,
  useExpensesSettlements,
  useExpensesUpdate,
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
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm, useWatch } from 'react-hook-form';
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

type ExpenseShareRow = {
  amount: number;
  direction: 'pay' | 'receive';
  expense: IExpense;
  person: MemberOption;
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

const buildEqualSplitAmounts = (ids: string[], total: number): Record<string, number> => {
  if (!ids.length) return {};

  const totalInCents = Math.round(total * 100);
  const baseShareInCents = Math.floor(totalInCents / ids.length);
  const remainderInCents = totalInCents % ids.length;

  return Object.fromEntries(
    ids.map((id, index) => [
      id,
      (baseShareInCents + (index < remainderInCents ? 1 : 0)) / 100,
    ])
  );
};

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
const canActOnSettlement = (settlement: ISettlement | null | undefined, currentUserId?: string) => {
  if (!settlement || !currentUserId || isSettlementPaid(settlement)) return false;

  if (settlement.fromUserId === currentUserId) {
    return settlement.status !== 'payment_declared';
  }

  return settlement.toUserId === currentUserId;
};

const getExpenseListSummaryAmount = (value: unknown) => {
  if (!value || typeof value !== 'object') return null;

  const amount = (value as { totalAmount?: unknown }).totalAmount;

  return typeof amount === 'number' && Number.isFinite(amount) ? amount : null;
};

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

  const initialSplitAmounts: Record<string, number> = (() => {
    if (initialExpense?.splits?.length) {
      return Object.fromEntries(initialExpense.splits.map((s) => [s.userId, s.amount]));
    }
    return buildEqualSplitAmounts(initialSplitIds.length ? initialSplitIds : defaultMemberIds, initialExpense?.amount ?? 0);
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
    setValue('splitAmounts', buildEqualSplitAmounts(ids, total));
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

export default function ExpensesTab({ canEdit, initialView = 'expenses', tripId }: { canEdit: boolean; initialView?: 'expenses' | 'settlements' | 'insights'; tripId: string }) {
  const [showBudget, setShowBudget] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [deleteExpenseCandidate, setDeleteExpenseCandidate] = useState<IExpense | null>(null);
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expensePage, setExpensePage] = useState(1);
  const expenseView = initialView;
  const [balanceExpenseFilter, setBalanceExpenseFilter] = useState('all');
  const [balancePersonFilter, setBalancePersonFilter] = useState('all');
  const [balanceDirectionFilter, setBalanceDirectionFilter] = useState('all');
  const [balanceStatusFilter, setBalanceStatusFilter] = useState('all');
  const [balancePage, setBalancePage] = useState(1);
  const [selectedSettlement, setSelectedSettlement] = useState<ISettlement | null>(null);
  const [selectedPaymentShare, setSelectedPaymentShare] = useState<ExpenseShareRow | null>(null);
  const currentUser = useAuthStore((state) => state.user);
  const { data: tripResponse } = useTripDetails(tripId);
  const { data: membersResponse } = useTripMembers(tripId);
  const { data: expensesResponse, isLoading: isExpensesLoading } = useExpensesList(tripId, expensePage, categoryFilter);
  const {
    data: balanceExpensesResponse,
    fetchNextPage: fetchNextExpensePage,
    hasNextPage: hasNextExpensePage,
    isFetchingNextPage: isFetchingNextExpensePage,
  } = useExpensesInfiniteList(tripId);
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
  const balanceExpenses = useMemo(
    () => balanceExpensesResponse?.pages.flatMap((page) => toArray<IExpense>(page.data.data)) ?? [],
    [balanceExpensesResponse?.pages]
  );
  const expensePagination = expensesResponse?.data.pagination;
  const settlements = useMemo(
    () => toArray<ISettlement>(settlementsResponse?.data.data),
    [settlementsResponse?.data.data]
  );
  const expenseCount = expensePagination?.total ?? expenses.length;
  const summaryTotal = getExpenseListSummaryAmount(expensesResponse?.data.summary);
  const loadedExpenseTotal = balanceExpenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );
  const hasCompleteExpenseList = Boolean(balanceExpensesResponse) && hasNextExpensePage === false;
  const totalSpent = summaryTotal !== null && (summaryTotal > 0 || expenseCount === 0)
    ? summaryTotal
    : hasCompleteExpenseList
      ? loadedExpenseTotal
      : null;
  const canShowSpendSummary = totalSpent !== null;
  const mySettlements = settlements.filter(
    (settlement) =>
      settlement.fromUserId === currentUser?.id || settlement.toUserId === currentUser?.id
  );
  const actionableSettlements = mySettlements.filter(
    (settlement) =>
      !isSettlementPaid(settlement) &&
      !(settlement.fromUserId === currentUser?.id && settlement.status === 'payment_declared')
  );
  const expenseShareRows = useMemo(() => {
    return balanceExpenses.flatMap<ExpenseShareRow>((expense) => {
      const paidBy = getExpensePaidBy(expense, membersById, currentUser?.id);

      return (expense.splits ?? []).flatMap<ExpenseShareRow>((split) => {
        if (split.userId === expense.paidByUserId) return [];

        if (expense.paidByUserId === currentUser?.id) {
          const person = membersById.get(split.userId) ?? getMemberOptionFromUser(split.user, currentUser?.id);
          if (!person) return [];
          return [{ amount: Number(split.amount || 0), direction: 'receive' as const, expense, person }];
        }

        if (split.userId === currentUser?.id) {
          return [{ amount: Number(split.amount || 0), direction: 'pay' as const, expense, person: paidBy }];
        }

        return [];
      });
    });
  }, [balanceExpenses, currentUser?.id, membersById]);
  const getRowSettlement = (row: ExpenseShareRow) => settlements.find((settlement) => {
    if (row.direction === 'pay') {
      return settlement.fromUserId === currentUser?.id && settlement.toUserId === row.person.userId;
    }

    return settlement.toUserId === currentUser?.id && settlement.fromUserId === row.person.userId;
  });
  const getRowStatus = (row: ExpenseShareRow) => {
    const settlement = getRowSettlement(row);

    if (!settlement || isSettlementPaid(settlement)) return 'settled';
    if (settlement.status === 'payment_declared') return 'awaiting';
    return 'pending';
  };
  const filteredExpenseShares = expenseShareRows.filter(
    (row) => {
      const status = getRowStatus(row);

      return (
        (balanceExpenseFilter === 'all' || row.expense.id === balanceExpenseFilter) &&
        (balancePersonFilter === 'all' || row.person.userId === balancePersonFilter) &&
        (balanceDirectionFilter === 'all' || row.direction === balanceDirectionFilter) &&
        (balanceStatusFilter === 'all' || status === balanceStatusFilter)
      );
    }
  );
  const balanceRowsPerPage = 8;
  const balancePageCount = Math.max(1, Math.ceil(filteredExpenseShares.length / balanceRowsPerPage));
  const paginatedExpenseShares = filteredExpenseShares.slice(
    (balancePage - 1) * balanceRowsPerPage,
    balancePage * balanceRowsPerPage
  );
  const selectedPerson = membersById.get(balancePersonFilter);
  const selectedPersonRows = expenseShareRows.filter((row) => row.person.userId === balancePersonFilter);
  const selectedPersonPayTotal = selectedPersonRows
    .filter((row) => row.direction === 'pay')
    .reduce((total, row) => total + row.amount, 0);
  const selectedPersonReceiveTotal = selectedPersonRows
    .filter((row) => row.direction === 'receive')
    .reduce((total, row) => total + row.amount, 0);
  const categoryTotals = balanceExpenses.reduce<Record<string, number>>((totals, expense) => {
    const category = normalizeCategory(expense.category);
    totals[category] = (totals[category] ?? 0) + Number(expense.amount || 0);
    return totals;
  }, {});
  const maxCategoryTotal = Math.max(1, ...Object.values(categoryTotals));
  const topCategory = useMemo(() => {
    const totals = expenses.reduce<Record<string, number>>((result, expense) => {
      const category = normalizeCategory(expense.category);
      result[category] = (result[category] ?? 0) + Number(expense.amount || 0);

      return result;
    }, {});

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0];
  }, [expenses]);

  useEffect(() => {
    setBalancePage(1);
  }, [balanceDirectionFilter, balanceExpenseFilter, balancePersonFilter, balanceStatusFilter]);

  useEffect(() => {
    if (balancePage > balancePageCount) setBalancePage(balancePageCount);
  }, [balancePage, balancePageCount]);

  if (isExpensesLoading && isSettlementsLoading) {
    return <ExpensesSkeleton />;
  }

  const getExpensePayload = (values: AddExpenseFormValues): ICreateExpensePayload => {
    // Use custom split amounts; fall back to equal split if amounts map is empty
    const equalAmounts = buildEqualSplitAmounts(values.splitWith, values.amount);

    return {
      amount: values.amount,
      category: values.category,
      currency,
      description: values.description.trim(),
      expenseDate: values.date,
      notes: values.notes.trim() || undefined,
      paidByUserId: values.paidBy,
      splits: values.splitWith.map((userId) => ({
        amount: Number(values.splitAmounts?.[userId] ?? equalAmounts[userId]),
        userId,
      })),
    };
  };

  const handleCreateExpense = (values: AddExpenseFormValues) => {
    if (!canEdit) return;
    const body = getExpensePayload(values);

    createExpense.mutate({ body, tripId });
  };

  const handleUpdateExpense = (values: AddExpenseFormValues) => {
    if (!canEdit || !editingExpense?.id) return;

    updateExpense.mutate({ body: getExpensePayload(values), expenseId: editingExpense.id, tripId });
  };

  const handleConfirmDeleteExpense = () => {
    if (!canEdit || !deleteExpenseCandidate?.id) return;

    deleteExpense.mutate({ expenseId: deleteExpenseCandidate.id, tripId });
  };

  return (
    <Box className="tab_page padded_page">
      {canShowSpendSummary && showBudget ? (
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
                  / {expensePagination?.total ?? expenses.length} recorded expense{(expensePagination?.total ?? expenses.length) === 1 ? '' : 's'}
                </span>
              </Stack>
            </Box>
          </Stack>
        </Box>
      ) : canShowSpendSummary ? (
        <Button
          className="budget_restore"
          onClick={() => setShowBudget(true)}
          startIcon={<KeyboardArrowDownIcon />}
        >
          Show Budget Banner
        </Button>
      ) : null}

      <Box className="expense_view_tabs" role="tablist" aria-label="Expense workspace views">
        <Button
          aria-selected={expenseView === 'expenses'}
          className={expenseView === 'expenses' ? 'active' : ''}
          component={Link}
          href={`/trips/${tripId}/expenses`}
          role="tab"
        >
          Expenses ({expensePagination?.total ?? expenses.length})
        </Button>
        <Button
          aria-selected={expenseView === 'settlements'}
          className={expenseView === 'settlements' ? 'active' : ''}
          component={Link}
          href={`/trips/${tripId}/expenses/balances`}
          role="tab"
        >
          Balances ({mySettlements.length})
        </Button>
        <Button
          aria-selected={expenseView === 'insights'}
          className={expenseView === 'insights' ? 'active' : ''}
          component={Link}
          href={`/trips/${tripId}/expenses/insights`}
          role="tab"
        >
          Insights
        </Button>
      </Box>

      <Box className="expense_grid tabbed">
        {expenseView === 'expenses' && <Box className="expense_list">
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
                  setExpensePage(1);
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
                    setExpensePage(1);
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
            ) : expenses.length ? (
              expenses.map((expense) => {
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
                      {canEdit && <IconButton aria-label="Edit expense" onClick={() => setEditingExpense(expense)}>
                        <EditIcon fontSize="small" />
                      </IconButton>}
                      {canEdit && <IconButton
                        aria-label="Delete expense"
                        disabled={deleteExpense.isPending}
                        onClick={() => setDeleteExpenseCandidate(expense)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>}
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
            <Box className="expense_list_pagination">
              <Pagination boundaryCount={1} count={expensePagination.totalPages} page={expensePage} onChange={(_, page) => setExpensePage(page)} siblingCount={0} />
            </Box>
          )}
        </Box>}

        {expenseView === 'settlements' && <Box className="settlement_summary">
          <Typography className="section_heading" component="h2">
            Settlement Summary
          </Typography>
          <Box className="summary_panel">
            {false && actionableSettlements.length > 0 && (
              <Box className="settlement_actions_panel">
                <Box className="settlement_actions_heading"><strong>Payments requiring action</strong><span>Complete or confirm outstanding balances.</span></Box>
                <Box className="settlement_action_cards">
                  {actionableSettlements.map((settlement) => {
                    const details = getSettlementText(settlement, membersById, currentUser?.id);
                    const isOutgoing = settlement.fromUserId === currentUser?.id;

                    return (
                      <Box className={isOutgoing ? 'pay' : 'receive'} key={settlement.id}>
                        <ImageComp alt="" className="person_avatar" isAvatar src={details.avatar} />
                        <Box><strong>{details.title}</strong><span>{formatMoney(settlement.amount || 0, settlement.currency || currency)}</span></Box>
                        <Button onClick={() => setSelectedSettlement(settlement)}>{isOutgoing ? 'Pay' : 'Mark received'}</Button>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
            <Box className="balance_explorer">
              <Box className="balance_explorer_heading">
                <Box>
                  <strong>Where does my balance come from?</strong>
                  <span>Filter by an expense or a person to see exactly what you pay or receive.</span>
                </Box>
                {(balanceExpenseFilter !== 'all' || balancePersonFilter !== 'all' || balanceDirectionFilter !== 'all' || balanceStatusFilter !== 'all') && (
                  <Button onClick={() => {
                    setBalanceExpenseFilter('all');
                    setBalancePersonFilter('all');
                    setBalanceDirectionFilter('all');
                    setBalanceStatusFilter('all');
                  }}>Clear filters</Button>
                )}
              </Box>
              <Box className="balance_filters">
                <Autocomplete
                  getOptionLabel={(option) => option.description}
                  loading={isFetchingNextExpensePage}
                  onChange={(_, expense) => setBalanceExpenseFilter(expense?.id ?? 'all')}
                  options={balanceExpenses}
                  renderInput={(params) => <TextField {...params} label="Expense" placeholder="All expenses" size="small" />}
                  slotProps={{
                    listbox: {
                      onScroll: (event) => {
                        const list = event.currentTarget;
                        const isNearBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 24;
                        if (isNearBottom && hasNextExpensePage && !isFetchingNextExpensePage) void fetchNextExpensePage();
                      },
                    },
                  }}
                  value={balanceExpenses.find((expense) => expense.id === balanceExpenseFilter) ?? null}
                />
                <TextField
                  label="Person"
                  onChange={(event) => setBalancePersonFilter(event.target.value)}
                  select
                  size="small"
                  value={balancePersonFilter}
                >
                  <MenuItem value="all">All people</MenuItem>
                  {members.filter((member) => member.userId !== currentUser?.id).map((member) => (
                    <MenuItem key={member.userId} value={member.userId}>{member.label}</MenuItem>
                  ))}
                </TextField>
                <TextField label="Direction" onChange={(event) => setBalanceDirectionFilter(event.target.value)} select size="small" value={balanceDirectionFilter}>
                  <MenuItem value="all">Pay and receive</MenuItem><MenuItem value="pay">I need to pay</MenuItem><MenuItem value="receive">I need to receive</MenuItem>
                </TextField>
                <TextField label="Status" onChange={(event) => setBalanceStatusFilter(event.target.value)} select size="small" value={balanceStatusFilter}>
                  <MenuItem value="all">All statuses</MenuItem><MenuItem value="pending">Pending</MenuItem><MenuItem value="awaiting">Awaiting confirmation</MenuItem><MenuItem value="settled">Settled</MenuItem>
                </TextField>
              </Box>
              {selectedPerson && (
                <Box className="person_balance_summary">
                  <Box className="person_balance_identity"><ImageComp alt="" className="person_avatar" isAvatar src={selectedPerson.avatar} /><Box><strong>{selectedPerson.label}</strong><span>Your complete expense history together</span></Box></Box>
                  <Box className="person_balance_stat pay"><span>You pay</span><strong>{formatMoney(selectedPersonPayTotal, currency)}</strong></Box>
                  <Box className="person_balance_stat receive"><span>You receive</span><strong>{formatMoney(selectedPersonReceiveTotal, currency)}</strong></Box>
                </Box>
              )}
              <Box className="expense_share_results">
                {paginatedExpenseShares.length ? paginatedExpenseShares.map((row) => (
                  <Box className={`expense_share_row ${row.direction}`} key={`${row.expense.id}-${row.person.userId}`}>
                    <ImageComp alt="" className="person_avatar" isAvatar src={row.person.avatar} />
                    <Box>
                      <strong>{row.expense.description}</strong>
                      <span>{row.direction === 'pay' ? `You pay ${row.person.label}` : `${row.person.label} pays you`}</span>
                    </Box>
                    <strong className={row.direction}>
                      {row.direction === 'pay' ? '-' : '+'}{formatMoney(row.amount, row.expense.currency || currency)}
                    </strong>
                    {(() => {
                      const settlement = getRowSettlement(row);
                      const isFirstRowForSettlement = settlement && filteredExpenseShares.find(
                        (candidate) => getRowSettlement(candidate)?.id === settlement.id
                      ) === row;
                      const isAwaitingConfirmation = Boolean(
                        isFirstRowForSettlement &&
                        row.direction === 'pay' &&
                        settlement?.status === 'payment_declared'
                      );
                      const canSettle = Boolean(
                        isFirstRowForSettlement &&
                        settlement &&
                        !isAwaitingConfirmation &&
                        canActOnSettlement(settlement, currentUser?.id)
                      );

                      return (
                        <Button
                          className={isAwaitingConfirmation
                            ? 'share_payment_action pending'
                            : canSettle
                              ? `share_payment_action ${row.direction}`
                              : 'share_payment_action view'}
                          disabled={isAwaitingConfirmation}
                          onClick={() => {
                            if (isAwaitingConfirmation) return;
                            setSelectedPaymentShare(row);
                            setSelectedSettlement(settlement ?? null);
                          }}
                        >
                          {isAwaitingConfirmation
                            ? 'Pending'
                            : canSettle
                            ? row.direction === 'pay'
                              ? 'Pay balance'
                              : settlement?.status === 'payment_declared'
                                ? 'Confirm received'
                                : 'Mark received'
                            : 'View'}
                        </Button>
                      );
                    })()}
                  </Box>
                )) : (
                  <Box className="balance_group_empty">No matching expense shares.</Box>
                )}
                {balancePageCount > 1 && <Box className="settlement_pagination"><span>Showing {(balancePage - 1) * balanceRowsPerPage + 1}–{Math.min(balancePage * balanceRowsPerPage, filteredExpenseShares.length)} of {filteredExpenseShares.length}</span><Pagination count={balancePageCount} page={balancePage} onChange={(_, page) => setBalancePage(page)} size="small" /></Box>}
              </Box>
            </Box>

          </Box>
        </Box>}

        {expenseView === 'insights' && <Box className="spending_insights_view">
          <Typography className="section_heading" component="h2">Spending Insights</Typography>
          <Box className="insights_summary_grid">
            <Box><span>Total spent</span><strong>{formatMoney(balanceExpenses.reduce((total, expense) => total + Number(expense.amount || 0), 0), currency)}</strong></Box>
            <Box><span>Expenses</span><strong>{balanceExpenses.length}</strong></Box>
            <Box><span>Top category</span><strong>{topCategory ? getCategoryMeta(topCategory).label : 'No data'}</strong></Box>
          </Box>
          <Box className="spending_chart_card">
            <Box><strong>Spending by category</strong><span>Compare where the trip budget is going.</span></Box>
            <Box className="category_bar_chart">
              {Object.entries(categoryTotals).sort(([, a], [, b]) => b - a).map(([category, amount]) => (
                <Box className="category_bar_row" key={category}>
                  <span>{getCategoryMeta(category).label}</span><Box><i style={{ width: `${(amount / maxCategoryTotal) * 100}%` }} /></Box><strong>{formatMoney(amount, currency)}</strong>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>}
      </Box>
      <IconButton
        className="round_fab"
        aria-label="Add expense"
        disabled={!canEdit || !members.length}
        onClick={() => setShowAddExpenseModal(true)}
        sx={{ display: canEdit ? undefined : 'none' }}
      >
        <AddIcon />
      </IconButton>
      <Drawer
        anchor="right"
        ModalProps={{ disablePortal: true }}
        onClose={() => { setSelectedSettlement(null); setSelectedPaymentShare(null); }}
        open={Boolean(selectedPaymentShare)}
      >
        {selectedPaymentShare && (() => {
          const isOutgoing = selectedPaymentShare.direction === 'pay';
          const otherUserId = selectedPaymentShare.person.userId;
          const person = otherUserId ? membersById.get(otherUserId) : undefined;
          const selectedExpense = selectedPaymentShare.expense;
          const selectedExpenseCurrency = selectedExpense.currency || selectedSettlement?.currency || currency;
          const selectedExpensePaidBy = selectedExpense
            ? getExpensePaidBy(selectedExpense, membersById, currentUser?.id)
            : null;
          const selectedExpenseSplits = selectedExpense?.splits ?? [];
          const paidByShare = selectedExpenseSplits.find((split) => split.userId === selectedExpense?.paidByUserId);
          const remainingSplits = selectedExpenseSplits.filter((split) => split.userId !== selectedExpense?.paidByUserId);
          const selectedSplitAmount = Number(selectedPaymentShare?.amount || 0);
          const othersShare = Math.max(0, Number(selectedExpense?.amount || 0) - selectedSplitAmount);
          const selectedPaymentLabel = isOutgoing
            ? `You pay ${person?.label ?? 'trip member'}`
            : `${person?.label ?? 'Trip member'} pays you`;
          const settlementStatus = !selectedSettlement
            ? 'Settled by balance'
            : isSettlementPaid(selectedSettlement)
            ? 'Settled'
            : selectedSettlement.status === 'payment_declared'
              ? 'Awaiting confirmation'
              : 'Payment pending';

          return (
            <Box className="payment_details_drawer">
              <Box className="payment_drawer_header">
                <Box><Typography component="h3">{isOutgoing ? 'Pay combined balance' : 'Confirm combined balance'}</Typography><span>This action settles the net balance with this member, including the related shares shown above.</span></Box>
                <IconButton aria-label="Close payment details" onClick={() => { setSelectedSettlement(null); setSelectedPaymentShare(null); }}><CloseIcon /></IconButton>
              </Box>
              {selectedPaymentShare && (
                <Box className="selected_payment_purpose">
                  <span>Payment purpose</span>
                  <strong>{selectedPaymentShare.expense.description}</strong>
                  <p>{getCategoryMeta(selectedPaymentShare.expense.category).label} · {formatExpenseDate(selectedPaymentShare.expense.expenseDate)}</p>
                </Box>
              )}
              <Box className={`payment_drawer_amount ${isOutgoing ? 'pay' : 'receive'}`}><span>{selectedPaymentLabel}</span><strong>{formatMoney(selectedSplitAmount, selectedExpenseCurrency)}</strong></Box>
              <Box className="payment_drawer_meta"><Box><span>Originally paid by</span><strong>{selectedExpensePaidBy?.label ?? (isOutgoing ? person?.label : 'You')}</strong></Box><Box><span>Total expense</span><strong>{formatMoney(selectedExpense?.amount || 0, selectedExpenseCurrency)}</strong></Box><Box><span>This share</span><strong>{formatMoney(selectedSplitAmount, selectedExpenseCurrency)}</strong></Box><Box><span>Rest of split</span><strong>{formatMoney(othersShare, selectedExpenseCurrency)}</strong></Box></Box>
              <Box className="payment_split_breakdown">
                <Box className="payment_split_heading">
                  <strong>Split breakdown</strong>
                  <span>{selectedExpenseSplits.length || 1} participant{(selectedExpenseSplits.length || 1) === 1 ? '' : 's'} · {settlementStatus}</span>
                </Box>
                {selectedExpensePaidBy && (
                  <Box className="payment_split_row paid">
                    <ImageComp alt={selectedExpensePaidBy.label} className="person_avatar" isAvatar src={selectedExpensePaidBy.avatar} />
                    <Box>
                      <strong>{selectedExpensePaidBy.label}</strong>
                      <span>Paid upfront for {selectedExpense?.description || 'this expense'}</span>
                    </Box>
                    <strong>{formatMoney(paidByShare?.amount ?? 0, selectedExpenseCurrency)}</strong>
                  </Box>
                )}
                {remainingSplits.map((split) => {
                  const splitMember = membersById.get(split.userId) ?? getMemberOptionFromUser(split.user, currentUser?.id);
                  const isCurrentPaymentMember = split.userId === (isOutgoing ? currentUser?.id : otherUserId);
                  const splitLabel = split.userId === currentUser?.id
                    ? `You owe ${selectedExpensePaidBy?.label ?? 'the payer'}`
                    : `${splitMember?.label ?? 'Trip member'} owes ${selectedExpensePaidBy?.label ?? 'the payer'}`;

                  return (
                    <Box className={`payment_split_row${isCurrentPaymentMember ? ' current' : ''}`} key={split.userId}>
                      <ImageComp alt={splitMember?.label ?? 'Trip member'} className="person_avatar" isAvatar src={splitMember?.avatar || fallbackAvatar} />
                      <Box>
                        <strong>{splitMember?.label ?? 'Trip member'}</strong>
                        <span>{isCurrentPaymentMember ? `${splitLabel} · current payment` : splitLabel}</span>
                      </Box>
                      <strong>{formatMoney(split.amount, selectedExpenseCurrency)}</strong>
                    </Box>
                  );
                })}
              </Box>
              {canActOnSettlement(selectedSettlement, currentUser?.id) && <Button
                className={isOutgoing ? 'confirm_payment pay' : 'confirm_payment receive'}
                disabled={!selectedSettlement || isSettlementPaid(selectedSettlement) || (isOutgoing && selectedSettlement.status === 'payment_declared') || markSettlementPaid.isPending || confirmSettlementPaid.isPending}
                onClick={() => {
                  if (!selectedSettlement) return;
                  if (isOutgoing) markSettlementPaid.mutate({ tripId, settlementId: selectedSettlement.id });
                  else confirmSettlementPaid.mutate({ tripId, settlementId: selectedSettlement.id });
                  setSelectedSettlement(null);
                  setSelectedPaymentShare(null);
                }}
                variant="contained"
              >
                {!selectedSettlement || isSettlementPaid(selectedSettlement)
                  ? 'Already settled'
                  : isOutgoing && selectedSettlement.status === 'payment_declared'
                    ? 'Pending confirmation'
                  : `${isOutgoing ? 'Pay / mark sent' : 'Mark as received'} ${formatMoney(selectedSettlement.amount || 0, selectedExpenseCurrency)}`}
              </Button>}
            </Box>
          );
        })()}
      </Drawer>
      {canEdit && showAddExpenseModal && (
        <AddExpenseModal
          currency={currency}
          isSubmitting={createExpense.isPending}
          members={members}
          onClose={() => setShowAddExpenseModal(false)}
          onSubmitExpense={handleCreateExpense}
          tripTitle={trip?.title}
        />
      )}
      {canEdit && editingExpense && (
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
        <Drawer
          anchor="right"
          ModalProps={{ disablePortal: true }}
          onClose={() => setSelectedExpense(null)}
          open
        >
          <Box className="payment_details_drawer">
            <Box className="payment_drawer_header">
              <Box><Typography component="h3">Expense details</Typography><span>Review the recorded expense and its split.</span></Box>
              <IconButton aria-label="Close expense details" onClick={() => setSelectedExpense(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="selected_payment_purpose">
              <span>{getCategoryMeta(selectedExpense.category).label}</span>
              <strong>{selectedExpense.description}</strong>
              <p>{formatExpenseDate(selectedExpense.expenseDate)}</p>
            </Box>
            <Box className="payment_drawer_amount receive"><span>Total expense</span><strong>{formatMoney(selectedExpense.amount, selectedExpense.currency || currency)}</strong></Box>
            <Box className="payment_drawer_meta">
              <Box><span>Paid by</span><strong>{getExpensePaidBy(selectedExpense, membersById, currentUser?.id).label}</strong></Box>
              <Box><span>Date</span><strong>{formatExpenseDate(selectedExpense.expenseDate)}</strong></Box>
              <Box><span>Participants</span><strong>{selectedExpense.splits?.length || 0}</strong></Box>
              <Box><span>Currency</span><strong>{selectedExpense.currency || currency}</strong></Box>
            </Box>
            <Box className="payment_split_breakdown">
              <Box className="payment_split_heading"><strong>Split breakdown</strong><span>{selectedExpense.notes || 'No notes added'}</span></Box>
              {(selectedExpense.splits ?? []).map((split) => {
                const member = membersById.get(split.userId) ?? getMemberOptionFromUser(split.user, currentUser?.id);
                return (
                  <Box className="payment_split_row" key={split.userId}>
                    <ImageComp alt={member?.label ?? 'Trip member'} className="person_avatar" isAvatar src={member?.avatar || fallbackAvatar} />
                    <Box><strong>{member?.label ?? 'Trip member'}</strong><span>Expense share</span></Box>
                    <strong>{formatMoney(split.amount, selectedExpense.currency || currency)}</strong>
                  </Box>
                );
              })}
            </Box>
            {canEdit && <Stack direction="row" spacing={1}>
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
            </Stack>}
          </Box>
        </Drawer>
      )}
      {canEdit && deleteExpenseCandidate && (
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
