import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  private day: string; 
  private month: string;
  private year: string;
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
    this.day = ('0' + date.getDate()).slice(-2);
    this.month = ('0' + (date.getMonth() + 1)).slice(-2);
    this.year = date.getFullYear().toString();
  }

}
