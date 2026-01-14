import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRequirementComponent } from './manager-requirement.component';

describe('ManagerRequirementComponent', () => {
  let component: ManagerRequirementComponent;
  let fixture: ComponentFixture<ManagerRequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerRequirementComponent]
    });
    fixture = TestBed.createComponent(ManagerRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
