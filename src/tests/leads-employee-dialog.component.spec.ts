import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsEmployeeDialogComponent } from '../app/leads-employee-dialog/leads-employee-dialog.component';

describe('LeadsEmployeeDialogComponent', () => {
  let component: LeadsEmployeeDialogComponent;
  let fixture: ComponentFixture<LeadsEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsEmployeeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
