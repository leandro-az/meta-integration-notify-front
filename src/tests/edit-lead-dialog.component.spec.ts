import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeadDialogComponent } from '../app/edit-lead-dialog/edit-lead-dialog.component';

describe('EditLeadDialogComponent', () => {
  let component: EditLeadDialogComponent;
  let fixture: ComponentFixture<EditLeadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLeadDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLeadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
