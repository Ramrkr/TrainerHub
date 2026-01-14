import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerManagementComponent } from './trainer-management.component';

describe('TrainerManagementComponent', () => {
  let component: TrainerManagementComponent;
  let fixture: ComponentFixture<TrainerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerManagementComponent]
    });
    fixture = TestBed.createComponent(TrainerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
