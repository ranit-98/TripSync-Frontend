import type { ApiId } from "./common.interface";

export interface IExpenseSplitPayload {
  userId: ApiId;
  amount: number;
}

export interface ICreateExpensePayload {
  description: string;
  category: string;
  amount: number;
  paidByUserId: ApiId;
  expenseDate: string;
  splits: IExpenseSplitPayload[];
  currency?: string;
  notes?: string;
}

export type IUpdateExpensePayload = Partial<ICreateExpensePayload>;

export interface IExpense {
  id: ApiId;
  description: string;
  category: string;
  amount: number;
  currency?: string;
  paidByUserId: ApiId;
  expenseDate: string;
  notes?: string;
  splits?: IExpenseSplitPayload[];
}

export interface ISettlement {
  id: ApiId;
  fromUserId?: ApiId;
  toUserId?: ApiId;
  amount?: number;
  currency?: string;
  isPaid?: boolean;
}
