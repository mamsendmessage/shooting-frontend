import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnlyPlayerModalComponent } from './create-only-player-modal.component';

describe('CreateOnlyPlayerModalComponent', () => {
  let component: CreateOnlyPlayerModalComponent;
  let fixture: ComponentFixture<CreateOnlyPlayerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOnlyPlayerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOnlyPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
