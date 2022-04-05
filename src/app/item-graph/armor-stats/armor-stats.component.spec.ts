import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorStatsComponent } from './armor-stats.component';

describe('ArmorStatsComponent', () => {
  let component: ArmorStatsComponent;
  let fixture: ComponentFixture<ArmorStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
