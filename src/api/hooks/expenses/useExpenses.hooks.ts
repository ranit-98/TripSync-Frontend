"use client";

import {
  expensesCreateFn,
  expensesDeleteFn,
  expensesDetailsFn,
  expensesListFn,
  expensesMarkSettlementPaidFn,
  expensesSendSettlementRemindersFn,
  expensesSettlementsFn,
  expensesUpdateFn,
} from "@/api/functions/expenses";
import type { IMutationHookOptions } from "@/api/hooks/types";
import { isSuccessResponse } from "@/api/hooks/types";
import { listOfQueryKeys } from "@/lib/functions/listOfQueryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useExpensesList = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.expenses.list, tripId],
    queryFn: () => expensesListFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useExpenseDetails = (tripId?: string, expenseId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.expenses.details, tripId, expenseId],
    queryFn: () => expensesDetailsFn({ tripId: tripId ?? "", expenseId: expenseId ?? "" }),
    enabled: Boolean(tripId && expenseId),
  });
};

export const useExpensesSettlements = (tripId?: string) => {
  return useQuery({
    queryKey: [listOfQueryKeys.expenses.settlements, tripId],
    queryFn: () => expensesSettlementsFn({ tripId: tripId ?? "" }),
    enabled: Boolean(tripId),
  });
};

export const useExpensesCreate = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "create"],
    mutationFn: expensesCreateFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useExpensesUpdate = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "update"],
    mutationFn: expensesUpdateFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useExpensesDelete = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "delete"],
    mutationFn: expensesDeleteFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useExpensesMarkSettlementPaid = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.settlements, "mark-paid"],
    mutationFn: expensesMarkSettlementPaidFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};

export const useExpensesSendSettlementReminders = ({ optionalCallback }: IMutationHookOptions) => {
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.reminders],
    mutationFn: expensesSendSettlementRemindersFn,
    onSuccess: (res) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        optionalCallback();
      }
    },
  });
};
