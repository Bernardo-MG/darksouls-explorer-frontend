import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemService } from '../../services/item.service';

import { WeaponInfoComponent } from './weapon-info.component';

describe('WeaponInfoComponent', () => {
  let component: WeaponInfoComponent;
  let fixture: ComponentFixture<WeaponInfoComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        WeaponInfoComponent
      ],
      providers: [
        ItemService
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
