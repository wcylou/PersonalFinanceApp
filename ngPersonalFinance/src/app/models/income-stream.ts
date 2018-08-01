import { IncomeCategory } from './income-category';
export class IncomeStream {
  id: number;
  userId: number;
  incomeCategory: IncomeCategory;
  expectedAmount: number;
  startDate: Date;
  yearlyOccurrences: number;

  constructor(
    id?: number,
    userId?: number,
    incomeCategory?: IncomeCategory,
    expectedAmount?: number,
    startDate?: Date,
    yearlyOccurrences?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.incomeCategory = incomeCategory;
    this.expectedAmount = expectedAmount;
    this.startDate = startDate;
    this.yearlyOccurrences = yearlyOccurrences;
  }
}
