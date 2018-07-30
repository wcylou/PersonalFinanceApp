export class Budget {
  id: number;
  categoryId: number;
  amount: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  description: string;

  constructor(
    id?: number,
    categoryId?: number,
    amount?: number,
    userId?: number,
    startDate?: Date,
    endDate?: Date,
    description?: string
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.amount = amount;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}

