import { Injectable } from '@angular/core';
import { Quote } from '../model/quote';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TheySaidSoService {

  private subscription : Subscription;
  public Quote : Quote;
  QuoteChange: Subject<Quote> = new Subject<Quote>();

  constructor(private http : Http, private toastrService : ToastrService) { 
    this.QuoteChange.subscribe(value => {
      this.Quote = value;
      this.toastrService.info("Quote changed", "They Said So Service");
    });   
    let timer = TimerObservable.create(0, 3600000);
    this.subscription = timer.subscribe(t => {
      this.timerUpdate();
    })
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    };
  }

  private timerUpdate() {
    this.getQuoteOfTheDay();
  }

  public getQuoteOfTheDay() {
    let url = "http://quotes.rest/qod.json";
    try
    {
      let quote : Quote = <Quote>{};
      this.http.get(url).subscribe((value: Response) => {
        let raw : Object;
        raw = <Object>value.json();
        if (raw != null) {
          //console.log(JSON.stringify(raw));
          if(raw.hasOwnProperty("contents")){
            //console.log(raw["list"].length);
            if(raw["contents"].hasOwnProperty("quotes")) {
              if(raw["contents"]["quotes"].length > 0) {
                if(raw["contents"]["quotes"][0].hasOwnProperty("quote")) {
                  quote.text = raw["contents"]["quotes"][0]["quote"];
                };
                if(raw["contents"]["quotes"][0].hasOwnProperty("author")) {
                  quote.author = raw["contents"]["quotes"][0]["author"];
                };
              };
            };
          };
        };     
        //console.log(JSON.stringify(quote));
        this.QuoteChange.next(quote);
      });
    }
    catch(ex)
    { 
      this.toastrService.error("Unable to get quote", "They Said So Service");
    }
  }

}
