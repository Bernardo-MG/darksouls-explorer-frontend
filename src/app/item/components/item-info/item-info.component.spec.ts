import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemService } from '@app/item-explore/services/item.service';

import { ItemInfoComponent } from './item-info.component';

describe('ItemInfoComponent', () => {
  let component: ItemInfoComponent;
  let fixture: ComponentFixture<ItemInfoComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        ItemInfoComponent
      ],
      providers: [
        ItemService
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
