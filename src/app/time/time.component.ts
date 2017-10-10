import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  private hour: string; 
  private minute: string;
  private ampm: string;
  //private second: string;
  private subscription: Subscription;

  constructor() { 
    this.timerUpdate(); 
  }

  ngOnInit() {
    let timer = TimerObservable.create(60000, 60000);
    this.subscription = timer.subscribe(t => {
      this.timerUpdate();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private timerUpdate() {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 12) { this.ampm = "PM" } else { this.ampm = "AM" };
    if (hour == 0) { hour = 12 };
    if (hour > 12) { hour = hour - 12 };
    this.hour = date.getHours().toString();
    this.minute = ('0' + date.getMinutes()).slice(-2);
    //this.second = ('0' + date.getSeconds()).slice(-2);
  }
}
