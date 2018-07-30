export class IncomeStream {
  id: number;
  userId: number;
  categoryId: number;
  expectedAmount: number;
  startDate: Date;
  recurrencesPerYear: number;

  constructor(
    id?: number,
    userId?: number,
    categoryId?: number,
    expectedAmount?: number,
    startDate?: Date,
    recurrencesPerYear?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.expectedAmount = expectedAmount;
    this.startDate = startDate;
    this.recurrencesPerYear = recurrencesPerYear;
  }
}
