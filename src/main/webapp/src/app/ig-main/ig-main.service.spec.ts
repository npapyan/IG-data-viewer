import { TestBed } from '@angular/core/testing';

import { IgMainService } from './ig-main.service';

describe('IgMainService', () => {
  let service: IgMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
