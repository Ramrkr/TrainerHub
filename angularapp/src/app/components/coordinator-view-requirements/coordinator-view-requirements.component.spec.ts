import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorViewRequirementsComponent } from './coordinator-view-requirements.component';

describe('CoordinatorViewRequirementsComponent', () => {
  let component: CoordinatorViewRequirementsComponent;
  let fixture: ComponentFixture<CoordinatorViewRequirementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorViewRequirementsComponent]
    });
    fixture = TestBed.createComponent(CoordinatorViewRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
