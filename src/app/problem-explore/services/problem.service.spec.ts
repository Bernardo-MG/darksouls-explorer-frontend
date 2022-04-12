import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProblemService } from './problem.service';


describe('ProblemServiceService', () => {
  let service: ProblemService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ProblemService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
