import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLangueComponent } from './update-langue.component';

describe('UpdateLangueComponent', () => {
  let component: UpdateLangueComponent;
  let fixture: ComponentFixture<UpdateLangueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLangueComponent]
    });
    fixture = TestBed.createComponent(UpdateLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
