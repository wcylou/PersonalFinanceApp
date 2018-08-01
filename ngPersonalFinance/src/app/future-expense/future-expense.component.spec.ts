import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureExpenseComponent } from './future-expense.component';

describe('FutureExpenseComponent', () => {
  let component: FutureExpenseComponent;
  let fixture: ComponentFixture<FutureExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
