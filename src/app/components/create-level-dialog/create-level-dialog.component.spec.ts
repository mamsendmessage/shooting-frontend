import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLevelDialogComponent } from './create-level-dialog.component';

describe('CreateLevelDialogComponent', () => {
  let component: CreateLevelDialogComponent;
  let fixture: ComponentFixture<CreateLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLevelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
