import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptionComponent } from './reciption.component';

describe('ReciptionComponent', () => {
  let component: ReciptionComponent;
  let fixture: ComponentFixture<ReciptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
