import { TestBed } from '@angular/core/testing';

import { UserSelectorService } from './user-selector.service';

describe('UserSelectorService', () => {
  let service: UserSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
