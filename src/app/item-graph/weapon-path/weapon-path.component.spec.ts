import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPathComponent } from './weapon-path.component';

describe('WeaponPathComponent', () => {
  let component: WeaponPathComponent;
  let fixture: ComponentFixture<WeaponPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
