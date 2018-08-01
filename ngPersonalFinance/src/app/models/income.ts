import { IncomeCategory } from './income-category';
export class Income {
  id: number;
  userId: number;
  incomeCategory: IncomeCategory;
  amount: number;
  dateReceived: Date;

  constructor(
    id?: number,
    userId?: number,
    incomeCategory?: IncomeCategory,
    amount?: number,
    dateReceived?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.incomeCategory = incomeCategory;
    this.amount = amount;
    this.dateReceived = dateReceived;
  }
}
