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
  private _dateStart : Date;
  private _dateEnd : Date;
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
    let date : Date = new Date();
    date.setDate(this._date.getDate() - (7 - this._date.getDay()))
    this._dateStart = date;
    date.setDate(this._date.getDate() - (7 - this._date.getDay()))  
    this._dateEnd = date;
    console.log("StartDay:" + this._dateStart.toLocaleDateString());
    console.log("EndDay:" + this._dateEnd.getDay());
  }

}
