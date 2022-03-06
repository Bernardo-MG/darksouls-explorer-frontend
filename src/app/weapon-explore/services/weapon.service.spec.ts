import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  let service: WeaponService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeaponService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(WeaponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
