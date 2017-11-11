import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { CalendarDay } from '../model/calendar-day';
import { TimerPulseService } from './timer-pulse.service';

@Injectable()
export class CalendarService {

  public _calendar : CalendarDay[][];
  public _today : Date;
  private _monthStart : Date;
  private _monthEnd : Date;
  private _calendarStart : Date;
  private _calendarEnd : Date;  
  private _subscriptionDay: Subscription;
  private _subscriptionCalendar: Subscription;
  CalendarChange: Subject<boolean> = new Subject<boolean>();

  constructor(private timerPulseService : TimerPulseService) {
    this._today = new Date();
    this.CalculateRange();
    this._subscriptionDay = this.timerPulseService.DayChange.subscribe(value => {
      this._today = new Date();
      this.CalculateRange();
    });
  }

  ngOnDestroy() {
    this._subscriptionDay.unsubscribe();
    this._subscriptionCalendar.unsubscribe();
  }

  private CalculateRange() {
    this._monthStart = new Date(this._today.getFullYear(), this._today.getMonth(), 1);
    this._monthEnd = new Date(this._today.getFullYear(), this._today.getMonth() + 1, 0);
    this._calendarStart = new Date(this._today.getFullYear(), this._today.getMonth(), (this._monthStart.getDay() - 5));
    this._calendarEnd = new Date(this._today.getFullYear(), this._today.getMonth() + 1, (6 - this._monthEnd.getDay()));
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
              (date.getFullYear() == this._today.getFullYear()) && 
              (date.getMonth() == this._today.getMonth()) && 
              (date.getDate() == this._today.getDate())
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
