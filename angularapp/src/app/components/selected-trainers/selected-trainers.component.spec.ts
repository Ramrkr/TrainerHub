import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTrainersComponent } from './selected-trainers.component';

describe('SelectedTrainersComponent', () => {
  let component: SelectedTrainersComponent;
  let fixture: ComponentFixture<SelectedTrainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedTrainersComponent]
    });
    fixture = TestBed.createComponent(SelectedTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
