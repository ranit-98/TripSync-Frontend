import { tripItineraryAssets } from '@/json/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import InsightsIcon from '@mui/icons-material/Insights';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import {
  addExpenseDefaultValues,
  addExpenseSchema,
  expenseCategories,
  expenseRows,
  tripMembers,
  type AddExpenseFormValues,
} from '../shared';

function AddExpenseModal({ onClose }: { onClose: () => void }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddExpenseFormValues>({
    defaultValues: addExpenseDefaultValues,
    mode: 'onBlur',
    resolver: yupResolver(addExpenseSchema),
  });

  const onSubmit: SubmitHandler<AddExpenseFormValues> = (values) => {
    const category = expenseCategories.find((item) => item.value === values.category);
    const paidBy = tripMembers.find((member) => member.value === values.paidBy);
    const splitWith = tripMembers
      .filter((member) => values.splitWith.includes(member.value))
      .map((member) => member.label);

    const payload = {
      amount: values.amount,
      category: category?.label ?? values.category,
      date: values.date,
      description: values.description.trim(),
      notes: values.notes.trim(),
      paidBy: paidBy?.label ?? values.paidBy,
      splitWith,
    };

    console.log('Add expense payload:', payload);
    onClose();
  };

  return (
    <Box className="expense_modal_overlay">
      <Box className="expense_modal" component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box className="expense_modal_header">
          <Box>
            <Typography component="h3">Add Expense</Typography>
            <Typography>Add a shared cost to the Paris trip budget.</Typography>
          </Box>
          <IconButton aria-label="Close add expense modal" onClick={onClose}>
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
                  placeholder="e.g. Team dinner - Amalfi"
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
                  {tripMembers.map((member) => (
                    <MenuItem key={member.value} value={member.value}>
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
                  {tripMembers.map((member) => {
                    const active = field.value.includes(member.value);

                    return (
                      <Box
                        className={`split_member${active ? ' active' : ''}`}
                        component="label"
                        key={member.value}
                      >
                        <input
                          checked={active}
                          type="checkbox"
                          onChange={() => {
                            const nextValue = active
                              ? field.value.filter((value) => value !== member.value)
                              : [...field.value, member.value];

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
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Expense
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function ExpensesTab() {
  const [showBudget, setShowBudget] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

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
                <Typography component="h2">$4,500.00</Typography>
                <span>/ $6,000.00 planned</span>
              </Stack>
            </Box>
            <Box className="budget_progress">
              <Stack direction="row">
                <span>Budget Utilization</span>
                <strong>75%</strong>
              </Stack>
              <Box className="progress_track">
                <span style={{ width: '75%' }} />
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
            <Button className="plain_action" endIcon={<FilterListIcon />}>
              Filter
            </Button>
          </Stack>

          <Box className="expense_table">
            <Box className="expense_row expense_head">
              <span>Description</span>
              <span>Amount</span>
              <span>Paid By</span>
              <span>Date</span>
              <span>Split</span>
            </Box>
            {expenseRows.map((expense) => {
              const Icon = expense.icon;

              return (
                <Box className="expense_row" key={expense.title}>
                  <Stack className="expense_desc" direction="row">
                    <Box className={`expense_icon ${expense.tone}`}>
                      <Icon />
                    </Box>
                    <Box>
                      <strong>{expense.title}</strong>
                      <span>{expense.category}</span>
                    </Box>
                  </Stack>
                  <strong>{expense.amount}</strong>
                  <Box alt="" className="paid_avatar" component="img" src={expense.paidBy} />
                  <span className="muted_text">{expense.date}</span>
                  <Stack className="mini_stack" direction="row">
                    {expense.split.map((avatar) => (
                      <Box alt="" className="mini_avatar" component="img" key={avatar} src={avatar} />
                    ))}
                    {expense.title === 'Team Dinner - Amalfi' && <span className="mini_more">+2</span>}
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box className="settlement_summary">
          <Typography className="section_heading" component="h2">
            Settlement Summary
          </Typography>
          <Box className="summary_panel">
            <Box className="balance_item positive">
              <Box alt="" className="person_avatar" component="img" src={tripItineraryAssets.members[0]} />
              <Box className="balance_copy">
                <strong>Alex owes you</strong>
                <span>for Team Dinner</span>
              </Box>
              <Box className="balance_amount">
                <strong>$82.00</strong>
                <span>Pending</span>
              </Box>
            </Box>
            <Box className="balance_item warning">
              <Box alt="" className="person_avatar" component="img" src={tripItineraryAssets.members[1]} />
              <Box className="balance_copy">
                <strong>You owe Sarah</strong>
                <span>for Car Rental</span>
              </Box>
              <Box className="balance_amount warning">
                <strong>$32.50</strong>
                <span>Due soon</span>
              </Box>
            </Box>
            <Box className="net_balance">
              <span>Net Balance</span>
              <strong>+$49.50</strong>
            </Box>
            <Button className="primary_wide" startIcon={<CheckCircleIcon />}>
              Mark Settled
            </Button>
            <Button className="outline_wide">Send Reminders</Button>
          </Box>
          <Box className="insight_card">
            <span>
              <InsightsIcon />
            </span>
            <Box>
              <strong>Spending Insight</strong>
              <p>Food & Dining is 15% higher than your last trip.</p>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconButton className="round_fab" aria-label="Add expense" onClick={() => setShowAddExpenseModal(true)}>
        <AddIcon />
      </IconButton>
      {showAddExpenseModal && <AddExpenseModal onClose={() => setShowAddExpenseModal(false)} />}
    </Box>
  );
}
