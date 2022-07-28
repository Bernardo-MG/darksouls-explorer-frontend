import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeaponPathsService } from '@app/weapon-explore/services/weapon-paths.service';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';
import { WeaponInfoViewComponent } from './weapon-info-view.component';

describe('WeaponInfoViewComponent', () => {
  let component: WeaponInfoViewComponent;
  let fixture: ComponentFixture<WeaponInfoViewComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        WeaponInfoViewComponent
      ],
      providers: [
        WeaponService,
        WeaponPathsService
      ]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
