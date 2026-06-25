"use client";

import {
  expensesCreateFn,
  expensesConfirmSettlementPaidFn,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExpensesList = (tripId?: string, page = 1) => {
  return useQuery({
    queryKey: [listOfQueryKeys.expenses.list, tripId, page],
    queryFn: () => expensesListFn({ tripId: tripId ?? "", page }),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "create"],
    mutationFn: expensesCreateFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.list, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.settlements, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useExpensesUpdate = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "update"],
    mutationFn: expensesUpdateFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.list, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.details, variables.tripId, variables.expenseId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.settlements, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useExpensesDelete = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.list, "delete"],
    mutationFn: expensesDeleteFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.list, variables.tripId] });
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.settlements, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useExpensesMarkSettlementPaid = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.settlements, "mark-paid"],
    mutationFn: expensesMarkSettlementPaidFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.settlements, variables.tripId] });
        optionalCallback();
      }
    },
  });
};

export const useExpensesConfirmSettlementPaid = ({ optionalCallback }: IMutationHookOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [listOfQueryKeys.expenses.settlements, "confirm-paid"],
    mutationFn: expensesConfirmSettlementPaidFn,
    onSuccess: (res, variables) => {
      if (isSuccessResponse(res?.data.statusCode)) {
        queryClient.invalidateQueries({ queryKey: [listOfQueryKeys.expenses.settlements, variables.tripId] });
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
