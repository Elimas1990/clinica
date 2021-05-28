import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerturnosComponent } from './verturnos.component';

describe('VerturnosComponent', () => {
  let component: VerturnosComponent;
  let fixture: ComponentFixture<VerturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerturnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
