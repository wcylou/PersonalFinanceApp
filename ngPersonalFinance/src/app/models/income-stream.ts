export class IncomeStream {
  id: number;
  expectedAmount: number;
  userId: number;
  categoryId: number;
  amount: number;

  constructor(
    id?: number
  ) {
    this.id = id;
  }
}
