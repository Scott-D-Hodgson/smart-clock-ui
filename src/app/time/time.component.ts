import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  private _time : Date;
  private subscription: Subscription;

  constructor() {
    this._time = new Date();
  }

  ngOnInit() {
    let timer = TimerObservable.create(60000, 60000);
    this.subscription = timer.subscribe(t => {
      this._time = new Date();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
