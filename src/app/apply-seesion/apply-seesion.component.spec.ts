import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplySeesionComponent } from './apply-seesion.component';

describe('ApplySeesionComponent', () => {
  let component: ApplySeesionComponent;
  let fixture: ComponentFixture<ApplySeesionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplySeesionComponent]
    });
    fixture = TestBed.createComponent(ApplySeesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
