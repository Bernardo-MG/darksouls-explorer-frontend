import { Injectable } from '@angular/core';
import { RequestClient } from '@app/api/request/request-client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { WeaponProgression } from '../models/weaponProgression';
import { Response } from '@app/api/models/response';
import { Item } from '@app/models/item';

@Injectable()
export class WeaponService {

  private itemUrl = environment.apiUrl + "/items";

  private weaponStatsUrl = environment.apiUrl + "/weapons/stats";

  constructor(
    private client: RequestClient
  ) {}

  getAllWeapons(page: number): Observable<Response<Item>> {
    return this.client.request(this.itemUrl).parameter("tags", ["Weapon"]).page(page).order('name', 'asc').get();
  }

  getWeaponStats(weaponId: Number): Observable<WeaponProgression> {
    return this.client.request(this.weaponStatsUrl + "/" + weaponId).get();
  }

}
