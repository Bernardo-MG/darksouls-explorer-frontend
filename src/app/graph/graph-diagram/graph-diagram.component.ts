import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { Category } from '../models/category';
import { Link } from '../models/link';
import { Node } from '../models/node';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnChanges {

  @Output() selectNode = new EventEmitter<Number>();

  @Input() nodes: Node[] = [];

  @Input() links: Link[] = [];

  @Input() categories: Category[] = [];
  
  @Input() title: string = '';

  options = {};

  mergeOption: any;

  loading = false;

  constructor() {
    this.options = {
      title: {
        text: this.title,
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      series: {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        }
      }
    };
  }

  onClick(event: any): void {
    this.selectNode.emit(event.data.id);
  }

  ngOnChanges(): void {
    this.loading = true;

    this.mergeOption = {
      legend: [
        {
          data: this.categories.map(function (a) {
            return a.name;
          })
        }
      ],
      series: {
        data: this.nodes,
        links: this.links,
        categories: this.categories
      }
    };

    this.loading = false;
  }

}
