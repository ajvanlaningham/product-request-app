import { TestBed } from '@angular/core/testing';

import { AzureAiService } from './azure-ai.service';

describe('AzureAiService', () => {
  let service: AzureAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
