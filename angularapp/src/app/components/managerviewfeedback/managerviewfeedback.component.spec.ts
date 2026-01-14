import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewfeedbackComponent } from './managerviewfeedback.component';

describe('ManagerviewfeedbackComponent', () => {
  let component: ManagerviewfeedbackComponent;
  let fixture: ComponentFixture<ManagerviewfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerviewfeedbackComponent]
    });
    fixture = TestBed.createComponent(ManagerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
