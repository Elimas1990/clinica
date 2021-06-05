import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnostodosComponent } from './turnostodos.component';

describe('TurnostodosComponent', () => {
  let component: TurnostodosComponent;
  let fixture: ComponentFixture<TurnostodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnostodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnostodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
