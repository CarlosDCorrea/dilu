import { category } from "./category";


export type form = {
  value: string;
  description: string,
  category: string | null;
  created: Date;
};

export type expense = {
  expense_id: string;
  value: number;
  description: string;
  category: category | null;
  created: Date;
};

export type listExpensesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: expense[]
}