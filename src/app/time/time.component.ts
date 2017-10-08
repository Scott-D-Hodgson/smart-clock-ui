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
  private second: string;
  private subscription: Subscription;

  constructor() { 
    let date = new Date();
    this.hour = date.getHours().toString();
    this.minute = ('0' + date.getMinutes()).slice(-2);
    this.second = ('0' + date.getSeconds()).slice(-2);    
  }

  ngOnInit() {
    let timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      let date = new Date();
      this.hour = date.getHours().toString();
      this.minute = ('0' + date.getMinutes()).slice(-2);
      this.second = ('0' + date.getSeconds()).slice(-2);
      //this.currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
