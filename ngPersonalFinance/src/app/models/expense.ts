import { ExpenseCategory } from './expense-category';

export class Expense {
  id: number;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  description: string;
  userId: number;

  constructor(
    id?: number,
    amount?: number,
    category?: ExpenseCategory,
    date?: Date,
    description?: string,
    userId?: number
  ) {
    this.id = id;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
    this.userId = userId;
  }
}
