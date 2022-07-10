import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPathSelectorComponent } from './weapon-path-selector.component';

describe('WeaponPathSelectorComponent', () => {
  let component: WeaponPathSelectorComponent;
  let fixture: ComponentFixture<WeaponPathSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponPathSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPathSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
