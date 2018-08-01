import { ExpenseCategory } from './expense-category';

export class FutureExpense {
  id: number;
  userId: number;
  expenseCategory: ExpenseCategory;
  amount: number;
  expectedDate: Date;
  recurring: boolean;
  description: string;

  constructor(
    id?: number,
    userId?: number,
    expenseCategory?: ExpenseCategory,
    amount?: number,
    expectedDate?: Date,
    recurring?: boolean,
    description?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.expenseCategory = expenseCategory;
    this.amount = amount;
    this.expectedDate = expectedDate;
    this.recurring = recurring;
    this.description = description;
  }
}
