import { Injectable } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TimerPulseService {

  private _day : number;
  private _hour : number;  
  private _minute : number;  
  private _subscriptionTimer : Subscription;
  private _subscriptionDay : Subscription;
  private _subscriptionHour : Subscription;
  private _subscriptionMinute : Subscription;
  DayChange: Subject<number> = new Subject<number>();    
  HourChange: Subject<number> = new Subject<number>();  
  MinuteChange: Subject<number> = new Subject<number>(); 

  constructor(private toastrService : ToastrService) {
    let date = new Date();
    this._day = date.getDate();
    this._hour = date.getHours();
    this._minute = date.getMinutes();
    let timer = TimerObservable.create(0, 1000);
    this._subscriptionTimer = timer.subscribe(t => {
      this.triggerPulses();
    });
    this._subscriptionDay = this.DayChange.subscribe(value => {
      this._day = value;
      this.toastrService.info("Day changed", "Timer Pulse Service");
    });    
    this._subscriptionHour = this.HourChange.subscribe(value => {
      this._hour = value;
      this.toastrService.info("Hour changed", "Timer Pulse Service");
    });
    this._subscriptionMinute = this.MinuteChange.subscribe(value => {
      this._minute = value;
      this.toastrService.info("Minute changed", "Timer Pulse Service");
    });
  }

  ngOnDestroy() {
    if (this._subscriptionTimer != null) {
      this._subscriptionTimer.unsubscribe();
    };
    if (this._subscriptionDay != null) {
      this._subscriptionDay.unsubscribe();
    };
    if (this._subscriptionHour != null) {
      this._subscriptionHour.unsubscribe();
    };
    if (this._subscriptionMinute != null) {
      this._subscriptionMinute.unsubscribe();
    };
  }

  private triggerPulses() {
    let date = new Date();
    if (this._day != date.getDate()) {
      this.DayChange.next(date.getDate());
    }    
    if (this._hour != date.getHours()) {
      this.HourChange.next(date.getHours());
    }
    if (this._minute != date.getMinutes()) {
      this.MinuteChange.next(date.getMinutes());
    }
  }

}
