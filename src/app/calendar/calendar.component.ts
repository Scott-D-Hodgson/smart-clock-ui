import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CalendarDay } from '../model/calendar-day';
import { CalendarService } from '../services/calendar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private _date : Date;
  private _calendar : CalendarDay[][];
  private _subscriptionCalendar : Subscription;
  
  constructor(private calendarService : CalendarService, private toastrService : ToastrService) {
    this._date = new Date();
    this._calendar = calendarService._calendar;
    this.toastrService.info("Updated", "Calendar Component");     
    this._subscriptionCalendar = this.calendarService.CalendarChange.subscribe(value => {
      this._calendar = this.calendarService._calendar;
      this._date = this.calendarService._today;
      this.toastrService.info("Updated", "Calendar Component");     
    });    
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionCalendar.unsubscribe();
  }

  private getClass(day : CalendarDay) : string {
    if (day.activeDay) {
      return "today";
    }
    if (day.activeMonth) {
      return "month";
    }
  }
}
