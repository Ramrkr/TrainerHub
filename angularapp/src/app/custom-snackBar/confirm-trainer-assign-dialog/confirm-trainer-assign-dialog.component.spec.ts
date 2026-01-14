import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTrainerAssignDialogComponent } from './confirm-trainer-assign-dialog.component';

describe('ConfirmTrainerAssignDialogComponent', () => {
  let component: ConfirmTrainerAssignDialogComponent;
  let fixture: ComponentFixture<ConfirmTrainerAssignDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmTrainerAssignDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmTrainerAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
