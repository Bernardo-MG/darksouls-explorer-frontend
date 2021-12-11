import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'graph-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './graph-diagram.component.html',
  styleUrls: ['./graph-diagram.component.sass']
})
export class GraphDiagramComponent implements OnChanges {

  @Output() selectNode = new EventEmitter<Number>();

  @Input() nodes: {
    name: string;
    id: string;
    label: string;
  }[] = [];

  @Input() links: {
    source: string;
    target: string;
  }[] = [];

  @Input() categories: {
    name: string;
  }[] = [];

  options = {};

  mergeOption: any;

  loading = false;

  constructor() { }

  onClick(event: any): void {
    this.selectNode.emit(event.data.id);
  }

  ngOnChanges(): void {
    this.loading = true;

    this.mergeOption = {
      series: {
        type: 'graph',
        layout: 'force',
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        },
        data: this.nodes,
        links: this.links,
        categories: this.categories
      }
    };

    this.loading = false;
  }

}
