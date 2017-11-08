import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerPulseService } from '../services/timer-pulse.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  private _time : Date;
  private _subscriptionMinute: Subscription;

  constructor(private timerPulseService : TimerPulseService) {
    this._time = new Date();
    console.log("TimeComponent:TimeUpdated->" + this._time.toLocaleTimeString());
    this._subscriptionMinute = this.timerPulseService.MinuteChange.subscribe(value => {
      this._time = new Date();
      console.log("TimeComponent:TimeUpdated->" + this._time.toLocaleTimeString());
    });    
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionMinute.unsubscribe();
  }
}
