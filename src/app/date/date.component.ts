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
  private _subscriptionHour: Subscription;
  private _subscriptionCalendar: Subscription;

  constructor(private timerPulseService : TimerPulseService, private calendarService : CalendarService) {
    this._date = new Date();
    console.log("DateComponent:DateUpdated->" + this._date.toLocaleDateString());
    this._subscriptionHour = this.timerPulseService.HourChange.subscribe(value => {
      this._date = new Date();
      console.log("DateComponent:DateUpdated->" + this._date.toLocaleDateString());
    });
    this._subscriptionCalendar = this.calendarService.CalendarChange.subscribe(value => {
      console.log("here");
    })    
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionHour.unsubscribe();
  }
}
