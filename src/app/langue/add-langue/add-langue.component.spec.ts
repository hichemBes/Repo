import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLangueComponent } from './add-langue.component';

describe('AddLangueComponent', () => {
  let component: AddLangueComponent;
  let fixture: ComponentFixture<AddLangueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLangueComponent]
    });
    fixture = TestBed.createComponent(AddLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
