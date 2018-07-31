import { ExpenseCategory } from './expense-category';

export class Expense {
  id: number;
  amount: number;
  expenseCategory: ExpenseCategory;
  date: Date;
  description: string;

  constructor(
    id?: number,
    amount?: number,
    expenseCategory?: ExpenseCategory,
    date?: Date,
    description?: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.expenseCategory = expenseCategory;
    this.date = date;
    this.description = description;
  }
}
