import { User } from './user';
import { ExpenseCategory } from './expense-category';

export class Budget {
  id: number;
  expenseCategory: ExpenseCategory;
  amount: number;
  user: User;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor(
    id?: number,
    expenseCategory?: ExpenseCategory,
    amount?: number,
    user?: User,
    startDate?: Date,
    endDate?: Date,
    description?: string
  ) {
    this.id = id;
    this.expenseCategory = expenseCategory;
    this.amount = amount;
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}

