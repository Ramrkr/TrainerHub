import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewRequirementsComponent } from './manager-view-requirements.component';

describe('ManagerViewRequirementsComponent', () => {
  let component: ManagerViewRequirementsComponent;
  let fixture: ComponentFixture<ManagerViewRequirementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerViewRequirementsComponent]
    });
    fixture = TestBed.createComponent(ManagerViewRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
