import { TestBed } from '@angular/core/testing';

import { WeaponPathsService } from './weapon-paths.service';

describe('WeaponPathsService', () => {
  let service: WeaponPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
