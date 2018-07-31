export class Income {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  dateReceived: Date;

  constructor(
    id?: number,
    userId?: number,
    categoryId?: number,
    amount?: number,
    dateReceived?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.amount = amount;
    this.dateReceived = dateReceived;
  }
}
