import { Component } from '@angular/core';
import { MenuLink } from './navigation/model/menu-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'darksouls-explorer-frontend';

  links: MenuLink[] = [{ name: 'graph', path: '/graph' },{ name: 'items', path: '/items' },{ name: 'weapons', path: '/weapons' },{ name: 'maps', path: '/maps' },{ name: 'problems', path: '/problems' }];

}
