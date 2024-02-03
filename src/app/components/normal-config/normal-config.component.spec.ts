import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalConfigComponent } from './normal-config.component';

describe('NormalConfigComponent', () => {
  let component: NormalConfigComponent;
  let fixture: ComponentFixture<NormalConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
