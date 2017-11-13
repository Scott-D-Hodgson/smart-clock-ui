import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerPulseService } from '../services/timer-pulse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  private _time : Date;
  private _subscriptionMinute: Subscription;

  constructor(private timerPulseService : TimerPulseService, private toastrService : ToastrService) {
    this._time = new Date();
    this.toastrService.info("Updated", "Time Component"); 
    this._subscriptionMinute = this.timerPulseService.MinuteChange.subscribe(value => {
      this._time = new Date();
      this.toastrService.info("Updated", "Time Component"); 
    });    
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionMinute.unsubscribe();
  }
}
