import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponPathsComponent } from './weapon-paths.component';

describe('WeaponPathsComponent', () => {
  let component: WeaponPathsComponent;
  let fixture: ComponentFixture<WeaponPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WeaponPathsComponent 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
