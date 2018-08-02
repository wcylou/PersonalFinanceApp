import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPieChartComponent } from './category-pie-chart.component';

describe('CategoryPieChartComponent', () => {
  let component: CategoryPieChartComponent;
  let fixture: ComponentFixture<CategoryPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
