export class Expense {
  id: number;
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
  userId: number;

  constructor(
    id?: number,
    amount?: number,
    categoryId?: number,
    date?: Date,
    description?: string,
    userId?: number
  ) {
    this.id = id;
    this.amount = amount;
    this.categoryId = categoryId;
    this.date = date;
    this.description = description;
    this.userId = userId;
  }
}
