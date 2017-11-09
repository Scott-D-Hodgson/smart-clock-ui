import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { CalendarDay } from '../model/calendar-day';
import { TimerPulseService } from './timer-pulse.service';

@Injectable()
export class CalendarService {

  public _calendar : CalendarDay[][];
  private _date : Date;
  private _monthStart : Date;
  private _monthEnd : Date;
  private _calendarStart : Date;
  private _calendarEnd : Date;  
  private _subscriptionMinute: Subscription;
  private _subscriptionCalendar: Subscription;
  CalendarChange: Subject<boolean> = new Subject<boolean>();

  constructor(private timerPulseService : TimerPulseService) {
    this._date = new Date();
    console.log("CalendarService:DateUpdated->" + this._date.toLocaleDateString());
    this._subscriptionMinute = this.timerPulseService.MinuteChange.subscribe(value => {
      this._date = new Date();
      this.CalculateRange();
      console.log("CalendarService:DateUpdated->" + this._date.toLocaleDateString());
    });
    this._subscriptionCalendar = this.CalendarChange.subscribe(value => {
      console.log("CalendarService:CalendarUpdated");
    });
    this.CalculateRange();
  }

  ngOnDestroy() {
    this._subscriptionMinute.unsubscribe();
    this._subscriptionCalendar.unsubscribe();
  }

  private CalculateRange() {
    this._monthStart = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
    this._monthEnd = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
    this._calendarStart = new Date(this._date.getFullYear(), this._date.getMonth(), (this._monthStart.getDay() - 5));
    this._calendarEnd = new Date(this._date.getFullYear(), this._date.getMonth() + 1, (6 - this._monthEnd.getDay()));
    let days : number = this._monthStart.getDay() + this._monthEnd.getDate() + (6 - this._monthEnd.getDay());    
    let calendar : CalendarDay[][] = []; 
    let date : Date = this._calendarStart;
    console.log(days / 7);
    for (let i : number = 0; i < (days / 7); i++) {
      let week : CalendarDay[] = [];
      for (let j : number = 0; j < 7; j++) {
        let calendarDay : CalendarDay = <CalendarDay>{ };
        calendarDay.date = date;
        calendarDay.activeDay = 
          (
            (
              (date.getFullYear() == this._date.getFullYear()) && 
              (date.getMonth() == this._date.getMonth()) && 
              (date.getDate() == this._date.getDate())
            )
          );
        calendarDay.activeMonth = ((date >= this._monthStart) && (date <= this._monthEnd));
        week.push(calendarDay);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      };
      calendar.push(week);
    };
    this._calendar = calendar;
    this.CalendarChange.next(true);
  }
}
