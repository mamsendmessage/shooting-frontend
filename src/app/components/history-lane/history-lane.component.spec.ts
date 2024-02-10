import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLaneComponent } from './history-lane.component';

describe('HistoryLaneComponent', () => {
  let component: HistoryLaneComponent;
  let fixture: ComponentFixture<HistoryLaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
