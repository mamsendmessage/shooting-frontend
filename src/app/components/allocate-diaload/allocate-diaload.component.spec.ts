import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateDialoadComponent } from './allocate-diaload.component';

describe('AllocateDialoadComponent', () => {
  let component: AllocateDialoadComponent;
  let fixture: ComponentFixture<AllocateDialoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateDialoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateDialoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
