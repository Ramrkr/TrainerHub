import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLogOutDialogComponent } from './confirm-log-out-dialog.component';

describe('ConfirmLogOutDialogComponent', () => {
  let component: ConfirmLogOutDialogComponent;
  let fixture: ComponentFixture<ConfirmLogOutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmLogOutDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmLogOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
