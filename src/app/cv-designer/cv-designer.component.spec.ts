import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDesignerComponent } from './cv-designer.component';

describe('CvDesignerComponent', () => {
  let component: CvDesignerComponent;
  let fixture: ComponentFixture<CvDesignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvDesignerComponent]
    });
    fixture = TestBed.createComponent(CvDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
