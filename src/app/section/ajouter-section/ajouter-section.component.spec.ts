import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSectionComponent } from './ajouter-section.component';

describe('AjouterSectionComponent', () => {
  let component: AjouterSectionComponent;
  let fixture: ComponentFixture<AjouterSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterSectionComponent]
    });
    fixture = TestBed.createComponent(AjouterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
