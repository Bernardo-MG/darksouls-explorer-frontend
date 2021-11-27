import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorNavigationComponent } from './paginator-navigation.component';

describe('PaginatorNavigationComponent', () => {
  let component: PaginatorNavigationComponent;
  let fixture: ComponentFixture<PaginatorNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
