import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorviewfeedbackComponent } from './coordinatorviewfeedback.component';

describe('CoordinatorviewfeedbackComponent', () => {
  let component: CoordinatorviewfeedbackComponent;
  let fixture: ComponentFixture<CoordinatorviewfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorviewfeedbackComponent]
    });
    fixture = TestBed.createComponent(CoordinatorviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
