import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WeaponPathsService } from './weapon-paths.service';

describe('WeaponPathsService', () => {
  let service: WeaponPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        WeaponPathsService
      ]
    });
    service = TestBed.inject(WeaponPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
