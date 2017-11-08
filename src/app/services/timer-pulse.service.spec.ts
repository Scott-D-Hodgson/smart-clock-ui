import { TestBed, inject } from '@angular/core/testing';

import { TimerPulseService } from './timer-pulse.service';

describe('TimerPulseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerPulseService]
    });
  });

  it('should be created', inject([TimerPulseService], (service: TimerPulseService) => {
    expect(service).toBeTruthy();
  }));
});
