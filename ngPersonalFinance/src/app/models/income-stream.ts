import { IncomeCategory } from './income-category';
export class IncomeStream {
  id: number;
  userId: number;
  incomeCategory: IncomeCategory;
  expectedAmount: number;
  startDate: Date;
  numberOfOccurrences: number;
  recurring: boolean;

  constructor(
    id?: number,
    userId?: number,
    incomeCategory?: IncomeCategory,
    expectedAmount?: number,
    startDate?: Date,
    numberOfOccurrences?: number,
    recurring?: boolean
  ) {
    this.id = id;
    this.userId = userId;
    this.incomeCategory = incomeCategory;
    this.expectedAmount = expectedAmount;
    this.startDate = startDate;
    this.numberOfOccurrences = numberOfOccurrences;
    this.recurring = recurring;
  }
}
