import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataTableComponent } from './all-data-table.component';

describe('AllDataTableComponent', () => {
  let component: AllDataTableComponent;
  let fixture: ComponentFixture<AllDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
