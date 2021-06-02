import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiturnoComponent } from './miturno.component';

describe('MiturnoComponent', () => {
  let component: MiturnoComponent;
  let fixture: ComponentFixture<MiturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiturnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
