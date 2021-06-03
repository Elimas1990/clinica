import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoprofesionalComponent } from './turnoprofesional.component';

describe('TurnoprofesionalComponent', () => {
  let component: TurnoprofesionalComponent;
  let fixture: ComponentFixture<TurnoprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoprofesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
