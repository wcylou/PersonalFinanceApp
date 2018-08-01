import { TestBed, inject } from '@angular/core/testing';

import { FutureExpenseService } from './future-expense.service';

describe('FutureExpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutureExpenseService]
    });
  });

  it('should be created', inject([FutureExpenseService], (service: FutureExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
