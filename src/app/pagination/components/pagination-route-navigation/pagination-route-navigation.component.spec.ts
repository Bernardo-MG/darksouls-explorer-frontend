import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationRouteNavigationComponent } from './pagination-route-navigation.component';

describe('PaginationRouteNavigationComponent', () => {
  let component: PaginationRouteNavigationComponent;
  let fixture: ComponentFixture<PaginationRouteNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationRouteNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationRouteNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
