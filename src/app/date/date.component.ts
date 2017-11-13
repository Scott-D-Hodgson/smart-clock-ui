import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerPulseService } from '../services/timer-pulse.service';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  private _date: Date; 
  private _subscriptionDay: Subscription;

  constructor(private timerPulseService : TimerPulseService, private calendarService : CalendarService) {
    this._date = new Date();
    console.log("DateComponent:DateUpdated->" + this._date.toLocaleDateString());
    this._subscriptionDay = this.timerPulseService.DayChange.subscribe(value => {
      this._date = new Date();
      console.log("DateComponent:DateUpdated->" + this._date.toLocaleDateString());
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionDay.unsubscribe();
  }
}
