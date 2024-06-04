import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterQuestionsComponent } from './ajouter-questions.component';

describe('AjouterQuestionsComponent', () => {
  let component: AjouterQuestionsComponent;
  let fixture: ComponentFixture<AjouterQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterQuestionsComponent]
    });
    fixture = TestBed.createComponent(AjouterQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
