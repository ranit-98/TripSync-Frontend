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
  IRazorpaySettlementOrder,
  ISettlement,
  IUpdateExpensePayload,
  IVerifyRazorpaySettlementPayload,
  IWithExpenseId,
  IWithSettlementId,
  IWithTripId,
} from "@/typescript/interface/api";

export const expensesListFn = async ({ tripId, page = 1, limit = 10 }: IWithTripId & IPageParams): ApiMutationResponse<IExpense[]> => {
  const res = await axiosInstance.get(endpoints.expenses.list("v1", tripId), { params: { page, limit } });

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

export const expensesCreateRazorpayOrderFn = async ({
  settlementId,
  tripId,
}: IWithSettlementId): ApiMutationResponse<IRazorpaySettlementOrder> => {
  const res = await axiosInstance.post(endpoints.expenses.createRazorpayOrder("v1", tripId, settlementId));

  return res;
};

export const expensesVerifyRazorpayPaymentFn = async ({
  body,
  settlementId,
  tripId,
}: IBodyPayload<IVerifyRazorpaySettlementPayload> & IWithSettlementId): ApiMutationResponse<ISettlement> => {
  const res = await axiosInstance.post(endpoints.expenses.verifyRazorpayPayment("v1", tripId, settlementId), body);

  return res;
};
