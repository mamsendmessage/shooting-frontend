import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionConfigComponent } from './competition-config.component';

describe('CompetitionConfigComponent', () => {
  let component: CompetitionConfigComponent;
  let fixture: ComponentFixture<CompetitionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
