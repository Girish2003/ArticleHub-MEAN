import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePracticeComponent } from './manage-practice.component';

describe('ManagePracticeComponent', () => {
  let component: ManagePracticeComponent;
  let fixture: ComponentFixture<ManagePracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePracticeComponent]
    });
    fixture = TestBed.createComponent(ManagePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
