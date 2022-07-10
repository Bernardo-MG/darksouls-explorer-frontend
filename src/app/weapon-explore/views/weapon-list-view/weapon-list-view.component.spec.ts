import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemService } from '@app/item-explore/services/item.service';
import { WeaponListViewComponent } from './weapon-list-view.component';

describe('WeaponListViewComponent', () => {
  let component: WeaponListViewComponent;
  let fixture: ComponentFixture<WeaponListViewComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        WeaponListViewComponent
      ],
      providers: [
        ItemService
      ]
    })
      .compileComponents();
      httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
