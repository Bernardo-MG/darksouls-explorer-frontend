import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSourceGraphComponent } from './item-source-graph.component';

describe('ItemSourceGraphComponent', () => {
  let component: ItemSourceGraphComponent;
  let fixture: ComponentFixture<ItemSourceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSourceGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSourceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
