import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPathDefenseComponent } from './weapon-path-defense.component';

describe('WeaponPathDefenseComponent', () => {
  let component: WeaponPathDefenseComponent;
  let fixture: ComponentFixture<WeaponPathDefenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponPathDefenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPathDefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
