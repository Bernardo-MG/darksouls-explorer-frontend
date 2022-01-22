import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { WeaponProgression } from '../models/weaponProgression';
import { Response } from '@app/api/models/response';

@Injectable()
export class WeaponService {

  private weaponStatsUrl = environment.apiUrl + "/weapons/stats";

  constructor(
    private client: RequestClient
  ) {}

  getWeaponStats(weaponId: Number): Observable<WeaponProgression> {
    return this.client.request(this.weaponStatsUrl + "/" + weaponId).get();
  }

}
