//=======================================================>
// EXPENSES API FUNCTIONS
//=======================================================>

import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import type {
  ApiMutationResponse,
  IBodyPayload,
  ICreateExpensePayload,
  IExpense,
  IPageParams,
  ISettlement,
  IUpdateExpensePayload,
  IWithExpenseId,
  IWithSettlementId,
  IWithTripId,
} from "@/typescript/interface/api";

export const expensesListFn = async ({ tripId, page = 1, limit = 10, category }: IWithTripId & IPageParams & { category?: string }): ApiMutationResponse<IExpense[]> => {
  const res = await axiosInstance.get(endpoints.expenses.list("v1", tripId), { params: { page, limit, category } });

  return res;
};

export const expensesCreateFn = async ({
  body,
  tripId,
}: IBodyPayload<ICreateExpensePayload> & IWithTripId): ApiMutationResponse<IExpense> => {
  const res = await axiosInstance.post(endpoints.expenses.create("v1", tripId), body);

  return res;
};

export const expensesDetailsFn = async ({ expenseId, tripId }: IWithExpenseId): ApiMutationResponse<IExpense> => {
  const res = await axiosInstance.get(endpoints.expenses.details("v1", tripId, expenseId));

  return res;
};

export const expensesUpdateFn = async ({
  body,
  expenseId,
  tripId,
}: IBodyPayload<IUpdateExpensePayload> & IWithExpenseId): ApiMutationResponse<IExpense> => {
  const res = await axiosInstance.patch(endpoints.expenses.update("v1", tripId, expenseId), body);

  return res;
};

export const expensesDeleteFn = async ({ expenseId, tripId }: IWithExpenseId): ApiMutationResponse => {
  const res = await axiosInstance.delete(endpoints.expenses.delete("v1", tripId, expenseId));

  return res;
};

export const expensesSettlementsFn = async ({ tripId }: IWithTripId): ApiMutationResponse<ISettlement[]> => {
  const res = await axiosInstance.get(endpoints.expenses.settlements("v1", tripId));

  return res;
};

export const expensesMarkSettlementPaidFn = async ({
  settlementId,
  tripId,
}: IWithSettlementId): ApiMutationResponse<ISettlement> => {
  const res = await axiosInstance.post(endpoints.expenses.markSettlementPaid("v1", tripId, settlementId));

  return res;
};

export const expensesConfirmSettlementPaidFn = async ({ settlementId, tripId }: IWithSettlementId): ApiMutationResponse<ISettlement> => {
  const res = await axiosInstance.post(endpoints.expenses.confirmSettlementPaid("v1", tripId, settlementId));
  return res;
};

export const expensesSendSettlementRemindersFn = async ({ tripId, settlementId }: IWithSettlementId): ApiMutationResponse => {
  const res = await axiosInstance.post(endpoints.expenses.sendSettlementReminders("v1", tripId, settlementId));

  return res;
};
