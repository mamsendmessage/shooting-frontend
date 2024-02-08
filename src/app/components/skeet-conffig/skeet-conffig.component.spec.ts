import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeetConffigComponent } from './skeet-conffig.component';

describe('SkeetConffigComponent', () => {
  let component: SkeetConffigComponent;
  let fixture: ComponentFixture<SkeetConffigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeetConffigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeetConffigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
