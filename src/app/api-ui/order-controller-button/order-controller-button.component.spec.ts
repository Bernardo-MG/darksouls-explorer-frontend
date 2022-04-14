import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortControllerButtonComponent } from './order-controller-button.component';

describe('SortControllerButtonComponent', () => {
  let component: SortControllerButtonComponent;
  let fixture: ComponentFixture<SortControllerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortControllerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortControllerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
