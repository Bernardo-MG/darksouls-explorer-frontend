import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Graph } from '@app/graph/models/graph';
import { ItemSource } from '@app/item/models/itemSource';
import { Weapon } from '@app/item/models/weapon';
import { WeaponProgression } from '@app/item/models/weaponProgression';
import { WeaponService } from '@app/weapon-explore/services/weapon.service';

@Component({
  selector: 'app-weapon-info-view',
  templateUrl: './weapon-info-view.component.html',
  styleUrls: ['./weapon-info-view.component.sass']
})
export class WeaponInfoViewComponent implements OnInit {

  items: Weapon[] = [];

  data: Weapon = new Weapon();

  weaponProgression: WeaponProgression = new WeaponProgression();

  sources: ItemSource[] = [];

  sourcesGraph: Graph = { nodes: [], links: [], categories: [] };

  constructor(
    private service: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadItem(params.get('id'));
    });
  }

  private loadItem(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getItem(identifier)
        .subscribe(item => {
          if (item) {
            this.data = item
          } else {
            this.data = new Weapon();
          }
        });
      this.service.getWeaponStats(identifier).subscribe(data => this.weaponProgression = data);
      this.service.getItemSources(identifier).subscribe(response => this.sources = response);
      this.service.getItemSourcesGraph(identifier).subscribe(graph => this.sourcesGraph = graph);
    }
  }

  return() {
    this.location.back();
  }

}
