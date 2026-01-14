import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerpostfeedbackComponent } from './managerpostfeedback.component';

describe('ManagerpostfeedbackComponent', () => {
  let component: ManagerpostfeedbackComponent;
  let fixture: ComponentFixture<ManagerpostfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerpostfeedbackComponent]
    });
    fixture = TestBed.createComponent(ManagerpostfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
