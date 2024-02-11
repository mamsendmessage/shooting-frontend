import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogarithmicChartComponent } from './logarithmic-chart.component';

describe('LogarithmicChartComponent', () => {
  let component: LogarithmicChartComponent;
  let fixture: ComponentFixture<LogarithmicChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogarithmicChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogarithmicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
