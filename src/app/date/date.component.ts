import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerPulseService } from '../services/timer-pulse.service';
import { CalendarService } from '../services/calendar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  private _date: Date; 
  private _subscriptionDay: Subscription;

  constructor(private timerPulseService : TimerPulseService, private calendarService : CalendarService, private toastrService : ToastrService) {
    this._date = new Date();
    this.toastrService.info("Updated", "Date Component"); 
    this._subscriptionDay = this.timerPulseService.DayChange.subscribe(value => {
      this._date = new Date();
      this.toastrService.info("Updated", "Date Component"); 
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionDay.unsubscribe();
  }
}
