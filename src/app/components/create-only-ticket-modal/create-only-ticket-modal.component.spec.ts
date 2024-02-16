import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnlyTicketModalComponent } from './create-only-ticket-modal.component';

describe('CreateOnlyTicketModalComponent', () => {
  let component: CreateOnlyTicketModalComponent;
  let fixture: ComponentFixture<CreateOnlyTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOnlyTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOnlyTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
