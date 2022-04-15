import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Graph } from '@app/graph/models/graph';
import { ItemService } from '@app/item-explore/services/item.service';
import { ArmorProgression } from '@app/models/armorProgression';
import { Item } from '@app/models/item';
import { ItemSource } from '@app/models/itemSource';
import { WeaponProgression } from '@app/models/weaponProgression';

@Component({
  selector: 'app-item-info-view',
  templateUrl: './item-info-view.component.html',
  styleUrls: ['./item-info-view.component.sass']
})
export class ItemInfoViewComponent implements OnInit {

  items: Item[] = [];

  data: Item = { id: -1, name: '', description: [], tags: [] };

  weaponProgression: WeaponProgression = { weapon: "", paths: [] };

  armorProgression: ArmorProgression = { armor: "", levels: [] };

  sources: ItemSource[] = [];

  sourcesGraph: Graph = { nodes: [], links: [], categories: [] };

  constructor(
    private service: ItemService,
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
            this.data = { id: -1, name: '', description: [], tags: [] };
          }
        });
      this.service.getWeaponStats(identifier).subscribe(data => this.weaponProgression = data);
      this.service.getArmorStats(identifier).subscribe(data => this.armorProgression = data);
      this.service.getItemSources(identifier).subscribe(response => this.sources = response);
      this.service.getItemSourcesGraph(identifier).subscribe(graph => this.sourcesGraph = graph);
    }
  }

  return() {
    this.location.back();
  }

}
