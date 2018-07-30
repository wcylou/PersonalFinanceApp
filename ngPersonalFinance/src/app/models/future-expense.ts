export class FutureExpense {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  dateExpected: Date;
  recurring: boolean;
  description: string;

  constructor(
    id?: number,
    userId?: number,
    categoryId?: number,
    amount?: number,
    dateExpected?: Date,
    recurring?: boolean,
    description?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.amount = amount;
    this.dateExpected = dateExpected;
    this.recurring = recurring;
    this.description = description;
  }
}
