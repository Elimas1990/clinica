import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificaemailComponent } from './verificaemail.component';

describe('VerificaemailComponent', () => {
  let component: VerificaemailComponent;
  let fixture: ComponentFixture<VerificaemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificaemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificaemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
