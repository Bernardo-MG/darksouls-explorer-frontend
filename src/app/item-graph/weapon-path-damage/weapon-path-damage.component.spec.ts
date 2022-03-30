import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPathDamageComponent } from './weapon-path-damage.component';

describe('WeaponPathDamageComponent', () => {
  let component: WeaponPathDamageComponent;
  let fixture: ComponentFixture<WeaponPathDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponPathDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPathDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
