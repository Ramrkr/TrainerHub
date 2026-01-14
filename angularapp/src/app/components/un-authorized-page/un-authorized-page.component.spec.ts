import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorizedPageComponent } from './un-authorized-page.component';

describe('UnAuthorizedPageComponent', () => {
  let component: UnAuthorizedPageComponent;
  let fixture: ComponentFixture<UnAuthorizedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnAuthorizedPageComponent]
    });
    fixture = TestBed.createComponent(UnAuthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
