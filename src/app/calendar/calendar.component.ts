import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerPulseService } from '../services/timer-pulse.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private _date : Date;
  private _monthStart : Date;
  private _monthEnd : Date;
  private _calendarStart : Date;
  private _calendarEnd : Date;  
  private _subscriptionHour: Subscription;
  
  constructor(private timerPulseService : TimerPulseService) {
    this._date = new Date();
    this.CalculateRange();
    console.log("CalendarComponent:DateUpdated->" + this._date.toLocaleDateString());
    this._subscriptionHour = this.timerPulseService.HourChange.subscribe(value => {
      this._date = new Date();
      console.log("CalendarComponent:DateUpdated->" + this._date.toLocaleDateString());
    });    
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionHour.unsubscribe();
  }

  private CalculateRange() {
    this._monthStart = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
    this._monthEnd = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
    this._calendarStart = new Date(this._date.getFullYear(), this._date.getMonth(), (this._monthStart.getDay() - 5));
    this._calendarEnd = new Date(this._date.getFullYear(), this._date.getMonth() + 1, (6 - this._monthEnd.getDay()));
    //this._monthEnd = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
    console.log("CalendarComponent:MonthStartDate->" + this._monthStart.toLocaleDateString());
    console.log("CalendarComponent:MonthStartDay->" + this._monthStart.getDay());
    console.log("CalendarComponent:MonthEndDate->" + this._monthEnd.toLocaleDateString());
    console.log("CalendarComponent:MonthEndDay->" + this._monthEnd.getDay());
    console.log("CalendarComponent:CalendarStartDate->" + this._calendarStart.toLocaleDateString());
    console.log("CalendarComponent:CalendarEndDate->" + this._calendarEnd.toLocaleDateString());
  }

}
